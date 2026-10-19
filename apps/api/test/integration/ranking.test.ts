import { randomUUID } from 'node:crypto';
import { eq } from 'drizzle-orm';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { RankingView } from '@itstarter/shared';
import * as s from '../../src/db/schema';
import { RANKING_PAGE_SIZE } from '../../src/modules/gamification/ranking';
import {
  createCohort,
  createTestContext,
  createUser,
  flushTestRedis,
  loginAs,
  type TestContext,
} from './helpers';

let ctx: TestContext;

// Other test files leave students in the same database, so these scores are far above theirs.
const BIG = 1_000_000;

async function student(
  username: string,
  xpTotal: number,
  opts: { status?: 'active' | 'disabled'; cohortId?: string } = {},
) {
  const id = await createUser(ctx.deps, { username, role: 'STUDENT', ...opts });
  await ctx.deps.db.update(s.students).set({ xpTotal }).where(eq(s.students.userId, id));
  return id;
}

async function get(username: string, url: string) {
  await flushTestRedis(ctx.deps);
  const cookie = await loginAs(ctx.app, username);
  return ctx.app.inject({ method: 'GET', url, headers: { cookie } });
}

async function ranking(username: string, query = '') {
  const res = await get(username, `/api/ranking${query}`);
  expect(res.statusCode).toBe(200);
  return res.json().data as RankingView;
}

beforeAll(async () => {
  ctx = await createTestContext();
  await student('rank.gold', BIG * 2 + 300);
  await student('rank.silver.a', BIG * 2 + 200);
  await student('rank.silver.b', BIG * 2 + 200);
  await student('rank.fourth', BIG * 2 + 100);
  await student('rank.hidden', BIG * 2 + 999, { status: 'disabled' });
  await student('rank.zero', 0);
  await createUser(ctx.deps, { username: 'rank.admin', role: 'ADMIN' });
});
afterAll(async () => {
  await ctx?.close();
});

describe('GET /api/ranking', () => {
  it('orders students by XP; equal XP shares a rank; students see their own place', async () => {
    const view = await ranking('rank.fourth');
    expect(view).toMatchObject({ period: 'all', page: 1, pageSize: RANKING_PAGE_SIZE });
    const row = (rank: number, name: string, xp: number, isYou = false) => ({
      rank,
      displayName: name,
      xp,
      levelIcon: expect.any(String),
      isYou,
    });
    expect(view.entries.slice(0, 4)).toEqual([
      row(1, 'rank gold', BIG * 2 + 300),
      row(2, 'rank silver a', BIG * 2 + 200),
      row(2, 'rank silver b', BIG * 2 + 200),
      row(4, 'rank fourth', BIG * 2 + 100, true),
    ]);
    expect(view.you).toMatchObject({ rank: 4, xp: BIG * 2 + 100, isYou: true });
    expect(view.yourPage).toBe(1);
    // Students near you: two above, you, and the ones below.
    expect(view.around.slice(0, 3).map((e) => e.displayName)).toEqual([
      'rank silver a',
      'rank silver b',
      'rank fourth',
    ]);
  });

  it('leaves out disabled accounts, and shows no rank yet for a student without XP', async () => {
    const view = await ranking('rank.zero');
    const names = view.entries.map((e) => e.displayName);
    expect(names).not.toContain('rank hidden');
    expect(names).not.toContain('rank zero');
    expect(view.you).toMatchObject({ rank: null, xp: 0, displayName: 'rank zero' });
    expect(view.yourPage).toBeNull();
    expect(view.around).toEqual([]);
  });

  it('“this week” counts only XP earned in the last 7 days', async () => {
    const id = await student('rank.weekly', 10);
    const xp = (amount: number, createdAt: Date) => ({
      studentId: id,
      amount,
      sourceType: 'admin' as const,
      sourceId: randomUUID(),
      createdAt,
    });
    await ctx.deps.db.insert(s.xpTransactions).values([
      xp(BIG * 5, new Date()),
      xp(BIG * 9, new Date(Date.now() - 8 * 24 * 3600 * 1000)), // too old for this week
    ]);
    const week = await ranking('rank.weekly', '?period=week');
    expect(week.period).toBe('week');
    expect(week.entries[0]).toMatchObject({ rank: 1, displayName: 'rank weekly', xp: BIG * 5 });
    expect(week.you).toMatchObject({ rank: 1, isYou: true });
    // All time uses the stored total, where this student is far behind.
    expect((await ranking('rank.weekly')).you).toMatchObject({ xp: 10 });
  });

  it('staff see the ranking without a place of their own; bad input is refused', async () => {
    const view = await ranking('rank.admin');
    expect(view.you).toBeNull();
    expect(view.yourPage).toBeNull();
    expect(view.entries[0]!.isYou).toBe(false);
    expect((await ctx.app.inject({ method: 'GET', url: '/api/ranking' })).statusCode).toBe(401);
    expect((await get('rank.admin', '/api/ranking?period=year')).statusCode).toBe(400);
    expect((await get('rank.admin', '/api/ranking?page=0')).statusCode).toBe(400);
  });

  // Runs after the tests above: it puts 60 more students at the top.
  it('lists everyone page by page; a low student finds their page and the students near them', async () => {
    for (let i = 1; i <= 60; i += 1) {
      await student(`rank.crowd${String(i).padStart(2, '0')}`, BIG * 3 + (61 - i) * 10);
    }
    await student('rank.me', BIG * 3 - 5); // 61st
    const first = await ranking('rank.me');
    expect(first.entries).toHaveLength(RANKING_PAGE_SIZE);
    expect(first.entries.some((e) => e.isYou)).toBe(false);
    expect(first.you).toMatchObject({ rank: 61, isYou: true });
    expect(first.yourPage).toBe(2);
    expect(first.pages).toBeGreaterThanOrEqual(2);
    expect(first.around.map((e) => e.rank)).toEqual([59, 60, 61, 62, 63]);
    expect(first.around[2]).toMatchObject({ displayName: 'rank me', isYou: true });

    const second = await ranking('rank.me', '?page=2');
    expect(second.page).toBe(2);
    expect(second.entries[0]!.rank).toBe(51);
    expect(second.entries.find((e) => e.isYou)).toMatchObject({ rank: 61 });
    // A page past the end shows the last page.
    expect((await ranking('rank.me', '?page=999')).page).toBe(second.pages);
  });
});

