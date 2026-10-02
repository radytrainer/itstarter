import { and, eq, inArray } from 'drizzle-orm';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import * as s from '../../src/db/schema';
import {
  createTestContext,
  createUser,
  CSRF,
  flushTestRedis,
  loginAs,
  type TestContext,
} from './helpers';

// Phase 17: the admin content API end to end — a new course built, edited, reordered and
// removed through every endpoint, with validation, 404s, slug conflicts and the audit log.

let ctx: TestContext;
let admin = '';
let teacher = '';

const send = (
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  url: string,
  payload?: object,
  cookie = admin,
) =>
  ctx.app.inject({
    method,
    url: `/api${url}`,
    headers: { ...CSRF, cookie },
    ...(payload ? { payload } : {}),
  });
const ok = async <T = Record<string, unknown>>(
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  url: string,
  payload?: object,
) => {
  const res = await send(method, url, payload);
  expect(res.statusCode, `${method} ${url}: ${res.body}`).toBe(200);
  return res.json().data as T;
};

const mc = (correct: string, wrong: string) => ({
  kind: 'single_choice',
  prompt: { en: 'Pick the right one', km: 'ជ្រើសចម្លើយត្រូវ' },
  options: [
    { label: { en: correct }, isCorrect: true },
    { label: { en: wrong }, isCorrect: false },
  ],
});

beforeAll(async () => {
  ctx = await createTestContext();
  await createUser(ctx.deps, { username: 'content.boss', role: 'ADMIN' });
  await createUser(ctx.deps, { username: 'content.teacher', role: 'TEACHER' });
});

beforeEach(async () => {
  await flushTestRedis(ctx.deps);
  admin = await loginAs(ctx.app, 'content.boss');
  teacher = await loginAs(ctx.app, 'content.teacher');
});

afterAll(async () => {
  await ctx?.close();
});

describe('admin builds a course from scratch', () => {
  it('courses → worlds → lesson → steps → questions → badge, every change audited', async () => {
    // Course
    const course = await ok<{ id: string; status: string }>('POST', '/admin/courses', {
      slug: 'summer-club',
      title: { en: 'Summer Club' },
    });
    expect(course.status).toBe('draft');
    const updated = await ok<{ status: string; publishedAt: string | null }>(
      'PATCH',
      `/admin/courses/${course.id}`,
      { status: 'published' },
    );
    expect(updated).toMatchObject({ status: 'published' });
    expect(updated.publishedAt).not.toBeNull();
    const listed = await ok<{ slug: string; worlds: number }[]>('GET', '/admin/courses');
    expect(listed.find((c) => c.slug === 'summer-club')).toMatchObject({ worlds: 0 });

    // Worlds: create two, rename one, reorder them
    const world = (slug: string) =>
      ok<{ id: string; position: number }>('POST', `/admin/courses/${course.id}/worlds`, {
        slug,
        title: { en: slug },
        icon: '🌞',
        color: 'amber',
      });
    const first = await world('sun-world');
    const second = await world('moon-world');
    expect([first.position, second.position]).toEqual([1, 2]);
    await ok('PATCH', `/admin/worlds/${second.id}`, { title: { en: 'Moon World' } });
    await ok('POST', `/admin/courses/${course.id}/worlds/reorder`, { ids: [second.id, first.id] });
    const worlds = await ok<{ id: string; title: { en: string } }[]>(
      'GET',
      `/admin/courses/${course.id}/worlds`,
    );
    expect(worlds.map((w) => w.id)).toEqual([second.id, first.id]);
    expect(worlds[0]!.title.en).toBe('Moon World');

    // Lesson with two steps, reordered, then one removed
    const lesson = await ok<{ id: string }>('POST', `/admin/worlds/${first.id}/lessons`, {
      slug: 'hot-days',
      title: { en: 'Hot days' },
    });
    const step = (type: string, isScored: boolean) =>
      ok<{ id: string }>('POST', `/admin/lessons/${lesson.id}/activities`, {
        step: isScored ? 'play' : 'learn',
        type,
        config: isScored ? {} : { cards: [] },
        isScored,
        passScore: isScored ? 50 : 0,
      });
    const learn = await step('learn_card', false);
    const quiz = await step('multiple_choice', true);
    // A new lesson starts with its welcome/learn/see/reward steps; reorder needs every step.
    let full = await ok<{ activities: { id: string }[] }>('GET', `/admin/lessons/${lesson.id}`);
    const ids = full.activities.map((a) => a.id);
    expect(ids).toEqual(expect.arrayContaining([learn.id, quiz.id]));
    const reversed = [...ids].reverse();
    await ok('POST', `/admin/lessons/${lesson.id}/activities/reorder`, { ids: reversed });
    full = await ok<{ activities: { id: string }[] }>('GET', `/admin/lessons/${lesson.id}`);
    expect(full.activities.map((a) => a.id)).toEqual(reversed);
    await ok('DELETE', `/admin/activities/${learn.id}`);
    full = await ok<{ activities: { id: string }[] }>('GET', `/admin/lessons/${lesson.id}`);
    expect(full.activities.map((a) => a.id)).toEqual(reversed.filter((id) => id !== learn.id));

    // Question: create, replace its options, remove
    const question = await ok<{ id: string }>(
      'POST',
      `/admin/activities/${quiz.id}/questions`,
      mc('Sun', 'Snow'),
    );
    await ok('PUT', `/admin/questions/${question.id}`, mc('Sunscreen', 'Scarf'));
    const options = await ctx.deps.db
      .select()
      .from(s.questionOptions)
      .where(eq(s.questionOptions.questionId, question.id));
    expect(options.map((o) => o.label.en).sort()).toEqual(['Scarf', 'Sunscreen']);
    await ok('DELETE', `/admin/questions/${question.id}`);
    expect((await send('DELETE', `/admin/questions/${question.id}`)).statusCode).toBe(404);

    // Badge for the new world, then edited
    const badge = await ok<{ id: string; status: string }>('POST', '/admin/badges', {
      code: 'sun-star',
      name: { en: 'Sun Star' },
      description: { en: 'Finished Sun World' },
      icon: '🌞',
      criteria: { type: 'world_completed', worldSlug: 'sun-world' },
    });
    expect(badge.status).toBe('draft');
    await ok('PATCH', `/admin/badges/${badge.id}`, { status: 'published' });
    expect(
      (await ok<{ code: string; status: string }[]>('GET', '/admin/badges')).find(
        (b) => b.code === 'sun-star',
      ),
    ).toMatchObject({ status: 'published' });

    // Remove a world and the course (soft delete: gone from the lists, history kept)
    await ok('DELETE', `/admin/worlds/${second.id}`);
    expect((await send('GET', `/admin/worlds/${second.id}/lessons`)).statusCode).toBe(404);
    await ok('DELETE', `/admin/courses/${course.id}`);
    expect(
      (await ok<{ slug: string }[]>('GET', '/admin/courses')).map((c) => c.slug),
    ).not.toContain('summer-club');
    const [kept] = await ctx.deps.db.select().from(s.courses).where(eq(s.courses.id, course.id));
    expect(kept).toMatchObject({ status: 'archived' });
    expect(kept!.deletedAt).not.toBeNull();

    // Every change is in the audit log, with who did it
    const actions = (
      await ctx.deps.db
        .select({ action: s.auditLogs.action })
        .from(s.auditLogs)
        .where(
          and(
            inArray(s.auditLogs.entityId, [
              course.id,
              first.id,
              second.id,
              question.id,
              badge.id,
              quiz.id,
              learn.id,
              lesson.id,
            ]),
          ),
        )
    ).map((r) => r.action);
    expect(actions).toEqual(
      expect.arrayContaining([
        'course.created',
        'course.updated',
        'course.deleted',
        'world.created',
        'world.updated',
        'world.reordered',
        'world.deleted',
        'activity.reordered',
        'activity.deleted',
        'question.created',
        'question.updated',
        'question.deleted',
        'badge.created',
        'badge.updated',
      ]),
    );
  });
});

