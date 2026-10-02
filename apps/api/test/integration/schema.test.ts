import { and, eq, isNull, sum } from 'drizzle-orm';
import pg from 'pg';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createDatabase, type Database } from '../../src/db/client';
import * as s from '../../src/db/schema';
import { runSeed } from '../../src/db/seed/run-seed';
import { uuidv7 } from '../../src/lib/uuid';
import { PG, pgErrorCode, resetData } from './test-db';

let pool: pg.Pool;
let db: Database;
let studentRoleId: number;
let counter = 0;
const uniqueName = (prefix: string) => `${prefix}${Date.now()}x${(counter += 1)}`;

async function expectPgError(promise: Promise<unknown>, code: string) {
  const err = await promise.then(
    () => undefined,
    (e: unknown) => e,
  );
  expect(err, `expected PostgreSQL error ${code}`).toBeDefined();
  expect(pgErrorCode(err)).toBe(code);
}

async function createStudent(username = uniqueName('student')) {
  const [user] = await db
    .insert(s.users)
    .values({ username, displayName: 'Test Student', passwordHash: 'x', roleId: studentRoleId })
    .returning();
  await db.insert(s.students).values({ userId: user!.id });
  return user!;
}

beforeAll(async () => {
  pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 3 });
  db = createDatabase(pool);
  await resetData(pool);
  await runSeed(db, { users: [] }); // content + roles, no accounts
  const [role] = await db.select().from(s.roles).where(eq(s.roles.code, 'STUDENT'));
  studentRoleId = role!.id;
});

afterAll(async () => {
  await pool.end();
});

describe('CRUD: a student account', () => {
  it('creates, reads, updates and soft-deletes', async () => {
    // create
    const user = await createStudent();
    expect(user.status).toBe('active');
    expect(user.locale).toBe('en');

    // read (with profile)
    const [read] = await db
      .select({ username: s.users.username, xp: s.students.xpTotal, level: s.students.level })
      .from(s.users)
      .innerJoin(s.students, eq(s.students.userId, s.users.id))
      .where(eq(s.users.id, user.id));
    expect(read).toEqual({ username: user.username, xp: 0, level: 1 });

    // update: updated_at moves forward
    await new Promise((r) => setTimeout(r, 15));
    const [updated] = await db
      .update(s.users)
      .set({ displayName: 'Sokha', locale: 'km' })
      .where(eq(s.users.id, user.id))
      .returning();
    expect(updated!.displayName).toBe('Sokha');
    expect(updated!.updatedAt.getTime()).toBeGreaterThan(user.updatedAt.getTime());

    // soft delete: row stays, but "active users" no longer include it
    await db.update(s.users).set({ deletedAt: new Date() }).where(eq(s.users.id, user.id));
    const active = await db
      .select()
      .from(s.users)
      .where(and(eq(s.users.id, user.id), isNull(s.users.deletedAt)));
    expect(active).toHaveLength(0);
    const [stillThere] = await db.select().from(s.users).where(eq(s.users.id, user.id));
    expect(stillThere?.deletedAt).toBeInstanceOf(Date);
  });
});

describe('constraints: users', () => {
  it('rejects a duplicate active username', async () => {
    const user = await createStudent();
    await expectPgError(createStudent(user.username), PG.UNIQUE_VIOLATION);
  });

  it('allows reusing a username after the old account is soft-deleted', async () => {
    const user = await createStudent();
    await db.update(s.users).set({ deletedAt: new Date() }).where(eq(s.users.id, user.id));
    await expect(createStudent(user.username)).resolves.toMatchObject({ username: user.username });
  });

  it.each([['Sokha'], ['ab'], ['has space'], ['-starts-with-dash']])(
    'rejects the invalid username %j',
    async (username) => {
      await expectPgError(createStudent(username), PG.CHECK_VIOLATION);
    },
  );

  it('treats emails case-insensitively', async () => {
    const email = `${uniqueName('mail')}@example.com`;
    const a = await createStudent();
    await db.update(s.users).set({ email }).where(eq(s.users.id, a.id));
    const b = await createStudent();
    await expectPgError(
      db.update(s.users).set({ email: email.toUpperCase() }).where(eq(s.users.id, b.id)),
      PG.UNIQUE_VIOLATION,
    );
  });

  it('only accepts supported locales', async () => {
    const user = await createStudent();
    await expectPgError(
      db.update(s.users).set({ locale: 'fr' }).where(eq(s.users.id, user.id)),
      PG.CHECK_VIOLATION,
    );
  });
});

