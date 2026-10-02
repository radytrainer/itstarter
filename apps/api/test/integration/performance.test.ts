import { and, eq } from 'drizzle-orm';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { commitmentScore, type ProgressReport, type StudentPerformance } from '@itstarter/shared';
import * as s from '../../src/db/schema';
import { ALL_LESSONS } from '../../src/db/seed/data/lessons';
import { lessonIdBySlug, playLesson } from './answers';
import {
  createCohort,
  createTestContext,
  createUser,
  CSRF,
  flushTestRedis,
  loginAs,
  type TestContext,
} from './helpers';

// Performance & commitment: active time while a lesson is open, the per-student report (for the
// student and for staff), and the commitment column of the progress list.

let ctx: TestContext;
const ids: Record<string, string> = {};
const cookies: Record<string, string> = {};

const get = (url: string, who: string) =>
  ctx.app.inject({ method: 'GET', url, headers: { cookie: cookies[who]! } });
const post = (url: string, who: string, payload: object) =>
  ctx.app.inject({ method: 'POST', url, headers: { ...CSRF, cookie: cookies[who]! }, payload });

const scoredQuestions = (slug: string) =>
  ALL_LESSONS.find((l) => l.slug === slug)!
    .activities.filter((a) => a.isScored)
    .flatMap((a) => a.questions ?? []);

beforeAll(async () => {
  ctx = await createTestContext();
  const classA = await createCohort(ctx.deps, 'Perf A');
  const classB = await createCohort(ctx.deps, 'Perf B');
  await createUser(ctx.deps, { username: 'perf.teach', role: 'TEACHER', cohortId: classA });
  await createUser(ctx.deps, { username: 'perf.other', role: 'TEACHER', cohortId: classB });
  ids.busy = await createUser(ctx.deps, {
    username: 'perf.busy',
    role: 'STUDENT',
    cohortId: classA,
  });
  ids.new = await createUser(ctx.deps, { username: 'perf.new', role: 'STUDENT', cohortId: classA });
  for (const who of ['perf.teach', 'perf.other', 'perf.busy', 'perf.new'])
    cookies[who] = await loginAs(ctx.app, who);

  // perf.busy finishes one Math lesson (with its game round) and spends time on another.
  const student = { id: ids.busy, cookie: cookies['perf.busy']! };
  expect((await (await playLesson(ctx, student, 'times-tables')).complete()).statusCode).toBe(200);
});

beforeEach(async () => {
  await flushTestRedis(ctx.deps);
  for (const who of Object.keys(cookies)) cookies[who] = await loginAs(ctx.app, who);
});

afterAll(async () => {
  await ctx?.close();
});

describe('active time while a lesson is open', () => {
  it('adds to the lesson and to today, even when the lesson is not finished', async () => {
    const lessonId = await lessonIdBySlug(ctx, 'place-value');
    expect(
      (await post(`/api/lessons/${lessonId}/time`, 'perf.busy', { seconds: 90 })).statusCode,
    ).toBe(200);
    expect(
      (await post(`/api/lessons/${lessonId}/time`, 'perf.busy', { seconds: 30 })).statusCode,
    ).toBe(200);
    const [row] = await ctx.deps.db
      .select()
      .from(s.studentLessonProgress)
      .where(
        and(
          eq(s.studentLessonProgress.studentId, ids.busy!),
          eq(s.studentLessonProgress.lessonId, lessonId),
        ),
      );
    expect(row).toMatchObject({ timeSpentSeconds: 120, status: 'in_progress' });
  });

  it('rejects silly amounts, unknown lessons and staff', async () => {
    const lessonId = await lessonIdBySlug(ctx, 'place-value');
    expect(
      (await post(`/api/lessons/${lessonId}/time`, 'perf.busy', { seconds: 0 })).statusCode,
    ).toBe(400);
    expect(
      (await post(`/api/lessons/${lessonId}/time`, 'perf.busy', { seconds: 601 })).statusCode,
    ).toBe(400);
    expect(
      (
        await post('/api/lessons/0190a0a0-0000-7000-8000-000000000000/time', 'perf.busy', {
          seconds: 5,
        })
      ).statusCode,
    ).toBe(404);
    expect(
      (await post(`/api/lessons/${lessonId}/time`, 'perf.teach', { seconds: 5 })).statusCode,
    ).toBe(403);
  });
});

describe('a student’s performance report', () => {
  it('shows commitment, accuracy per world and skill, games and the weekly trend', async () => {
    const res = await get('/api/progress/performance', 'perf.busy');
    expect(res.statusCode).toBe(200);
    const p = res.json().data as StudentPerformance;

    // 300 s at completion + 120 s from the time reports = 7 minutes, all today.
    expect(p.commitment).toMatchObject({ activeDays: 1, lessons: 1, minutes: 7 });
    expect(p.commitment).toEqual(commitmentScore({ activeDays: 1, minutes: 7, lessons: 1 }));
    expect(p.commitment.level).toBe('starting');

    const questions = scoredQuestions('times-tables');
    expect(p.totals).toMatchObject({
      lessonsCompleted: 1,
      answered: questions.length,
      accuracy: 100,
      gamesWon: questions.filter((q) =>
        ['catch', 'memory', 'robot', 'word_builder'].includes(q.kind),
      ).length,
    });
    expect(p.days).toHaveLength(28);
    expect(p.days.at(-1)!.minutes).toBe(7);
    expect(p.weeks).toHaveLength(8);
    expect(p.weeks.at(-1)).toMatchObject({
      activeDays: 1,
      lessons: 1,
      answered: questions.length,
      accuracy: 100,
    });

    const math = p.worlds.find((w) => w.title.en === 'Math Playground')!;
    expect(math).toMatchObject({
      lessonsCompleted: 1,
      lessonsTotal: 15,
      answered: questions.length,
      accuracy: 100,
    });
    expect(p.worlds.find((w) => w.title.en === 'English for Beginners')).toMatchObject({
      lessonsCompleted: 0,
      answered: 0,
      accuracy: null,
    });
    expect(p.skills.map((sk) => sk.skill)).toEqual(expect.arrayContaining(['numbers', 'games']));
  });

  it('a new student gets an empty, friendly report', async () => {
    const p = (await get('/api/progress/performance', 'perf.new')).json()
      .data as StudentPerformance;
    expect(p.commitment).toMatchObject({ score: 0, level: 'not_started' });
    expect(p.totals).toMatchObject({ answered: 0, accuracy: null, minutes: 0 });
    expect(p.skills).toEqual([]);
  });

  it('staff see students in their classes only', async () => {
    const url = `/api/teacher/students/${ids.busy}/performance`;
    expect((await get(url, 'perf.teach')).statusCode).toBe(200);
    expect((await get(url, 'perf.other')).statusCode).toBe(404);
    expect((await get('/api/progress/performance', 'perf.teach')).statusCode).toBe(403);
  });
});

describe('commitment in the progress list', () => {
  it('each row has the commitment score, and the list sorts by it', async () => {
    const res = await get('/api/teacher/progress?sort=commitment', 'perf.teach');
    const report = res.json().data as ProgressReport;
    expect(report.rows.map((r) => r.username)).toEqual(['perf.busy', 'perf.new']);
    const busy = report.rows[0]!;
    expect(busy.commitment).toEqual(commitmentScore({ activeDays: 1, minutes: 7, lessons: 1 }));
    expect(report.rows[1]!.commitment.score).toBe(0);

    const csv = (await get('/api/teacher/progress/export', 'perf.teach')).body;
    expect(csv).toContain('Commitment %');
  });
});
