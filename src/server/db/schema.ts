import { addDays, addHours, format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { sql } from 'drizzle-orm';
import {
  date,
  index,
  integer,
  pgTableCreator,
  time,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { DrizzleDB } from '@/shared/models/databaseinterfaces';

export const createTable = pgTableCreator((name) => `quick-laundry_${name}`);

export const laundryMachines = createTable('laundry_machine', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const sessions = createTable(
  'session',
  {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    sessionStart: time('session_start').notNull(),
    sessionEnd: time('session_end').notNull(),
    date: date('date').notNull(),
    laundryMachineId: integer('laundry_machine_id')
      .references(() => laundryMachines.id)
      .notNull(),
    isBooked: integer('is_booked').default(0).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    machineIndex: index('machine_idx').on(example.laundryMachineId),
    dateIndex: index('date_idx').on(example.date),
  })
);

export const orders = createTable(
  'order',
  {
    id: varchar('id', { length: 36 }).primaryKey(),
    price: integer('price').notNull(),
    quantity: integer('quantity').notNull(),
    sessionID: integer('session_id')
      .references(() => sessions.id)
      .notNull()
      .unique(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (order) => ({
    sessionIndex: index('session_idx').on(order.sessionID),
  })
);

export async function seedLaundryMachines(db: DrizzleDB) {
  const existingMachines = await db.select().from(laundryMachines);

  if (existingMachines.length === 0) {
    const machinesToAdd = Array.from({ length: 7 }, (_, i) => ({
      name: `Mesin Laundry ${i + 1}`,
    }));
    await db.insert(laundryMachines).values(machinesToAdd);
  }
}

export async function generateSessionsForNextDay(db: DrizzleDB) {
  const indonesiaTimeZone = 'Asia/Jakarta';

  const currentDate = toZonedTime(new Date(), indonesiaTimeZone);
  const nextDate = addDays(currentDate, 1);

  const formattedNextDate = format(nextDate, 'yyyy-MM-dd');

  const machines = await db.select().from(laundryMachines);

  const existingSessions = await db
    .select()
    .from(sessions)
    .where(sql`date = ${formattedNextDate}`);

  if (existingSessions.length > 0) {
    console.log('Sessions for next day already exist');
    return;
  }

  const sessionsToAdd = machines.flatMap((machine) =>
    Array.from({ length: 16 }, (_, i) => {
      const sessionStart = addHours(new Date(nextDate.setHours(7, 0, 0, 0)), i);
      const sessionEnd = addHours(sessionStart, 1);

      return {
        sessionStart: format(sessionStart, 'HH:mm:ss'),
        sessionEnd: format(sessionEnd, 'HH:mm:ss'),
        date: formattedNextDate,
        laundryMachineId: machine.id,
        isBooked: 0,
      };
    })
  );

  await db.insert(sessions).values(sessionsToAdd);

  console.log(`Generated ${sessionsToAdd.length} sessions for next day`);
}

export async function dailySessionGeneration(db: DrizzleDB) {
  await generateSessionsForNextDay(db);
}
