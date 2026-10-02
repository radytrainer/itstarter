import { asc, eq, sql } from 'drizzle-orm';
import { isSupportedKind } from '../../src/engine/checkers';
import { isGenerator } from '../../src/engine/generators';
import pg from 'pg';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { LESSON_STEPS } from '@itstarter/shared';
import { createDatabase, type Database } from '../../src/db/client';
import * as s from '../../src/db/schema';
import { ACHIEVEMENT_SEEDS, BADGE_SEEDS, WORLD_SEEDS } from '../../src/db/seed/data/foundation';
import { ALL_LESSONS } from '../../src/db/seed/data/lessons';
import { runSeed } from '../../src/db/seed/run-seed';
import { DEV_PASSWORDS, resolveSeedUsers } from '../../src/db/seed/users';
import { verifyPassword } from '../../src/lib/password';
import { resetData } from './test-db';

let pool: pg.Pool;
let db: Database;
const users = resolveSeedUsers({ NODE_ENV: 'test' });

async function rowCount(tableName: string): Promise<number> {
  const { rows } = await pool.query<{ n: string }>(`select count(*) as n from "${tableName}"`);
  return Number(rows[0]?.n);
}

beforeAll(async () => {
  pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 3 });
  db = createDatabase(pool);
  await resetData(pool);
  await runSeed(db, { users });
});

afterAll(async () => {
  await pool.end();
});

describe('seed: base data', () => {
  it('creates roles, levels, badges, achievements, the course and its 7 worlds', async () => {
    expect(await rowCount('roles')).toBe(3);
    expect(await rowCount('levels')).toBe(5);
    expect(await rowCount('badges')).toBe(BADGE_SEEDS.length);
    expect(await rowCount('achievements')).toBe(ACHIEVEMENT_SEEDS.length);
    expect(await rowCount('courses')).toBe(1);
    expect(await rowCount('cohorts')).toBe(1);

    const worlds = await db
      .select({ slug: s.worlds.slug, badgeId: s.worlds.badgeId, status: s.worlds.status })
      .from(s.worlds)
      .orderBy(asc(s.worlds.position));
    expect(worlds.map((w) => w.slug)).toEqual([
      'math-playground',
      'logic-playground',
      'computer-explorer',
      'office-creator',
      'internet-explorer',
      'ai-playground',
      'english-starter',
    ]);
    expect(worlds.every((w) => w.badgeId !== null && w.status === 'published')).toBe(true);
  });

  it('defines increasing level thresholds starting at 0 XP', async () => {
    const levels = await db.select().from(s.levels).orderBy(asc(s.levels.number));
    expect(levels[0]?.minXp).toBe(0);
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i]!.minXp).toBeGreaterThan(levels[i - 1]!.minXp);
    }
  });
});

describe('seed: lessons follow the learning structure', () => {
  it('gives every lesson the steps in order: welcome → learn → see → play… → challenge… → reward', async () => {
    const lessons = await db.select({ id: s.lessons.id, slug: s.lessons.slug }).from(s.lessons);
    expect(lessons.length).toBe(ALL_LESSONS.length);

    for (const lesson of lessons) {
      const steps = await db
        .select({ step: s.activities.step })
        .from(s.activities)
        .where(eq(s.activities.lessonId, lesson.id))
        .orderBy(asc(s.activities.position));
      // Every step appears, in this order; play and challenge may repeat (e.g. a mouse game
      // then questions, or questions then a creative project).
      const order = steps.map((a) => LESSON_STEPS.indexOf(a.step));
      expect(new Set(steps.map((a) => a.step)), lesson.slug).toEqual(new Set(LESSON_STEPS));
      expect(
        order.every((n, i) => i === 0 || n >= order[i - 1]!),
        lesson.slug,
      ).toBe(true);
    }
  });

  it('gives every scored activity at least one question', async () => {
    const { rows } = await pool.query<{ id: string; type: string }>(`
      select a.id, a.type from activities a
      where a.is_scored and not exists (select 1 from questions q where q.activity_id = a.id)`);
    expect(rows).toEqual([]);
  });

  it('never puts answers in PUBLIC activity config', async () => {
    const forbidden = /"(answer|answers|isCorrect|is_correct|correct|solution)"\s*:/;
    const rows = await db
      .select({ type: s.activities.type, config: s.activities.config })
      .from(s.activities);
    for (const row of rows) {
      expect(JSON.stringify(row.config), row.type).not.toMatch(forbidden);
    }
    // Questions' public data (mock emails, grids, keyboards) is sent too.
    const questionRows = await db
      .select({ kind: s.questions.kind, publicConfig: s.questions.publicConfig })
      .from(s.questions);
    for (const row of questionRows) {
      expect(JSON.stringify(row.publicConfig), row.kind).not.toMatch(forbidden);
    }
  });

  it('only uses question kinds the engine can check', async () => {
    const rows = await db.selectDistinct({ kind: s.questions.kind }).from(s.questions);
    for (const { kind } of rows) {
      expect(isSupportedKind(kind) || kind === 'generated', kind).toBe(true);
    }
  });

  it('every badge can actually be earned with the content that exists', async () => {
    const badges = await db.select().from(s.badges);
    const worldSlugs = new Set(
      (await db.select({ slug: s.worlds.slug }).from(s.worlds)).map((w) => w.slug),
    );
    const typeCounts = await pool.query<{ type: string; n: string }>(
      `select type, count(*) as n from activities group by type`,
    );
    const counts = new Map(typeCounts.rows.map((r) => [r.type, Number(r.n)]));
    for (const { code, criteria } of badges) {
      if (criteria.type === 'world_completed')
        expect(worldSlugs.has(criteria.worldSlug), code).toBe(true);
      if (criteria.type === 'activity_type_completed') {
        expect(counts.get(criteria.activityType) ?? 0, code).toBeGreaterThanOrEqual(criteria.count);
      }
    }
  });

  it('creative activities define their fields', async () => {
    const rows = await db.select().from(s.activities).where(eq(s.activities.type, 'creation'));
    expect(rows.length).toBeGreaterThanOrEqual(4);
    for (const row of rows) {
      const fields = row.config.fields as { key: string; label: { en: string } }[];
      expect(fields.length, row.id).toBeGreaterThan(0);
      for (const f of fields) expect(f.key).toMatch(/^[a-z][a-zA-Z0-9]*$/);
    }
  });
});

