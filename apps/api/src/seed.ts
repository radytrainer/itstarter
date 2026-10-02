import { Redis } from 'ioredis';
import pg from 'pg';
import { loadLocalEnv } from './config/load-local-env';
import { createDatabase } from './db/client';
import { runSeed, type SeedReport } from './db/seed/run-seed';
import { DEV_PASSWORDS, resolveSeedUsers } from './db/seed/users';
import { cliLog, requireDatabaseUrl } from './lib/cli';

// Usage: npm run db:seed   (Docker: node apps/api/dist/seed.js)
// Safe to run repeatedly: it only creates what is missing.
loadLocalEnv(import.meta.dirname);

const pool = new pg.Pool({ connectionString: requireDatabaseUrl(), max: 1 });

try {
  const users = resolveSeedUsers(process.env);
  cliLog('Seeding database...');
  const report = await runSeed(createDatabase(pool), { users });

  await refreshContentCache(report);

  cliLog('✔ Seed complete. Newly created:');
  for (const [kind, count] of Object.entries(report)) cliLog(`   ${kind.padEnd(13)} ${count}`);

  // Only ever print the well-known development defaults, never a password from the environment.
  const devPasswords: string[] = Object.values(DEV_PASSWORDS);
  const devAccounts = users.filter((u) => devPasswords.includes(u.password));
  if (report.users > 0 && devAccounts.length > 0) {
    cliLog('\nLocal development accounts (never use these anywhere real):');
    for (const u of devAccounts)
      cliLog(`   ${u.role.padEnd(8)} ${u.username.padEnd(14)} ${u.password}`);
  }
} catch (err) {
  console.error('✖ Seed failed:', err instanceof Error ? err.message : err);
  process.exitCode = 1;
} finally {
  await pool.end();
}

/**
 * New or retired content must show up straight away on a running server: bump the content cache
 * version (see lib/cache.ts). Redis is optional here — without it the cache simply expires.
 */
async function refreshContentCache(report: SeedReport) {
  const changed = ['courses', 'worlds', 'lessons', 'badges', 'retiredWorlds'].some(
    (kind) => (report[kind as keyof SeedReport] ?? 0) > 0,
  );
  if (!changed || !process.env.REDIS_URL) return;
  const redis = new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: 1, lazyConnect: true });
  try {
    await redis.connect();
    await redis.incr('content:version');
    cliLog('✔ Content cache refreshed.');
  } catch (err) {
    cliLog(
      `! Could not refresh the content cache (${(err as Error).message}); it expires within an hour.`,
    );
  } finally {
    redis.disconnect();
  }
}
