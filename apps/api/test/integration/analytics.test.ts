import { and, eq, isNull } from 'drizzle-orm';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import type {
  AnalyticsActivities,
  AnalyticsEngagement,
  AnalyticsOverview,
  AnalyticsWorlds,
  LessonPlay,
} from '@itstarter/shared';
import * as s from '../../src/db/schema';
import { localDate } from '../../src/engine/streak';
import { lessonIdBySlug, playLesson, wrongAnswerFor } from './answers';
import {
  createCohort,
  createTestContext,
  createUser,
  CSRF,
  flushTestRedis,
  loginAs,
  type TestContext,
} from './helpers';

// Class A: three students finish "Number Patterns" (one gets a question wrong first), one never
// starts. Class B: one student finishes "What Is a Computer?". Numbers are exact on fresh data.

let ctx: TestContext;
let classA: string;
let classB: string;
let publishedLessons: number;
let missedActivityId: string;
const ids: Record<string, string> = {};
const cookies: Record<string, string> = {};

const get = <T>(url: string, who: string) =>
  ctx.app
    .inject({ method: 'GET', url, headers: { cookie: cookies[who]! } })
    .then((res) => ({ status: res.statusCode, body: res.body, data: res.json().data as T }));

async function finish(username: string, slug: string) {
  const student = { id: ids[username]!, cookie: await loginAs(ctx.app, username) };
  const res = await (await playLesson(ctx, student, slug)).complete();
  expect(res.statusCode, res.body).toBe(200);
}

beforeAll(async () => {
  ctx = await createTestContext();
  classA = await createCohort(ctx.deps, 'Analytics A');
  classB = await createCohort(ctx.deps, 'Analytics B');
  await createUser(ctx.deps, { username: 'boss', role: 'ADMIN' });
  await createUser(ctx.deps, { username: 'teach.a', role: 'TEACHER', cohortId: classA });
  for (const name of ['kid.a1', 'kid.a2', 'kid.a3', 'kid.a4'])
    ids[name] = await createUser(ctx.deps, { username: name, role: 'STUDENT', cohortId: classA });
  ids['kid.b1'] = await createUser(ctx.deps, {
    username: 'kid.b1',
    role: 'STUDENT',
    cohortId: classB,
  });

  // kid.a1 answers one question wrong before playing the lesson properly.
  const lessonId = await lessonIdBySlug(ctx, 'number-patterns');
  const a1 = await loginAs(ctx.app, 'kid.a1');
  const lesson = (
    await ctx.app.inject({
      method: 'GET',
      url: `/api/lessons/${lessonId}`,
      headers: { cookie: a1 },
    })
  ).json().data as LessonPlay;
  const activity = lesson.activities.find((a) => a.type === 'multiple_choice')!;
  missedActivityId = activity.id;
  const q = activity.questions[0]!;
  await ctx.app.inject({
    method: 'POST',
    url: `/api/lessons/${lessonId}/start`,
    headers: { ...CSRF, cookie: a1 },
  });
  const wrong = await ctx.app.inject({
    method: 'POST',
    url: `/api/activities/${activity.id}/answer`,
    headers: { ...CSRF, cookie: a1 },
    payload: { questionId: q.id, answer: await wrongAnswerFor(ctx, q.id) },
  });
  expect(wrong.json().data.correct).toBe(false);

  for (const name of ['kid.a1', 'kid.a2', 'kid.a3']) await finish(name, 'number-patterns');
  await finish('kid.b1', 'what-is-a-computer');

  publishedLessons = (
    await ctx.deps.db
      .select({ id: s.lessons.id })
      .from(s.lessons)
      .where(and(eq(s.lessons.status, 'published'), isNull(s.lessons.deletedAt)))
  ).length;
});

beforeEach(async () => {
  await flushTestRedis(ctx.deps);
  for (const who of ['boss', 'teach.a', 'kid.a1']) cookies[who] = await loginAs(ctx.app, who);
});

afterAll(async () => {
  await ctx?.close();
});