describe('seed: every question is answerable', () => {
  it('generated questions name a real generator', async () => {
    const rows = await db.select().from(s.questions).where(eq(s.questions.kind, 'generated'));
    expect(rows.length).toBeGreaterThan(20);
    for (const q of rows)
      expect(isGenerator(q.config.generator), String(q.config.generator)).toBe(true);
  });

  it('key combos, cells and formatting have expected answers', async () => {
    const rows = await db
      .select()
      .from(s.questions)
      .where(sql`${s.questions.kind} in ('key_combo', 'cell_select', 'format_text')`);
    expect(rows.length).toBeGreaterThan(10);
    for (const q of rows) {
      const answer = q.config.answer;
      if (q.kind === 'key_combo')
        expect(Array.isArray(answer) && answer.length > 0, q.id).toBe(true);
      if (q.kind === 'cell_select') {
        expect(answer).toMatch(/^[A-Z][1-9][0-9]?$/);
        const rowsInGrid = (q.publicConfig.grid as { rows: unknown[][] }).rows;
        const column = (answer as string).charCodeAt(0) - 65;
        const row = Number((answer as string).slice(1)) - 1;
        // The answer cell is inside the sheet (or the first empty row below it).
        expect(column, q.id).toBeLessThan(rowsInGrid[0]!.length);
        expect(row, q.id).toBeLessThanOrEqual(rowsInGrid.length);
      }
      if (q.kind === 'format_text')
        expect(Object.keys(answer as object).length, q.id).toBeGreaterThan(0);
    }
  });

  it('categorize: every item belongs to an existing bucket', async () => {
    const { rows } = await pool.query<{
      question_id: string;
      group_key: string;
      match_key: string;
    }>(`
      select o.question_id, o.group_key, o.match_key
      from questions q join question_options o on o.question_id = q.id where q.kind = 'categorize'`);
    expect(rows.length).toBeGreaterThan(0);
    const buckets = new Set(
      rows.filter((r) => r.group_key === 'bucket').map((r) => `${r.question_id}:${r.match_key}`),
    );
    for (const r of rows.filter((x) => x.group_key === 'item')) {
      expect(buckets.has(`${r.question_id}:${r.match_key}`), r.match_key).toBe(true);
    }
  });

  it('prompt builder: exactly one best piece per part', async () => {
    const { rows } = await pool.query<{ question_id: string; group_key: string; correct: string }>(`
      select o.question_id, o.group_key, count(*) filter (where o.is_correct) as correct
      from questions q join question_options o on o.question_id = q.id
      where q.kind = 'prompt_builder' group by o.question_id, o.group_key`);
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) expect(Number(r.correct), `${r.question_id}/${r.group_key}`).toBe(1);
  });

  it('single choice: exactly one correct option', async () => {
    const { rows } = await pool.query<{ prompt: unknown; correct: string; total: string }>(`
      select q.prompt, count(*) filter (where o.is_correct) as correct, count(*) as total
      from questions q join question_options o on o.question_id = q.id
      where q.kind = 'single_choice' group by q.id`);
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) {
      expect(Number(r.correct), JSON.stringify(r.prompt)).toBe(1);
      expect(Number(r.total)).toBeGreaterThanOrEqual(2);
    }
  });

  it('number / true-false / safe-or-dangerous: an expected answer of the right type', async () => {
    const rows = await db
      .select({ kind: s.questions.kind, config: s.questions.config })
      .from(s.questions)
      .where(sql`${s.questions.kind} in ('number', 'true_false', 'safe_or_dangerous')`);
    expect(rows.length).toBeGreaterThan(0);
    for (const { kind, config } of rows) {
      if (kind === 'number') expect(typeof config.answer).toBe('number');
      if (kind === 'true_false') expect(typeof config.answer).toBe('boolean');
      if (kind === 'safe_or_dangerous') expect(['safe', 'dangerous']).toContain(config.answer);
    }
  });

  it('matching: every pair has one left and one right option', async () => {
    const { rows } = await pool.query<{ match_key: string; groups: string[] }>(`
      select o.match_key, array_agg(o.group_key order by o.group_key) as groups
      from questions q join question_options o on o.question_id = q.id
      where q.kind = 'matching' group by q.id, o.match_key`);
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) expect(r.groups, r.match_key).toEqual(['left', 'right']);
  });

  it('ordering: positions 1..n with no gaps', async () => {
    const { rows } = await pool.query<{ orders: number[] }>(`
      select array_agg(o.correct_order order by o.correct_order) as orders
      from questions q join question_options o on o.question_id = q.id
      where q.kind = 'ordering' group by q.id`);
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) expect(r.orders).toEqual(r.orders.map((_, i) => i + 1));
  });
});

