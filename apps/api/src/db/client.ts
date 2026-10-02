import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import type pg from 'pg';
import * as schema from './schema';

export type Database = NodePgDatabase<typeof schema>;
/** A database handle or an open transaction; repositories accept either. */
export type DbExecutor = Database | Parameters<Parameters<Database['transaction']>[0]>[0];

export function createDatabase(pool: pg.Pool): Database {
  return drizzle(pool, { schema });
}