describe('access', () => {
  it('is for staff only, and teachers only see their own classes', async () => {
    const anon = await ctx.app.inject({ method: 'GET', url: '/api/admin/analytics/overview' });
    expect(anon.statusCode).toBe(401);
    expect((await get('/api/admin/analytics/overview', 'kid.a1')).status).toBe(403);
    expect((await get('/api/admin/analytics/overview', 'teach.a')).status).toBe(200);
    expect((await get(`/api/admin/analytics/overview?cohortId=${classB}`, 'teach.a')).status).toBe(
      404,
    );
    expect((await get(`/api/admin/analytics/overview?cohortId=${classB}`, 'boss')).status).toBe(
      200,
    );
  });

  it('rejects windows other than 7, 30 or 90 days', async () => {
    expect((await get('/api/admin/analytics/engagement?days=5', 'boss')).status).toBe(400);
    expect((await get('/api/admin/analytics/engagement?cohortId=nope', 'boss')).status).toBe(400);
  });

  it('never includes names or usernames', async () => {
    for (const name of ['overview', 'engagement', 'worlds', 'activities']) {
      const { body } = await get(`/api/admin/analytics/${name}`, 'boss');
      expect(body).not.toMatch(/kid\.|kid a|teach/);
    }
  });
});

describe('overview', () => {
  it('counts a teacher’s class exactly (and the same as an admin filtering that class)', async () => {
    const teacher = (await get<AnalyticsOverview>('/api/admin/analytics/overview', 'teach.a')).data;
    expect(teacher.students).toEqual({ total: 4, active: 3, notStarted: 1 });
    expect(teacher.lessons).toEqual({
      published: publishedLessons,
      completed: 3,
      completionPercent: Math.round((3 / (4 * publishedLessons)) * 100),
    });
    expect(teacher.progress.find((p) => p.bucket === '0')!.students).toBe(1);
    expect(teacher.progress.find((p) => p.bucket === '1-25')!.students).toBe(3);
    expect(teacher.progress.reduce((n, p) => n + p.students, 0)).toBe(4);
    expect(teacher.xp.total).toBeGreaterThan(0);
    expect(teacher.xp.average).toBe(Math.round(teacher.xp.total / 4));

    const admin = (
      await get<AnalyticsOverview>(`/api/admin/analytics/overview?cohortId=${classA}`, 'boss')
    ).data;
    expect({ ...admin, generatedAt: '' }).toEqual({ ...teacher, generatedAt: '' });
  });

  it('admins see every class', async () => {
    const all = (await get<AnalyticsOverview>('/api/admin/analytics/overview', 'boss')).data;
    expect(all.students.total).toBe(5);
    expect(all.lessons.completed).toBe(4);
  });

  it('measures first-try answers: one wrong first answer lowers it below 100%', async () => {
    const { quiz } = (await get<AnalyticsOverview>('/api/admin/analytics/overview', 'teach.a'))
      .data;
    expect(quiz.firstTryCorrectPercent).toBeLessThan(100);
    expect(quiz.firstTryCorrectPercent).toBeGreaterThan(80);
    expect(quiz.averageScore).toBeLessThanOrEqual(100);
    expect(quiz.answers).toBeGreaterThan(0);
  });

  it('lists every published badge with how many students have it', async () => {
    const { badges } = (await get<AnalyticsOverview>('/api/admin/analytics/overview', 'boss')).data;
    const published = await ctx.deps.db
      .select()
      .from(s.badges)
      .where(eq(s.badges.status, 'published'));
    expect(badges).toHaveLength(published.length);
    const awarded = await ctx.deps.db.select().from(s.studentBadges);
    expect(badges.reduce((n, b) => n + b.students, 0)).toBe(awarded.length);
  });

  it('is cached for a few minutes', async () => {
    const first = (await get<AnalyticsOverview>('/api/admin/analytics/overview', 'boss')).data;
    const again = (await get<AnalyticsOverview>('/api/admin/analytics/overview', 'boss')).data;
    expect(again.generatedAt).toBe(first.generatedAt);
  });
});

