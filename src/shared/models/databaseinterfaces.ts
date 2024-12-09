import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@/server/db/schema';

export type DrizzleDB = PostgresJsDatabase<typeof schema>;