describe('seed: accounts', () => {
  it('creates admin, teacher and student with the right roles and profiles', async () => {
    const { rows } = await pool.query<{
      username: string;
      role: string;
      is_staff: boolean;
      is_student: boolean;
      cohort: string | null;
    }>(`
      select u.username, r.code as role,
             exists (select 1 from staff st where st.user_id = u.id) as is_staff,
             exists (select 1 from students sd where sd.user_id = u.id) as is_student,
             coalesce(
               (select c.name from students sd join cohorts c on c.id = sd.cohort_id where sd.user_id = u.id),
               (select c.name from teacher_cohorts tc join cohorts c on c.id = tc.cohort_id where tc.staff_user_id = u.id)
             ) as cohort
      from users u join roles r on r.id = u.role_id order by u.username`);

    expect(rows).toEqual([
      { username: 'admin', role: 'ADMIN', is_staff: true, is_student: false, cohort: null },
      {
        username: 'student.demo',
        role: 'STUDENT',
        is_staff: false,
        is_student: true,
        cohort: 'Generation 2028 – Class A',
      },
      {
        username: 'teacher.demo',
        role: 'TEACHER',
        is_staff: true,
        is_student: false,
        cohort: 'Generation 2028 – Class A',
      },
    ]);
  });

  it('stores Argon2id hashes that verify against the seed passwords', async () => {
    const [admin] = await db.select().from(s.users).where(eq(s.users.username, 'admin'));
    expect(admin!.passwordHash).toMatch(/^\$argon2id\$/);
    expect(admin!.passwordHash).not.toContain(DEV_PASSWORDS.admin);
    expect(await verifyPassword(admin!.passwordHash, DEV_PASSWORDS.admin)).toBe(true);
    expect(await verifyPassword(admin!.passwordHash, 'wrong-password')).toBe(false);
  });
});

describe('seed: idempotent and non-destructive', () => {
  it('creates nothing on a second run', async () => {
    const report = await runSeed(db, { users });
    expect(Object.values(report).every((n) => n === 0)).toBe(true);
    expect(await rowCount('lessons')).toBe(ALL_LESSONS.length);
    expect(await rowCount('users')).toBe(3);
  });

  it('keeps admin edits and changed passwords', async () => {
    await db
      .update(s.lessons)
      .set({ title: { en: 'Edited by admin' } })
      .where(eq(s.lessons.slug, 'number-patterns'));
    await db
      .update(s.users)
      .set({ passwordHash: 'changed-hash' })
      .where(eq(s.users.username, 'student.demo'));

    await runSeed(db, { users });

    const [lesson] = await db.select().from(s.lessons).where(eq(s.lessons.slug, 'number-patterns'));
    const [student] = await db.select().from(s.users).where(eq(s.users.username, 'student.demo'));
    expect(lesson!.title).toEqual({ en: 'Edited by admin' });
    expect(student!.passwordHash).toBe('changed-hash');
  });
});

