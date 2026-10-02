import { resolve } from 'node:path';
import type pg from 'pg';

export function loadTestEnv(): void {
  try {
    process.loadEnvFile(resolve(import.meta.dirname, '../../../../.env'));
  } catch {
    // CI provides variables directly.
  }
}

/** Integration tests always use a separate "<name>_test" database, never the dev database. */
export function testDatabaseUrl(baseUrl = process.env.DATABASE_URL): string {
  if (!baseUrl)
    throw new Error('DATABASE_URL is not set (run `npm run docker:deps` and create .env)');
  const url = new URL(baseUrl);
  const name = url.pathname.slice(1);
  url.pathname = `/${name.endsWith('_test') ? name : `${name}_test`}`;
  return url.toString();
}

/** Redis logical database 1 for tests, so flushing it never touches dev data (database 0). */
export const TEST_REDIS_DB = 1;
export function testRedisUrl(baseUrl = process.env.REDIS_URL): string {
  if (!baseUrl) throw new Error('REDIS_URL is not set');
  const url = new URL(baseUrl);
  url.pathname = `/${TEST_REDIS_DB}`;
  return url.toString();
}

/** Empties every application table (keeps the schema and migration history). */
export async function resetData(pool: pg.Pool): Promise<void> {
  const { rows } = await pool.query<{ tablename: string }>(
    `select tablename from pg_tables where schemaname = 'public'`,
  );
  if (rows.length === 0) return;
  const tables = rows.map((r) => `"public"."${r.tablename}"`).join(', ');
  await pool.query(`truncate ${tables} restart identity cascade`);
}

/** PostgreSQL error code from a pg error, possibly wrapped by Drizzle. */
export function pgErrorCode(err: unknown): string | undefined {
  let current: unknown = err;
  for (let depth = 0; current && depth < 5; depth += 1) {
    if (typeof current === 'object' && 'code' in current && typeof current.code === 'string') {
      return current.code;
    }
    current = (current as { cause?: unknown }).cause;
  }
  return undefined;
}

export const PG = {
  UNIQUE_VIOLATION: '23505',
  FOREIGN_KEY_VIOLATION: '23503',
  CHECK_VIOLATION: '23514',
  NOT_NULL_VIOLATION: '23502',
} as const;
