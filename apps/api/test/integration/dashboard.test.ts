import { and, eq } from 'drizzle-orm';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import type { Dashboard, WorldDetail } from '@itstarter/shared';
import * as s from '../../src/db/schema';
import { ALL_LESSONS } from '../../src/db/seed/data/lessons';
import {
  createTestContext,
  createUser,
  flushTestRedis,
  loginAs,
  seededCohortId,
  type TestContext,
} from './helpers';

let ctx: TestContext;
const ids: Record<string, string> = {};
const cookies: Record<string, string> = {};

const get = (url: string, who: string) =>
  ctx.app.inject({ method: 'GET', url, headers: { cookie: cookies[who]! } });

async function lessonId(slug: string) {
  const [row] = await ctx.deps.db.select().from(s.lessons).where(eq(s.lessons.slug, slug));
  return row!.id;
}

beforeAll(async () => {
  ctx = await createTestContext();
  const cohort = await seededCohortId(ctx.deps);
  ids.sokha = await createUser(ctx.deps, { username: 'sokha', role: 'STUDENT', cohortId: cohort });
  ids.dara = await createUser(ctx.deps, { username: 'dara', role: 'STUDENT', cohortId: cohort });
  ids.teacher = await createUser(ctx.deps, {
    username: 'teach',
    role: 'TEACHER',
    cohortId: cohort,
  });

  // Sokha has finished "number-patterns", started "computer-parts", and has some XP + a badge.
  await ctx.deps.db.insert(s.studentLessonProgress).values([
    {
      studentId: ids.sokha,
      lessonId: await lessonId('number-patterns'),
      status: 'completed',
      bestScore: 90,
      completedAt: new Date(),
    },
    { studentId: ids.sokha, lessonId: await lessonId('computer-parts'), status: 'in_progress' },
  ]);
  await ctx.deps.db
    .update(s.students)
    .set({ xpTotal: 450 })
    .where(eq(s.students.userId, ids.sokha));
  const [badge] = await ctx.deps.db.select().from(s.badges).where(eq(s.badges.code, 'math-master'));
  await ctx.deps.db.insert(s.studentBadges).values({ studentId: ids.sokha, badgeId: badge!.id });
});

beforeEach(async () => {
  await flushTestRedis(ctx.deps);
  cookies.sokha = await loginAs(ctx.app, 'sokha');
  cookies.dara = await loginAs(ctx.app, 'dara');
  cookies.teacher = await loginAs(ctx.app, 'teach');
});

afterAll(async () => {
  await ctx?.close();
});

describe('GET /api/progress (student dashboard)', () => {
  it('summarises the student’s journey', async () => {
    const res = await get('/api/progress', 'sokha');
    expect(res.statusCode).toBe(200);
    const d = res.json().data as Dashboard;

    expect(d.student.xpTotal).toBe(450);
    expect(d.student.level).toMatchObject({
      number: 2,
      name: { en: 'IT Explorer' },
      xpToNext: 450,
    });
    expect(d.course).toMatchObject({
      lessonsTotal: ALL_LESSONS.length,
      lessonsCompleted: 1,
      percent: Math.round(100 / ALL_LESSONS.length),
    });

    const math = d.worlds.find((w) => w.slug === 'math-playground')!;
    expect(math).toMatchObject({ lessonsTotal: 15, lessonsCompleted: 1, percent: 7 });
    expect(d.worlds.map((w) => w.slug)).toEqual([
      'math-playground',
      'logic-playground',
      'computer-explorer',
      'office-creator',
      'internet-explorer',
      'ai-playground',
      'english-starter',
      'it-vocabulary',
      'coding-basics',
      'web-design',
      'networks-hardware',
      'cyber-security',
    ]);

    expect(d.continue).toMatchObject({ title: { en: 'Parts of a Computer' }, started: true });
    expect(d.badges.filter((b) => b.earned).map((b) => b.code)).toEqual(['math-master']);
  });

  it('is private: each student sees only their own data (even with caching)', async () => {
    await get('/api/progress', 'sokha'); // warm Sokha's cache
    const d = (await get('/api/progress', 'dara')).json().data as Dashboard;
    expect(d.student.xpTotal).toBe(0);
    expect(d.course?.lessonsCompleted).toBe(0);
    expect(d.continue).toMatchObject({
      title: { en: 'Adding & Subtracting', km: 'ការបូក និងការដក' },
      started: false,
    });
    expect(d.badges.some((b) => b.earned)).toBe(false);
  });

  it('is for students only', async () => {
    expect((await get('/api/progress', 'teacher')).statusCode).toBe(403);
  });

  it('never exposes answers or other students', async () => {
    const res = await get('/api/progress', 'sokha');
    expect(res.body).not.toMatch(/is_correct|isCorrect|"answer"|password|dara/);
  });
});