describe('seed: Brain Playground split into Math and Logic', () => {
  it('archives the old world on a database seeded before the split, keeping student history', async () => {
    const [course] = await db.select().from(s.courses);
    const [oldBadge] = await db
      .insert(s.badges)
      .values({
        code: 'brain-master',
        icon: '🧠',
        name: { en: 'Brain Master' },
        description: { en: 'Old badge' },
        criteria: { type: 'world_completed', worldSlug: 'brain-playground' },
      })
      .returning();
    const [oldWorld] = await db
      .insert(s.worlds)
      .values({
        courseId: course!.id,
        slug: 'brain-playground',
        title: { en: 'Brain Playground' },
        icon: '🧠',
        color: 'violet',
        position: 1,
        status: 'published',
        badgeId: oldBadge!.id,
      })
      .returning();
    const [oldLesson] = await db
      .insert(s.lessons)
      .values({
        worldId: oldWorld!.id,
        slug: 'old-lesson',
        title: { en: 'Old' },
        status: 'published',
      })
      .returning();
    const [student] = await db
      .select({ id: s.users.id })
      .from(s.users)
      .where(eq(s.users.username, 'student.demo'));
    await db
      .insert(s.studentLessonProgress)
      .values({ studentId: student!.id, lessonId: oldLesson!.id, status: 'completed' });

    const report = await runSeed(db, { users });
    expect(report.retiredWorlds).toBe(1);

    const [world] = await db.select().from(s.worlds).where(eq(s.worlds.id, oldWorld!.id));
    expect(world).toMatchObject({ status: 'archived' });
    expect(world!.deletedAt).not.toBeNull();
    const [lesson] = await db.select().from(s.lessons).where(eq(s.lessons.id, oldLesson!.id));
    expect(lesson).toMatchObject({ status: 'archived' });
    const [badge] = await db.select().from(s.badges).where(eq(s.badges.id, oldBadge!.id));
    expect(badge!.status).toBe('archived');
    // History is kept.
    const progress = await db
      .select()
      .from(s.studentLessonProgress)
      .where(eq(s.studentLessonProgress.lessonId, oldLesson!.id));
    expect(progress).toHaveLength(1);

    const live = await db
      .select({ slug: s.worlds.slug })
      .from(s.worlds)
      .where(sql`${s.worlds.deletedAt} is null`)
      .orderBy(asc(s.worlds.position));
    expect(live.map((w) => w.slug)).toEqual(WORLD_SEEDS.map((w) => w.slug));

    expect((await runSeed(db, { users })).retiredWorlds).toBe(0);
  });
});

describe('seed: rewritten lessons reach existing databases', () => {
  async function stepsOf(slug: string) {
    const [lesson] = await db.select().from(s.lessons).where(eq(s.lessons.slug, slug));
    const rows = await db.select().from(s.activities).where(eq(s.activities.lessonId, lesson!.id));
    return { lesson: lesson!, live: rows.filter((a) => a.deletedAt === null), all: rows };
  }

  it('replaces an older revision (old steps archived, history kept)', async () => {
    // Pretend this database still has the revision-1 lesson.
    const before = await stepsOf('computer-parts');
    await db
      .update(s.lessons)
      .set({ seedRevision: 1, title: { en: 'Old title' } })
      .where(eq(s.lessons.id, before.lesson.id));

    const report = await runSeed(db, { users });
    expect(report.lessonsUpgraded).toBe(1);

    const after = await stepsOf('computer-parts');
    expect(after.lesson.seedRevision).toBe(3); // revision 3 added the game round
    expect(after.lesson.title).toMatchObject({ en: 'Parts of a Computer' });
    expect(after.live).toHaveLength(before.live.length);
    expect(after.live.every((a) => !before.live.some((b) => b.id === a.id))).toBe(true);
    expect(after.all.length).toBe(before.live.length * 2); // old ones archived, not deleted

    expect((await runSeed(db, { users })).lessonsUpgraded).toBe(0);
  });

  it('keeps a lesson that staff edited in the admin area', async () => {
    const before = await stepsOf('copy-and-paste');
    await db.update(s.lessons).set({ seedRevision: 1 }).where(eq(s.lessons.id, before.lesson.id));
    await db.insert(s.auditLogs).values({
      action: 'lesson.updated',
      entityType: 'lesson',
      entityId: before.lesson.id,
    });

    const report = await runSeed(db, { users });
    expect(report).toMatchObject({ lessonsUpgraded: 0, lessonsKeptAsEdited: 1 });
    const after = await stepsOf('copy-and-paste');
    expect(after.live.map((a) => a.id)).toEqual(before.live.map((a) => a.id));
    expect((await runSeed(db, { users })).lessonsKeptAsEdited).toBe(0);
  });
});
