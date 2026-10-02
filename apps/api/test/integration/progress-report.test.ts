import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import type { PageMeta, ProgressReport } from '@itstarter/shared';
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

// Class A: a1 finished 2 Math lessons; a2 finished 1 Computer lesson and started another;
// a3 never started. Class B: b1 finished 1 lesson. Exact numbers on fresh data.

let ctx: TestContext;
let classA: string;
let classB: string;
const ids: Record<string, string> = {};
const cookies: Record<string, string> = {};

async function report(query: string, who = 'teach.a') {
  const res = await ctx.app.inject({
    method: 'GET',
    url: `/api/teacher/progress${query}`,
    headers: { cookie: cookies[who]! },
  });
  return {
    status: res.statusCode,
    data: res.json().data as ProgressReport,
    meta: res.json().meta as PageMeta,
  };
}
const names = (r: ProgressReport) => r.rows.map((row) => row.username);

async function finish(username: string, slug: string) {
  await flushTestRedis(ctx.deps); // the robot answers faster than the per-minute limit
  const student = { id: ids[username]!, cookie: await loginAs(ctx.app, username) };
  expect((await (await playLesson(ctx, student, slug)).complete()).statusCode).toBe(200);
}

beforeAll(async () => {
  ctx = await createTestContext();
  classA = await createCohort(ctx.deps, 'Progress A');
  classB = await createCohort(ctx.deps, 'Progress B');
  await createUser(ctx.deps, { username: 'boss', role: 'ADMIN' });
  await createUser(ctx.deps, { username: 'teach.a', role: 'TEACHER', cohortId: classA });
  for (const name of ['kid.a1', 'kid.a2', 'kid.a3'])
    ids[name] = await createUser(ctx.deps, { username: name, role: 'STUDENT', cohortId: classA });
  ids['kid.b1'] = await createUser(ctx.deps, {
    username: 'kid.b1',
    role: 'STUDENT',
    cohortId: classB,
  });

  await finish('kid.a1', 'adding-and-subtracting');
  await finish('kid.a1', 'number-patterns');
  await finish('kid.a2', 'computer-parts');
  const a2 = await loginAs(ctx.app, 'kid.a2');
  await ctx.app.inject({
    method: 'POST',
    url: `/api/lessons/${await lessonIdBySlug(ctx, 'what-is-a-computer')}/start`,
    headers: { ...CSRF, cookie: a2 },
  });
  await finish('kid.b1', 'what-is-ai');
});

beforeEach(async () => {
  await flushTestRedis(ctx.deps);
  for (const who of ['boss', 'teach.a', 'kid.a1']) cookies[who] = await loginAs(ctx.app, who);
});

afterAll(async () => {
  await ctx?.close();
});

describe('who can see it', () => {
  it('teachers see only their class; admins see everyone; students see nothing', async () => {
    expect(names((await report('')).data)).toEqual(['kid.a1', 'kid.a2', 'kid.a3']);
    expect(names((await report('', 'boss')).data)).toEqual([
      'kid.a1',
      'kid.a2',
      'kid.a3',
      'kid.b1',
    ]);
    expect((await report(`?cohortId=${classB}`)).data.rows).toEqual([]);
    expect((await report('', 'kid.a1')).status).toBe(403);
  });
});

describe('the numbers', () => {
  it('per student: overall, per world, score, the lesson in progress', async () => {
    const { data } = await report('');
    const math = data.worlds.find((w) => w.slug === 'math-playground')!;
    const computer = data.worlds.find((w) => w.slug === 'computer-explorer')!;
    const total = data.worlds.reduce((n, w) => n + w.lessonsTotal, 0);
    expect(data.worlds.map((w) => w.lessonsTotal)).toEqual([15, 15, 15, 15, 15, 15, 15]);

    const [a1, a2, a3] = data.rows;
    expect(a1).toMatchObject({
      lessonsCompleted: 2,
      lessonsTotal: total,
      percent: Math.round((2 / total) * 100),
      averageScore: 100,
      worlds: { [math.id]: 2 },
      cohortName: 'Progress A',
      currentStreak: 1,
    });
    expect(a1!.lastActiveDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(a2).toMatchObject({
      lessonsCompleted: 1,
      worlds: { [computer.id]: 1 },
      currentLesson: { title: { en: 'What is a Computer?' } },
    });
    expect(a3).toMatchObject({
      lessonsCompleted: 0,
      percent: 0,
      averageScore: null,
      lastActiveDate: null,
      currentLesson: null,
      worlds: {},
    });
  });

  it('summary covers everyone matching the filters', async () => {
    const { data } = await report('?pageSize=1');
    expect(data.rows).toHaveLength(1);
    const total = data.worlds.reduce((n, w) => n + w.lessonsTotal, 0);
    expect(data.summary).toEqual({
      students: 3,
      averagePercent: Math.round((1 * 100) / total), // (2 + 1 + 0) / 3 lessons each on average
      activeThisWeek: 2,
      notStarted: 1,
      inactive: 1,
    });
  });
});

describe('sorting, filtering, pages', () => {
  it('sorts by progress, score, XP and last activity (empty values last)', async () => {
    expect(names((await report('?sort=progress')).data)).toEqual(['kid.a1', 'kid.a2', 'kid.a3']);
    expect(names((await report('?sort=progress&dir=asc')).data)).toEqual([
      'kid.a3',
      'kid.a2',
      'kid.a1',
    ]);
    expect(names((await report('?sort=score')).data).at(-1)).toBe('kid.a3');
    expect(names((await report('?sort=lastActive&dir=asc')).data).at(-1)).toBe('kid.a3');
    expect(names((await report('?sort=xp')).data)[0]).toBe('kid.a1');
  });

  it('searches, filters by status, and pages', async () => {
    expect(names((await report('?q=a2')).data)).toEqual(['kid.a2']);
    expect((await report('?status=disabled')).data.rows).toEqual([]);
    const page2 = await report('?pageSize=2&page=2');
    expect(names(page2.data)).toEqual(['kid.a3']);
    expect(page2.meta).toEqual({ page: 2, pageSize: 2, total: 3 });
  });

  it('rejects unknown sort fields', async () => {
    expect((await report('?sort=password')).status).toBe(400);
  });
});

describe('CSV export', () => {
  it('exports every matching student, safe for Excel', async () => {
    // A name that would run as a formula in Excel if exported raw.
    await createUser(ctx.deps, { username: 'kid.evil', role: 'STUDENT', cohortId: classA });
    await ctx.deps.pool.query(`update users set display_name = $1 where username = 'kid.evil'`, [
      '=HYPERLINK("http://evil","Click")',
    ]);
    const res = await ctx.app.inject({
      method: 'GET',
      url: '/api/teacher/progress/export?lang=km',
      headers: { cookie: cookies['teach.a']! },
    });
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('text/csv');
    expect(res.headers['content-disposition']).toMatch(/attachment; filename="learning-progress-/);
    expect(res.body.startsWith('﻿')).toBe(true);

    const lines = res.body.slice(1).trim().split('\r\n');
    expect(lines).toHaveLength(1 + 4); // header + class A only (incl. kid.evil)
    expect(lines[0]).toContain('Lessons completed');
    expect(lines[0]).toContain('សួនលេងគណិតវិទ្យា'); // world names in Khmer
    expect(res.body).not.toContain('kid.b1');
    expect(res.body).toContain(`"'=HYPERLINK(""http://evil"",""Click"")"`);
    const a1 = lines.find((l) => l.includes('kid.a1'))!;
    expect(a1.split(',')).toEqual(expect.arrayContaining(['2', '100']));
  });
});
