import { randomUUID } from 'node:crypto';
import { eq } from 'drizzle-orm';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { RankingView } from '@itstarter/shared';
import * as s from '../../src/db/schema';
import { RANKING_SIZE } from '../../src/modules/gamification/ranking';
import {
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
  status: 'active' | 'disabled' = 'active',
) {
  const id = await createUser(ctx.deps, { username, role: 'STUDENT', status });
  await ctx.deps.db.update(s.students).set({ xpTotal }).where(eq(s.students.userId, id));
  return id;
}

async function ranking(username: string, period?: 'all' | 'week') {
  await flushTestRedis(ctx.deps);
  const cookie = await loginAs(ctx.app, username);
  const res = await ctx.app.inject({
    method: 'GET',
    url: `/api/ranking${period ? `?period=${period}` : ''}`,
    headers: { cookie },
  });
  expect(res.statusCode).toBe(200);
  return res.json().data as RankingView;
}

beforeAll(async () => {
  ctx = await createTestContext();
  await student('rank.gold', BIG + 300);
  await student('rank.silver.a', BIG + 200);
  await student('rank.silver.b', BIG + 200);
  await student('rank.fourth', BIG + 100);
  await student('rank.hidden', BIG + 999, 'disabled');
  await student('rank.zero', 0);
});
afterAll(async () => {
  await ctx?.close();
});

describe('GET /api/ranking', () => {
  it('orders students by XP; equal XP shares a rank; students see their own place', async () => {
    const view = await ranking('rank.fourth');
    expect(view.period).toBe('all');
    expect(view.top.slice(0, 4)).toEqual([
      {
        rank: 1,
        displayName: 'rank gold',
        xp: BIG + 300,
        levelIcon: expect.any(String),
        isYou: false,
      },
      {
        rank: 2,
        displayName: 'rank silver a',
        xp: BIG + 200,
        levelIcon: expect.any(String),
        isYou: false,
      },
      {
        rank: 2,
        displayName: 'rank silver b',
        xp: BIG + 200,
        levelIcon: expect.any(String),
        isYou: false,
      },
      {
        rank: 4,
        displayName: 'rank fourth',
        xp: BIG + 100,
        levelIcon: expect.any(String),
        isYou: true,
      },
    ]);
    expect(view.you).toMatchObject({ rank: 4, xp: BIG + 100, isYou: true });
    expect(view.top.length).toBeLessThanOrEqual(RANKING_SIZE);
    expect(view.ranked).toBeGreaterThanOrEqual(4);
  });

  it('leaves out disabled accounts, and shows no rank yet for a student without XP', async () => {
    const view = await ranking('rank.zero');
    expect(view.top.map((e) => e.displayName)).not.toContain('rank hidden');
    expect(view.top.map((e) => e.displayName)).not.toContain('rank zero');
    expect(view.you).toMatchObject({ rank: null, xp: 0, displayName: 'rank zero' });
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
    const week = await ranking('rank.weekly', 'week');
    expect(week.period).toBe('week');
    expect(week.top[0]).toMatchObject({ rank: 1, displayName: 'rank weekly', xp: BIG * 5 });
    expect(week.you).toMatchObject({ rank: 1, isYou: true });
    // All time uses the stored total, where this student is far behind.
    expect((await ranking('rank.weekly')).you).toMatchObject({ xp: 10 });
  });

  it('staff see the ranking without a place of their own; anonymous visitors are refused', async () => {
    await createUser(ctx.deps, { username: 'rank.teacher', role: 'TEACHER' });
    const view = await ranking('rank.teacher');
    expect(view.you).toBeNull();
    expect(view.top[0]!.isYou).toBe(false);
    expect((await ctx.app.inject({ method: 'GET', url: '/api/ranking' })).statusCode).toBe(401);
    const bad = await ctx.app.inject({
      method: 'GET',
      url: '/api/ranking?period=year',
      headers: { cookie: await loginAs(ctx.app, 'rank.teacher') },
    });
    expect(bad.statusCode).toBe(400);
  });

  // Runs last: it fills the top with 25 more students.
  it('outside the top 20, a student sees the students just above and below them', async () => {
    for (let i = 1; i <= 25; i += 1) {
      await student(`rank.crowd${String(i).padStart(2, '0')}`, BIG * 3 + (26 - i) * 10);
    }
    await student('rank.me', BIG * 3 - 5); // 26th
    const view = await ranking('rank.me');
    expect(view.top).toHaveLength(RANKING_SIZE);
    expect(view.top.some((e) => e.isYou)).toBe(false);
    expect(view.you).toMatchObject({ rank: 26, isYou: true });
    expect(view.around.map((e) => e.rank)).toEqual([24, 25, 26, 27, 28]);
    expect(view.around[2]).toMatchObject({ displayName: 'rank me', isYou: true });
    expect(view.around[1]).toMatchObject({ displayName: 'rank crowd25', xp: BIG * 3 + 10 });
    // Inside the top there is no separate list.
    expect((await ranking('rank.crowd01')).around).toEqual([]);
  });
});
