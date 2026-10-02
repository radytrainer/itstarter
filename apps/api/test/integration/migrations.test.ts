import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import pg from 'pg';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { runMigrations } from '../../src/db/migrator';

const migrationsFolder = resolve(import.meta.dirname, '../../drizzle');
const journal = JSON.parse(
  readFileSync(resolve(migrationsFolder, 'meta/_journal.json'), 'utf8'),
) as {
  entries: unknown[];
};

const EXPECTED_TABLES = [
  'achievements',
  'activities',
  'audit_logs',
  'badges',
  'cohorts',
  'courses',
  'lessons',
  'levels',
  'notifications',
  'question_options',
  'questions',
  'roles',
  'sessions',
  'staff',
  'student_achievements',
  'student_activity_attempts',
  'student_badges',
  'student_creations',
  'student_daily_activity',
  'student_lesson_progress',
  'student_progress',
  'students',
  'teacher_cohorts',
  'users',
  'worlds',
  'xp_transactions',
];

let pool: pg.Pool;

beforeAll(() => {
  pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 2 });
});
afterAll(async () => {
  await pool.end();
});

describe('migrations', () => {
  it('creates every table from the ERD', async () => {
    const { rows } = await pool.query<{ tablename: string }>(
      `select tablename from pg_tables where schemaname = 'public' order by tablename`,
    );
    expect(rows.map((r) => r.tablename)).toEqual(EXPECTED_TABLES);
  });

  it('records every migration in the journal as applied', async () => {
    const { rows } = await pool.query<{ count: string }>(
      'select count(*) from drizzle.__drizzle_migrations',
    );
    expect(Number(rows[0]?.count)).toBe(journal.entries.length);
  });

  it('is safe to run again (no-op)', async () => {
    await expect(runMigrations(pool, migrationsFolder)).resolves.toBeUndefined();
    const { rows } = await pool.query<{ count: string }>(
      'select count(*) from drizzle.__drizzle_migrations',
    );
    expect(Number(rows[0]?.count)).toBe(journal.entries.length);
  });

  it('creates the partial unique index that allows reusing a deleted username', async () => {
    const { rows } = await pool.query<{ indexdef: string }>(
      `select indexdef from pg_indexes where indexname = 'users_username_active_uq'`,
    );
    expect(rows[0]?.indexdef).toMatch(/UNIQUE INDEX .* WHERE \(deleted_at IS NULL\)/);
  });

  it('indexes every foreign key column used for lookups', async () => {
    const { rows } = await pool.query<{ indexname: string }>(
      `select indexname from pg_indexes where schemaname = 'public'`,
    );
    const names = rows.map((r) => r.indexname);
    for (const expected of [
      'worlds_course_position_idx',
      'lessons_world_position_idx',
      'activities_lesson_position_idx',
      'questions_activity_position_idx',
      'question_options_question_idx',
      'students_cohort_idx',
      'sessions_user_idx',
      'attempts_student_activity_idx',
      'xp_transactions_student_created_idx',
    ]) {
      expect(names).toContain(expected);
    }
  });
});