describe('mistakes are refused clearly', () => {
  it('a used slug is a 409; a broken question lists its problems; bad reorders are 400', async () => {
    const course = await ok<{ id: string }>('POST', '/admin/courses', {
      slug: 'rainy-club',
      title: { en: 'Rainy Club' },
    });
    const dupe = await send('POST', '/admin/courses', {
      slug: 'rainy-club',
      title: { en: 'Again' },
    });
    expect(dupe.statusCode).toBe(409);
    expect(dupe.json().error.code).toBe('CONFLICT');

    const world = await ok<{ id: string }>('POST', `/admin/courses/${course.id}/worlds`, {
      slug: 'rain-world',
      title: { en: 'Rain' },
      icon: '🌧️',
      color: 'sky',
    });
    const lesson = await ok<{ id: string }>('POST', `/admin/worlds/${world.id}/lessons`, {
      slug: 'puddles',
      title: { en: 'Puddles' },
    });
    const quiz = await ok<{ id: string }>('POST', `/admin/lessons/${lesson.id}/activities`, {
      step: 'play',
      type: 'game',
      isScored: true,
    });
    const robotWithoutRoute = await send('POST', `/admin/activities/${quiz.id}/questions`, {
      kind: 'robot',
      prompt: { en: 'Go' },
      publicConfig: {
        robot: {
          rows: 2,
          cols: 2,
          start: [0, 0],
          goal: [1, 1],
          walls: [
            [0, 1],
            [1, 0],
          ],
        },
      },
    });
    expect(robotWithoutRoute.statusCode).toBe(400);
    expect(robotWithoutRoute.json().error.details.problems.join()).toMatch(/cannot reach/);

    const reorder = await send('POST', `/admin/courses/${course.id}/worlds/reorder`, {
      ids: [world.id, world.id],
    });
    expect(reorder.statusCode).toBe(400);

    const missing = '0190a0a0-0000-7000-8000-000000000000';
    expect(
      (await send('PATCH', `/admin/courses/${missing}`, { status: 'published' })).statusCode,
    ).toBe(404);
    expect(
      (
        await send('POST', `/admin/courses/${missing}/worlds`, {
          slug: 'x-world',
          title: { en: 'x' },
          icon: '❓',
          color: 'sky',
        })
      ).statusCode,
    ).toBe(404);
    expect((await send('PUT', `/admin/questions/${missing}`, mc('a', 'b'))).statusCode).toBe(404);
  });

  it('only admins can change content or create classes', async () => {
    expect(
      (await send('POST', '/admin/courses', { slug: 'nope', title: { en: 'No' } }, teacher))
        .statusCode,
    ).toBe(403);
    expect(
      (await send('POST', '/admin/cohorts', { name: 'Class Z', year: 2028 }, teacher)).statusCode,
    ).toBe(403);
    const cohort = await ok<{ id: string; name: string }>('POST', '/admin/cohorts', {
      name: 'Class Z',
      year: 2028,
    });
    expect(cohort.name).toBe('Class Z');
    const [row] = await ctx.deps.db.select().from(s.cohorts).where(eq(s.cohorts.id, cohort.id));
    expect(row!.courseId).not.toBeNull(); // linked to the default course
  });
});
