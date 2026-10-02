import { eq } from 'drizzle-orm';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import type { NotificationView } from '@itstarter/shared';
import * as s from '../../src/db/schema';
import { AI_LESSONS } from '../../src/db/seed/data/lessons/ai';
import { evaluateAwards } from '../../src/modules/gamification/awards';
import { playLesson } from './answers';
import {
  createTestContext,
  createUser,
  CSRF,
  flushTestRedis,
  loginAs,
  seededCohortId,
  type TestContext,
} from './helpers';

let ctx: TestContext;
let cohort: string;
let counter = 0;

async function newStudent() {
  const username = `awardee${(counter += 1)}`;
  const id = await createUser(ctx.deps, { username, role: 'STUDENT', cohortId: cohort });
  return { id, cookie: await loginAs(ctx.app, username) };
}

const get = (url: string, cookie: string) =>
  ctx.app.inject({ method: 'GET', url, headers: { cookie } });
const post = (url: string, cookie: string) =>
  ctx.app.inject({ method: 'POST', url, headers: { ...CSRF, cookie } });

beforeAll(async () => {
  ctx = await createTestContext();
  cohort = await seededCohortId(ctx.deps);
});
beforeEach(async () => {
  await flushTestRedis(ctx.deps);
});
afterAll(async () => {
  await ctx?.close();
});

describe('badges and achievements', () => {
  it('Mouse Master needs 3 completed mouse practice games', async () => {
    const student = await newStudent();
    const codes: string[] = [];
    for (const slug of ['using-the-mouse', 'right-click-and-drag', 'organise-your-files']) {
      const { complete } = await playLesson(ctx, student, slug);
      codes.push(...(await complete()).json().data.newAwards.map((a: { code: string }) => a.code));
    }
    expect(codes).toContain('mouse-master');
    expect(codes.indexOf('mouse-master')).toBeGreaterThan(0); // not before the 3rd game
  });

  it('a 3-day streak unlocks its achievement (with bonus XP, once)', async () => {
    const student = await newStudent();
    await ctx.deps.db
      .update(s.students)
      .set({ currentStreak: 3, longestStreak: 3 })
      .where(eq(s.students.userId, student.id));
    const first = await ctx.deps.db.transaction((tx) => evaluateAwards(tx, student.id));
    expect(first.map((a) => a.code)).toContain('streak-3');
    expect(first.find((a) => a.code === 'streak-3')?.xpBonus).toBe(30);

    const again = await ctx.deps.db.transaction((tx) => evaluateAwards(tx, student.id));
    expect(again).toEqual([]);
    const [row] = await ctx.deps.db
      .select()
      .from(s.students)
      .where(eq(s.students.userId, student.id));
    expect(row!.xpTotal).toBe(30);
  });

  it('bonus XP that crosses an XP milestone unlocks it in the same go', async () => {
    const student = await newStudent();
    await ctx.deps.db
      .update(s.students)
      .set({ xpTotal: 490, currentStreak: 3 })
      .where(eq(s.students.userId, student.id));
    const awards = await ctx.deps.db.transaction((tx) => evaluateAwards(tx, student.id));
    expect(awards.map((a) => a.code)).toEqual(expect.arrayContaining(['streak-3', 'xp-500']));
  });

  it('shows earned badges on the badges endpoint', async () => {
    const student = await newStudent();
    for (const { slug } of AI_LESSONS) {
      await flushTestRedis(ctx.deps);
      await (await playLesson(ctx, student, slug)).complete();
    }
    const badges = (await get('/api/badges', student.cookie)).json().data as {
      code: string;
      earned: boolean;
    }[];
    expect(badges.filter((b) => b.earned).map((b) => b.code)).toEqual(['ai-explorer']);
  });
});

describe('notifications', () => {
  it('lists my notifications, marks them read, and never shows other people’s', async () => {
    const a = await newStudent();
    const b = await newStudent();
    await (await playLesson(ctx, a, 'what-is-a-computer')).complete();

    const mine = (await get('/api/notifications', a.cookie)).json().data as NotificationView[];
    expect(mine).toHaveLength(1);
    expect(mine[0]).toMatchObject({
      type: 'achievement_earned',
      readAt: null,
      payload: { code: 'first-lesson' },
    });
    expect((await get('/api/notifications', b.cookie)).json().data).toEqual([]);

    // B can't mark A's notification (and can't even tell it exists).
    expect((await post(`/api/notifications/${mine[0]!.id}/read`, b.cookie)).statusCode).toBe(404);
    expect((await post(`/api/notifications/${mine[0]!.id}/read`, a.cookie)).statusCode).toBe(200);
    expect((await get('/api/notifications?unread=true', a.cookie)).json().data).toEqual([]);
  });

  it('requires a session', async () => {
    expect((await ctx.app.inject({ method: 'GET', url: '/api/notifications' })).statusCode).toBe(
      401,
    );
  });
});
