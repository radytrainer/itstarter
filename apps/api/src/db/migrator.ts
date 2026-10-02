import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import type pg from 'pg';

/**
 * Applies pending SQL migrations from `migrationsFolder` in order, each in a transaction.
 * Already-applied migrations are skipped, so this is safe to run on every deploy.
 */
export async function runMigrations(pool: pg.Pool, migrationsFolder: string): Promise<void> {
  await migrate(drizzle(pool), { migrationsFolder });
}
