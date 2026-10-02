// Resets the E2E test students to brand-new accounts. Run by Playwright's global setup (in a
// separate Node process, outside Playwright's module loader) or by hand: npm run e2e:reset
// Refuses to touch anything but a LOCAL database.
import { resolve } from 'node:path';
import pg from 'pg';
import { Redis } from 'ioredis';
import { hash } from '@node-rs/argon2';

const E2E_USERS = ['e2e.android', 'e2e.iphone', 'e2e.layout'];
const E2E_PASSWORD = 'E2E-test-password-2028'; // keep in sync with e2e/accounts.ts

try {
  process.loadEnvFile(resolve(import.meta.dirname, '../.env'));
} catch {
  // CI provides the variables.
}
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('E2E needs DATABASE_URL (see .env.example)');
const host = new URL(databaseUrl).hostname;
if (!['localhost', '127.0.0.1'].includes(host) && process.env.E2E_ALLOW_RESET !== 'true') {
  throw new Error(`Refusing to reset test students on non-local database host "${host}"`);
}

const pool = new pg.Pool({ connectionString: databaseUrl, max: 2 });
const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

try {
  const { rows: cohorts } = await pool.query(`select id from cohorts order by created_at limit 1`);
  const passwordHash = await hash(E2E_PASSWORD, { algorithm: 2 });

  for (const username of E2E_USERS) {
    const existing = await pool.query(
      `select id from users where username = $1 and deleted_at is null`,
      [username],
    );
    let id = existing.rows[0]?.id;
    if (!id) {
      const inserted = await pool.query(
        `insert into users (username, display_name, password_hash, role_id) values ($1, 'E2E Tester', $2, 1) returning id`,
        [username, passwordHash],
      );
      id = inserted.rows[0].id;
      await pool.query(`insert into students (user_id, cohort_id) values ($1, $2)`, [
        id,
        cohorts[0]?.id ?? null,
      ]);
    }

    await pool.query(
      `update users set password_hash = $2, must_change_password = false, status = 'active', locale = 'en' where id = $1`,
      [id, passwordHash],
    );
    for (const table of [
      'student_activity_attempts',
      'student_lesson_progress',
      'student_progress',
      'student_creations',
      'student_daily_activity',
      'xp_transactions',
      'student_badges',
      'student_achievements',
    ]) {
      await pool.query(`delete from ${table} where student_id = $1`, [id]);
    }
    await pool.query(`delete from notifications where user_id = $1`, [id]);
    await pool.query(`delete from sessions where user_id = $1`, [id]);
    await pool.query(
      `update students set xp_total = 0, level = 1, current_streak = 0, longest_streak = 0, last_active_date = null where user_id = $1`,
      [id],
    );
    if (redis) await redis.del(`student:${id}:dashboard`, `rl:login:user:${username}`);
  }

  // Students created by earlier admin E2E runs: soft-delete them (frees the usernames).
  await pool.query(
    `update users set deleted_at = now(), status = 'disabled' where username like 'e2e.imp%' and deleted_at is null`,
  );

  // Repeated local runs log in many times from one IP: start each run with a clean login limit.
  if (redis) {
    const keys = await redis.keys('rl:login:ip:*');
    if (keys.length > 0) await redis.del(...keys);
  }
  console.log(`Reset E2E students: ${E2E_USERS.join(', ')}`);
} finally {
  await pool.end();
  redis?.disconnect();
}
