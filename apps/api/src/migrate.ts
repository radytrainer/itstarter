import { resolve } from 'node:path';
import pg from 'pg';
import { loadLocalEnv } from './config/load-local-env';
import { runMigrations } from './db/migrator';
import { cliLog, requireDatabaseUrl } from './lib/cli';

// Usage: npm run db:migrate   (Docker: node apps/api/dist/migrate.js)
loadLocalEnv(import.meta.dirname);

const pool = new pg.Pool({ connectionString: requireDatabaseUrl(), max: 1 });
const migrationsFolder = resolve(import.meta.dirname, '../drizzle');

try {
  cliLog('Applying database migrations...');
  await runMigrations(pool, migrationsFolder);
  cliLog('✔ Database is up to date.');
} catch (err) {
  console.error('✖ Migration failed:', err instanceof Error ? err.message : err);
  process.exitCode = 1;
} finally {
  await pool.end();
}