describe('GET /api/teacher/ranking/export', () => {
  it('admins download every student as CSV (Excel-ready) and as a PDF report', async () => {
    const csv = await get('rank.admin', '/api/teacher/ranking/export?format=csv');
    expect(csv.statusCode).toBe(200);
    expect(csv.headers['content-type']).toContain('text/csv');
    expect(csv.headers['content-disposition']).toMatch(
      /student-ranking-all-\d{4}-\d{2}-\d{2}\.csv/,
    );
    const lines = csv.body
      .replace(/^\uFEFF/, '')
      .trim()
      .split('\r\n');
    expect(lines[0]).toBe('Rank,Name,Username,Class,XP,Total XP,Level,Lessons,Last active');
    expect(lines[1]).toMatch(/^1,rank crowd01,rank\.crowd01,,/);
    // Everyone is in the file, also students without XP (they share the last rank).
    expect(csv.body).toContain('rank.zero');
    expect(csv.body).not.toContain('rank.hidden');

    // Exactly what the admin form sends for “All classes”.
    const pdf = await get(
      'rank.admin',
      '/api/teacher/ranking/export?cohortId=&period=week&lang=km&format=pdf',
    );
    expect(pdf.statusCode).toBe(200);
    expect(pdf.headers['content-type']).toBe('application/pdf');
    expect(pdf.rawPayload.subarray(0, 5).toString()).toBe('%PDF-');
    expect(pdf.rawPayload.length).toBeGreaterThan(5_000);
  });

  it('teachers export only their own classes; students cannot export', async () => {
    const mine = await createCohort(ctx.deps, 'Rank class A');
    const other = await createCohort(ctx.deps, 'Rank class B');
    await createUser(ctx.deps, { username: 'rank.teacher', role: 'TEACHER', cohortId: mine });
    await student('rank.pupil.a', 50, { cohortId: mine });
    await student('rank.pupil.b', 90, { cohortId: mine });
    await student('rank.pupil.other', 70, { cohortId: other });

    const csv = await get('rank.teacher', '/api/teacher/ranking/export?format=csv&period=all');
    const lines = csv.body
      .replace(/^\uFEFF/, '')
      .trim()
      .split('\r\n');
    expect(lines.slice(1).map((l) => l.split(',').slice(0, 4).join(','))).toEqual([
      '1,rank pupil b,rank.pupil.b,Rank class A',
      '2,rank pupil a,rank.pupil.a,Rank class A',
    ]);
    const one = await get(
      'rank.teacher',
      `/api/teacher/ranking/export?format=pdf&cohortId=${mine}`,
    );
    expect(one.statusCode).toBe(200);
    expect(
      (await get('rank.teacher', `/api/teacher/ranking/export?cohortId=${other}`)).statusCode,
    ).toBe(404);
    expect((await get('rank.me', '/api/teacher/ranking/export')).statusCode).toBe(403);
  });
});
