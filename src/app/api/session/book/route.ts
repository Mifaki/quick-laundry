import { format, parse } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '@/server/db';
import { laundryMachines, sessions } from '@/server/db/schema';

export async function GET(req: NextRequest) {
  try {
    const indonesiaTimeZone = 'Asia/Jakarta';
    const currentDate = toZonedTime(new Date(), indonesiaTimeZone);
    const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');

    const { searchParams } = new URL(req.url);
    const dateFilter = searchParams.get('date');

    let whereClause = sql`date >= ${formattedCurrentDate}`;

    if (dateFilter) {
      try {
        const parsedDate = parse(dateFilter, 'dd-MM-yyyy', new Date());
        const formattedFilteredDate = format(parsedDate, 'yyyy-MM-dd');

        whereClause = sql`date = ${formattedFilteredDate}`;
      } catch (error) {
        return NextResponse.json(
          {
            message: 'Invalid date format. Use dd-mm-yyyy',
            error: 'Date parsing failed',
          },
          { status: 400 }
        );
      }
    }

    const availableSessions = await db
      .select({
        id: sessions.id,
        date: sessions.date,
        sessionStart: sessions.sessionStart,
        sessionEnd: sessions.sessionEnd,
        isBooked: sessions.isBooked,
        machineId: laundryMachines.id,
        machineName: laundryMachines.name,
      })
      .from(sessions)
      .innerJoin(laundryMachines, sql`${sessions.laundryMachineId} = ${laundryMachines.id}`)
      .where(whereClause)
      .orderBy(sql`date, session_start`);

    const transformedData = {
      dates: Object.keys(
        availableSessions.reduce(
          (acc, session) => {
            const formattedDate = format(new Date(session.date), 'dd, MM, yyyy');
            acc[formattedDate] = true;
            return acc;
          },
          {} as Record<string, boolean>
        )
      ),
      timeSlots: availableSessions.reduce(
        (acc, session) => {
          const formattedDate = format(new Date(session.date), 'dd, MM, yyyy');

          if (!acc[formattedDate]) {
            acc[formattedDate] = {};
          }

          if (!acc[formattedDate][session.sessionStart]) {
            acc[formattedDate][session.sessionStart] = [];
          }

          acc[formattedDate][session.sessionStart]!.push({
            sessionId: session.id,
            machineId: session.machineId,
            machineName: session.machineName,
            isBooked: session.isBooked === 1,
            sessionStart: session.sessionStart,
            sessionEnd: session.sessionEnd,
          });

          return acc;
        },
        {} as Record<string, Record<string, any[]>>
      ),
    };

    return NextResponse.json(
      {
        message: 'Sessions retrieved successfully',
        data: transformedData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      {
        message: 'Error retrieving sessions',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