describe('content endpoints', () => {
  it('GET /api/worlds/:id lists lessons with the student’s status', async () => {
    const [world] = await ctx.deps.db
      .select()
      .from(s.worlds)
      .where(eq(s.worlds.slug, 'math-playground'));
    const res = await get(`/api/worlds/${world!.id}`, 'sokha');
    const w = res.json().data as WorldDetail;
    expect(w.lessons).toHaveLength(15);
    const status = Object.fromEntries(w.lessons.map((l) => [l.slug, [l.status, l.bestScore]]));
    expect(status['number-patterns']).toEqual(['completed', 90]);
    expect(status['money-maths']).toEqual(['not_started', null]);
    expect(w.lessons.map((l) => l.position)).toEqual(Array.from({ length: 15 }, (_, i) => i + 1));
  });

  it('hides draft and deleted lessons and worlds from everyone', async () => {
    const [world] = await ctx.deps.db
      .select()
      .from(s.worlds)
      .where(eq(s.worlds.slug, 'office-creator'));
    await ctx.deps.db
      .update(s.lessons)
      .set({ status: 'draft' })
      .where(and(eq(s.lessons.worldId, world!.id)));
    await ctx.deps.db
      .update(s.worlds)
      .set({ deletedAt: new Date() })
      .where(eq(s.worlds.slug, 'ai-playground'));
    await ctx.deps.redis.incr('content:version'); // what admin edits will do

    try {
      const d = (await get('/api/progress', 'dara')).json().data as Dashboard;
      expect(d.worlds.find((w) => w.slug === 'office-creator')?.lessonsTotal).toBe(0);
      expect(d.worlds.some((w) => w.slug === 'ai-playground')).toBe(false);

      const [ai] = await ctx.deps.db
        .select()
        .from(s.worlds)
        .where(eq(s.worlds.slug, 'ai-playground'));
      expect((await get(`/api/worlds/${ai!.id}`, 'dara')).statusCode).toBe(404);
    } finally {
      await ctx.deps.db
        .update(s.lessons)
        .set({ status: 'published' })
        .where(eq(s.lessons.worldId, world!.id));
      await ctx.deps.db
        .update(s.worlds)
        .set({ deletedAt: null })
        .where(eq(s.worlds.slug, 'ai-playground'));
      await ctx.deps.redis.incr('content:version');
    }
  });

  it('lets staff browse the course without student data', async () => {
    const { id } = (await get('/api/courses/default', 'teacher')).json().data;
    const course = (await get(`/api/courses/${id}`, 'teacher')).json().data;
    expect(course.worlds).toHaveLength(12);
    expect(course.worlds.map((w: { lessonsTotal: number }) => w.lessonsTotal)).toEqual(
      Array(12).fill(15),
    );
  });

  it('returns friendly 404s', async () => {
    const res = await get('/api/worlds/00000000-0000-7000-8000-000000000000', 'sokha');
    expect(res.statusCode).toBe(404);
    expect(res.json().error.code).toBe('WORLD_NOT_FOUND');
    expect((await get('/api/worlds/not-a-uuid', 'sokha')).statusCode).toBe(400);
  });

  it('GET /api/badges and /api/achievements show earned state', async () => {
    const badges = (await get('/api/badges', 'sokha')).json().data;
    expect(badges).toHaveLength(16);
    expect(badges.find((b: { code: string }) => b.code === 'math-master').earned).toBe(true);
    const achievements = (await get('/api/achievements', 'sokha')).json().data;
    expect(achievements).toHaveLength(7);
  });

  it('works when Redis is wiped (cache is optional)', async () => {
    await flushTestRedis(ctx.deps);
    cookies.sokha = await loginAs(ctx.app, 'sokha');
    expect((await get('/api/progress', 'sokha')).statusCode).toBe(200);
  });
});