describe('engagement', () => {
  it('returns one row per day, ending today in Cambodia time', async () => {
    const week = (await get<AnalyticsEngagement>('/api/admin/analytics/engagement', 'teach.a'))
      .data;
    expect(week.days).toHaveLength(7);
    const today = week.days.at(-1)!;
    expect(today.day).toBe(localDate(new Date(), 'Asia/Phnom_Penh'));
    expect(today).toMatchObject({ activeStudents: 3, lessonsCompleted: 3 });
    expect(week.days.slice(0, -1).every((d) => d.activeStudents === 0)).toBe(true);
    expect(week.studentsOnStreak).toBe(0); // a 1-day streak is not a streak yet

    const month = (
      await get<AnalyticsEngagement>('/api/admin/analytics/engagement?days=30', 'teach.a')
    ).data;
    expect(month.days).toHaveLength(30);
  });
});

describe('worlds and lessons', () => {
  it('shows completion per world and lesson, and the lesson highlights', async () => {
    const report = (await get<AnalyticsWorlds>('/api/admin/analytics/worlds', 'teach.a')).data;
    expect(report.worlds.reduce((n, w) => n + w.lessonCount, 0)).toBe(publishedLessons);

    const brain = report.worlds.find((w) => w.lessons.some((l) => l.slug === 'number-patterns'))!;
    expect(brain).toMatchObject({ studentsStarted: 3, studentsFinished: 0 });
    const lesson = brain.lessons.find((l) => l.slug === 'number-patterns')!;
    expect(lesson).toMatchObject({ started: 3, completed: 3, finishRate: 100, averageMinutes: 5 });

    expect(report.mostCompleted.map((l) => l.slug)).toEqual(['number-patterns']);
    expect(report.leastCompleted.every((l) => l.completed === 0)).toBe(true);
    expect(report.hardest.map((l) => l.slug)).toEqual(['number-patterns']);

    // Class B's lesson is not in class A's report.
    const computer = report.worlds
      .flatMap((w) => w.lessons)
      .find((l) => l.slug === 'what-is-a-computer');
    expect(computer).toMatchObject({ started: 0, completed: 0, finishRate: null });
  });

  it('an unpublished lesson disappears from the report', async () => {
    const id = await lessonIdBySlug(ctx, 'what-is-a-computer');
    await ctx.deps.db.update(s.lessons).set({ status: 'draft' }).where(eq(s.lessons.id, id));
    try {
      const report = (await get<AnalyticsWorlds>('/api/admin/analytics/worlds', 'boss')).data;
      const slugs = report.worlds.flatMap((w) => w.lessons.map((l) => l.slug));
      expect(slugs).not.toContain('what-is-a-computer');
    } finally {
      await ctx.deps.db.update(s.lessons).set({ status: 'published' }).where(eq(s.lessons.id, id));
    }
  });
});

describe('difficult activities', () => {
  it('ranks the activity a student got wrong first as the hardest', async () => {
    const { activities, minStudents } = (
      await get<AnalyticsActivities>('/api/admin/analytics/activities', 'teach.a')
    ).data;
    expect(minStudents).toBe(3);
    expect(activities[0]).toMatchObject({ activityId: missedActivityId, students: 3 });
    expect(activities[0]!.firstTryCorrectPercent).toBeLessThan(100);
    expect(activities[0]!.averageTries).toBeGreaterThanOrEqual(1);
    expect(activities[0]!.answers).toBeGreaterThan(activities[0]!.students); // the extra try
    expect(activities.slice(1).every((a) => a.firstTryCorrectPercent === 100)).toBe(true);
  });

  it('leaves out activities too few students answered', async () => {
    const { activities } = (
      await get<AnalyticsActivities>(`/api/admin/analytics/activities?cohortId=${classB}`, 'boss')
    ).data;
    expect(activities).toEqual([]); // only 1 student in class B
  });
});