describe('constraints: XP ledger', () => {
  it('cannot award XP twice for the same source', async () => {
    const user = await createStudent();
    const activityId = uuidv7();
    const award = () =>
      db.insert(s.xpTransactions).values({
        studentId: user.id,
        amount: 10,
        sourceType: 'activity',
        sourceId: activityId,
      });

    await award();
    await expectPgError(award(), PG.UNIQUE_VIOLATION);

    // ON CONFLICT DO NOTHING is how the engine will award XP safely.
    const retried = await db
      .insert(s.xpTransactions)
      .values({ studentId: user.id, amount: 10, sourceType: 'activity', sourceId: activityId })
      .onConflictDoNothing()
      .returning();
    expect(retried).toHaveLength(0);

    await db
      .insert(s.xpTransactions)
      .values({ studentId: user.id, amount: 50, sourceType: 'lesson', sourceId: uuidv7() });
    const [total] = await db
      .select({ xp: sum(s.xpTransactions.amount).mapWith(Number) })
      .from(s.xpTransactions)
      .where(eq(s.xpTransactions.studentId, user.id));
    expect(total?.xp).toBe(60);
  });

  it('rejects a zero XP transaction and negative cached XP', async () => {
    const user = await createStudent();
    await expectPgError(
      db
        .insert(s.xpTransactions)
        .values({ studentId: user.id, amount: 0, sourceType: 'admin', sourceId: uuidv7() }),
      PG.CHECK_VIOLATION,
    );
    await expectPgError(
      db.update(s.students).set({ xpTotal: -5 }).where(eq(s.students.userId, user.id)),
      PG.CHECK_VIOLATION,
    );
  });
});

describe('relationships', () => {
  it('deleting a user removes their profile, sessions and XP (cascade)', async () => {
    const user = await createStudent();
    await db.insert(s.sessions).values({
      userId: user.id,
      tokenHash: uuidv7().replaceAll('-', '').padEnd(64, '0'),
      expiresAt: new Date(Date.now() + 60_000),
    });
    await db
      .insert(s.xpTransactions)
      .values({ studentId: user.id, amount: 5, sourceType: 'admin', sourceId: uuidv7() });

    await db.delete(s.users).where(eq(s.users.id, user.id));

    expect(await db.select().from(s.students).where(eq(s.students.userId, user.id))).toHaveLength(
      0,
    );
    expect(await db.select().from(s.sessions).where(eq(s.sessions.userId, user.id))).toHaveLength(
      0,
    );
    expect(
      await db.select().from(s.xpTransactions).where(eq(s.xpTransactions.studentId, user.id)),
    ).toHaveLength(0);
  });

  it('refuses to hard-delete a world that still has lessons (restrict)', async () => {
    const [world] = await db.select().from(s.worlds).where(eq(s.worlds.slug, 'math-playground'));
    await expectPgError(
      db.delete(s.worlds).where(eq(s.worlds.id, world!.id)),
      PG.FOREIGN_KEY_VIOLATION,
    );
  });

  it('deleting a question removes its options but keeps student attempts', async () => {
    const user = await createStudent();
    const [question] = await db
      .select()
      .from(s.questions)
      .where(eq(s.questions.kind, 'single_choice'))
      .limit(1);
    const [attempt] = await db
      .insert(s.studentActivityAttempts)
      .values({
        studentId: user.id,
        activityId: question!.activityId,
        questionId: question!.id,
        answer: { optionId: 'x' },
        isCorrect: false,
        score: 0,
      })
      .returning();

    await db.delete(s.questions).where(eq(s.questions.id, question!.id));

    const options = await db
      .select()
      .from(s.questionOptions)
      .where(eq(s.questionOptions.questionId, question!.id));
    expect(options).toHaveLength(0);
    const [kept] = await db
      .select()
      .from(s.studentActivityAttempts)
      .where(eq(s.studentActivityAttempts.id, attempt!.id));
    expect(kept?.questionId).toBeNull();
  });

  it('rejects progress for a lesson that does not exist', async () => {
    const user = await createStudent();
    await expectPgError(
      db.insert(s.studentLessonProgress).values({ studentId: user.id, lessonId: uuidv7() }),
      PG.FOREIGN_KEY_VIOLATION,
    );
  });

  it('keeps one progress row per student and lesson', async () => {
    const user = await createStudent();
    const [lesson] = await db.select().from(s.lessons).limit(1);
    await db.insert(s.studentLessonProgress).values({ studentId: user.id, lessonId: lesson!.id });
    await expectPgError(
      db.insert(s.studentLessonProgress).values({ studentId: user.id, lessonId: lesson!.id }),
      PG.UNIQUE_VIOLATION,
    );
  });

  it('keeps percentages and scores in 0–100', async () => {
    const user = await createStudent();
    const [world] = await db.select().from(s.worlds).limit(1);
    await expectPgError(
      db.insert(s.studentProgress).values({ studentId: user.id, worldId: world!.id, percent: 101 }),
      PG.CHECK_VIOLATION,
    );
  });
});

describe('data types', () => {
  it('stores and returns Khmer text unchanged', async () => {
    const khmer = 'ក្តារចុច';
    const [badge] = await db
      .insert(s.badges)
      .values({
        code: uniqueName('kb'),
        name: { en: 'Keyboard', km: khmer },
        description: { en: 'Test' },
        icon: '⌨️',
        criteria: { type: 'xp_reached', xp: 1 },
      })
      .returning();
    const [read] = await db.select().from(s.badges).where(eq(s.badges.id, badge!.id));
    expect(read?.name).toEqual({ en: 'Keyboard', km: khmer });
  });

  it('generates time-ordered UUIDv7 primary keys', async () => {
    const first = await createStudent();
    await new Promise((r) => setTimeout(r, 2));
    const second = await createStudent();
    expect(first.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
    expect(second.id > first.id).toBe(true);
  });
});
