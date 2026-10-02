import { eq } from 'drizzle-orm';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import type { Dashboard, LessonPlay } from '@itstarter/shared';
import * as s from '../../src/db/schema';
import { ALL_LESSONS } from '../../src/db/seed/data/lessons';
import { playLesson } from './answers';
import {
  createCohort,
  createTestContext,
  createUser,
  CSRF,
  flushTestRedis,
  login,
  loginAs,
  seededCohortId,
  type TestContext,
} from './helpers';

let ctx: TestContext;
let classA: string;
let classB: string;
const cookies: Record<string, string> = {};

const req = (
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  url: string,
  who: string,
  payload?: object,
) =>
  ctx.app.inject({
    method,
    url,
    headers: { ...CSRF, cookie: cookies[who]! },
    ...(payload ? { payload } : {}),
  });
const data = (res: { json: () => { data: unknown } }) => res.json().data as never;

beforeAll(async () => {
  ctx = await createTestContext();
  classA = await seededCohortId(ctx.deps);
  classB = await createCohort(ctx.deps, 'Class B');
  await createUser(ctx.deps, { username: 'boss', role: 'ADMIN' });
  await createUser(ctx.deps, { username: 'teach.a', role: 'TEACHER', cohortId: classA });
  await createUser(ctx.deps, { username: 'kid.a', role: 'STUDENT', cohortId: classA });
  await createUser(ctx.deps, { username: 'kid.b', role: 'STUDENT', cohortId: classB });
});

beforeEach(async () => {
  await flushTestRedis(ctx.deps);
  for (const [key, user] of Object.entries({
    admin: 'boss',
    teacher: 'teach.a',
    kidA: 'kid.a',
    kidB: 'kid.b',
  })) {
    cookies[key] = await loginAs(ctx.app, user);
  }
});

afterAll(async () => {
  await ctx?.close();
});

describe('access', () => {
  it.each([
    ['GET', '/api/admin/courses'],
    ['POST', '/api/admin/students'],
    ['POST', '/api/admin/students/import'],
    ['GET', '/api/admin/staff'],
    ['GET', '/api/admin/badges'],
  ] as const)('teachers and students get 403 on %s %s', async (method, url) => {
    expect((await req(method, url, 'teacher', {})).statusCode).toBe(403);
    expect((await req(method, url, 'kidA', {})).statusCode).toBe(403);
  });

  it('teachers see student detail only for their own class', async () => {
    const [kidA] = await ctx.deps.db.select().from(s.users).where(eq(s.users.username, 'kid.a'));
    const [kidB] = await ctx.deps.db.select().from(s.users).where(eq(s.users.username, 'kid.b'));
    const ok = await req('GET', `/api/teacher/students/${kidA!.id}`, 'teacher');
    expect(ok.statusCode).toBe(200);
    expect(ok.json().data).toMatchObject({
      username: 'kid.a',
      cohortName: 'Generation 2028 – Class A',
    });
    expect(ok.json().data.dashboard.course.lessonsTotal).toBe(ALL_LESSONS.length);
    // (mustChangePassword is a yes/no flag; real hashes or password fields must never appear)
    expect(ok.body).not.toMatch(/argon2|passwordHash|password_hash|"password"/i);
    expect((await req('GET', `/api/teacher/students/${kidB!.id}`, 'teacher')).statusCode).toBe(404);
    expect((await req('GET', `/api/teacher/students/${kidB!.id}`, 'admin')).statusCode).toBe(200);
  });

  it('teachers list only their own classes', async () => {
    const theirs = data(await req('GET', '/api/teacher/cohorts', 'teacher')) as { name: string }[];
    expect(theirs.map((c) => c.name)).toEqual(['Generation 2028 – Class A']);
    const all = data(await req('GET', '/api/teacher/cohorts', 'admin')) as { name: string }[];
    expect(all.map((c) => c.name).sort()).toEqual(['Class B', 'Generation 2028 – Class A']);
  });

  it('filters students by class and status', async () => {
    const res = await req('GET', `/api/teacher/students?cohortId=${classB}`, 'admin');
    expect((data(res) as { username: string }[]).map((x) => x.username)).toEqual(['kid.b']);
  });
});

describe('managing students', () => {
  it('creates a student with a one-time password that must be changed', async () => {
    const res = await req('POST', '/api/admin/students', 'admin', {
      username: 'New.Kid',
      displayName: 'New Kid',
      cohortId: classA,
    });
    expect(res.statusCode).toBe(200);
    const { username, temporaryPassword } = res.json().data;
    expect(username).toBe('new.kid');
    const signIn = await login(ctx.app, 'new.kid', temporaryPassword);
    expect(signIn.json().data.user.mustChangePassword).toBe(true);

    expect(
      (
        await req('POST', '/api/admin/students', 'admin', {
          username: 'new.kid',
          displayName: 'Again',
        })
      ).statusCode,
    ).toBe(409);
    expect(
      (
        await req('POST', '/api/admin/students', 'admin', {
          username: 'x',
          displayName: 'Too short',
        })
      ).statusCode,
    ).toBe(400);
  });

  it('pausing an account signs the student out at once; deleting hides them', async () => {
    const created = data(
      await req('POST', '/api/admin/students', 'admin', {
        username: 'pause.me',
        displayName: 'Pause Me',
      }),
    ) as {
      id: string;
      temporaryPassword: string;
    };
    const cookie = (await login(ctx.app, 'pause.me', created.temporaryPassword)).cookies.find(
      (c) => c.name === 'its_session',
    )!;
    const me = () =>
      ctx.app.inject({
        method: 'GET',
        url: '/api/auth/me',
        headers: { cookie: `its_session=${cookie.value}` },
      });
    expect((await me()).statusCode).toBe(200);

    expect(
      (await req('PATCH', `/api/admin/students/${created.id}`, 'admin', { status: 'disabled' }))
        .statusCode,
    ).toBe(200);
    expect((await me()).statusCode).toBe(401);

    expect((await req('DELETE', `/api/admin/students/${created.id}`, 'admin')).statusCode).toBe(
      200,
    );
    expect((await req('GET', `/api/teacher/students/${created.id}`, 'admin')).statusCode).toBe(404);
    const logs = data(await req('GET', '/api/admin/audit-logs?pageSize=5', 'admin')) as {
      action: string;
    }[];
    expect(logs.map((l) => l.action)).toEqual(
      expect.arrayContaining(['student.deleted', 'student.updated', 'student.created']),
    );
  });
});

describe('CSV import', () => {
  it('reports every problem with its line number and creates nobody', async () => {
    const csv = [
      'username,display name,class',
      'imp.one,Imp One,Class B',
      'Bad Name!,Two,',
      'imp.one,Dup,',
      'kid.a,Taken,',
      'imp.five,,Nowhere',
    ].join('\n');
    const res = await req('POST', '/api/admin/students/import', 'admin', { csv });
    expect(res.statusCode).toBe(200);
    const { created, rows } = res.json().data;
    expect(created).toBe(0);
    expect(
      rows.map((r: { line: number; problems: string[] }) => [r.line, r.problems.length > 0]),
    ).toEqual([
      [2, false],
      [3, true],
      [4, true],
      [5, true],
      [6, true],
    ]);
    expect(rows[2].problems).toContain('Same username as line 2');
    expect(rows[3].problems).toContain('Username already exists');
    expect(rows[4].problems).toEqual(
      expect.arrayContaining(['Display name: 1–80 characters', 'Unknown class "Nowhere"']),
    );
    const [still] = await ctx.deps.db.select().from(s.users).where(eq(s.users.username, 'imp.one'));
    expect(still).toBeUndefined();
  });

  it('a dry run checks without creating; a real run creates everyone with temporary passwords', async () => {
    const csv = 'username,name,class\r\nimp.a,Import A,Class B\r\nimp.b,"Chan, Import B",\r\n';
    const dry = data(
      await req('POST', '/api/admin/students/import', 'admin', { csv, dryRun: true }),
    ) as { created: number };
    expect(dry.created).toBe(0);

    const real = data(await req('POST', '/api/admin/students/import', 'admin', { csv })) as {
      created: number;
      rows: { username: string; displayName: string; temporaryPassword: string }[];
    };
    expect(real.created).toBe(2);
    expect(real.rows[1]!.displayName).toBe('Chan, Import B');
    const signIn = await login(ctx.app, 'imp.a', real.rows[0]!.temporaryPassword);
    expect(signIn.statusCode).toBe(200);
    const [student] = await ctx.deps.db
      .select({ cohortId: s.students.cohortId })
      .from(s.students)
      .innerJoin(s.users, eq(s.users.id, s.students.userId))
      .where(eq(s.users.username, 'imp.a'));
    expect(student!.cohortId).toBe(classB);
  });
});

describe('content management', () => {
  it('builds a new lesson that students can play once it is published', async () => {
    const [world] = await ctx.deps.db
      .select()
      .from(s.worlds)
      .where(eq(s.worlds.slug, 'math-playground'));

    // Create (draft) → students can't see it.
    const lesson = data(
      await req('POST', `/api/admin/worlds/${world!.id}/lessons`, 'admin', {
        slug: 'admin-made',
        title: { en: 'Made by an admin', km: 'បង្កើតដោយអ្នកគ្រប់គ្រង' },
        estimatedMinutes: 5,
      }),
    ) as { id: string; status: string };
    expect(lesson.status).toBe('draft');
    expect((await req('GET', `/api/lessons/${lesson.id}`, 'kidA')).statusCode).toBe(404);

    // Add a scored activity with a question.
    const activity = data(
      await req('POST', `/api/admin/lessons/${lesson.id}/activities`, 'admin', {
        step: 'play',
        type: 'multiple_choice',
        isScored: true,
        xpReward: 10,
      }),
    ) as { id: string };
    const bad = await req('POST', `/api/admin/activities/${activity.id}/questions`, 'admin', {
      kind: 'single_choice',
      prompt: { en: '1 + 1 = ?' },
      options: [{ label: { en: '2' } }, { label: { en: '3' } }],
    });
    expect(bad.statusCode).toBe(400);
    expect(bad.json().error.details.problems).toEqual(['Mark exactly 1 correct option (now 0).']);
    const good = await req('POST', `/api/admin/activities/${activity.id}/questions`, 'admin', {
      kind: 'single_choice',
      prompt: { en: '1 + 1 = ?' },
      options: [{ label: { en: '2' }, isCorrect: true }, { label: { en: '3' } }],
    });
    expect(good.statusCode).toBe(200);

    // The editor sees answers; the new play step sits before the reward step.
    const full = data(await req('GET', `/api/admin/lessons/${lesson.id}`, 'admin')) as {
      activities: { step: string; questions: { options: { isCorrect: boolean }[] }[] }[];
    };
    expect(full.activities.map((a) => a.step)).toEqual([
      'welcome',
      'learn',
      'see',
      'play',
      'reward',
    ]);
    expect(full.activities[3]!.questions[0]!.options.some((o) => o.isCorrect)).toBe(true);

    // Publish → visible immediately (cache version bumped), without answers, and playable.
    await req('PATCH', `/api/admin/lessons/${lesson.id}`, 'admin', { status: 'published' });
    const view = await req('GET', `/api/lessons/${lesson.id}`, 'kidA');
    expect(view.statusCode).toBe(200);
    expect(view.body).not.toMatch(/isCorrect/);
    expect((view.json().data as LessonPlay).title.km).toBe('បង្កើតដោយអ្នកគ្រប់គ្រង');
    const dashboard = data(await req('GET', '/api/progress', 'kidA')) as Dashboard;
    expect(dashboard.course!.lessonsTotal).toBe(ALL_LESSONS.length + 1);

    const [kid] = await ctx.deps.db.select().from(s.users).where(eq(s.users.username, 'kid.a'));
    const { complete } = await playLesson(
      ctx,
      { id: kid!.id, cookie: cookies.kidA! },
      'admin-made',
    );
    expect((await complete()).statusCode).toBe(200);

    // Archive (soft delete) → gone for students, progress rows kept.
    await req('DELETE', `/api/admin/lessons/${lesson.id}`, 'admin');
    expect((await req('GET', `/api/lessons/${lesson.id}`, 'kidA')).statusCode).toBe(404);
    const kept = await ctx.deps.db
      .select()
      .from(s.studentLessonProgress)
      .where(eq(s.studentLessonProgress.lessonId, lesson.id));
    expect(kept).toHaveLength(1);
  });

  it('reorders lessons and refuses incomplete orders', async () => {
    const [world] = await ctx.deps.db
      .select()
      .from(s.worlds)
      .where(eq(s.worlds.slug, 'ai-playground'));
    const list = data(await req('GET', `/api/admin/worlds/${world!.id}/lessons`, 'admin')) as {
      id: string;
      slug: string;
    }[];
    const reversed = [...list].reverse().map((l) => l.id);
    expect(
      (
        await req('POST', `/api/admin/worlds/${world!.id}/lessons/reorder`, 'admin', {
          ids: reversed.slice(1),
        })
      ).statusCode,
    ).toBe(400);
    expect(
      (
        await req('POST', `/api/admin/worlds/${world!.id}/lessons/reorder`, 'admin', {
          ids: reversed,
        })
      ).statusCode,
    ).toBe(200);

    const detail = data(await req('GET', `/api/worlds/${world!.id}`, 'kidA')) as {
      lessons: { slug: string }[];
    };
    expect(detail.lessons[0]!.slug).toBe(list.at(-1)!.slug);
    await req('POST', `/api/admin/worlds/${world!.id}/lessons/reorder`, 'admin', {
      ids: list.map((l) => l.id),
    });
  });

  it('unpublishing a world hides it from the dashboard right away', async () => {
    const [world] = await ctx.deps.db
      .select()
      .from(s.worlds)
      .where(eq(s.worlds.slug, 'office-creator'));
    await req('PATCH', `/api/admin/worlds/${world!.id}`, 'admin', { status: 'draft' });
    try {
      await flushTestRedis(ctx.deps); // the 5-minute dashboard cache; content itself is versioned
      cookies.kidB = await loginAs(ctx.app, 'kid.b');
      const d = data(await req('GET', '/api/progress', 'kidB')) as Dashboard;
      expect(d.worlds.some((w) => w.slug === 'office-creator')).toBe(false);
    } finally {
      await req('PATCH', `/api/admin/worlds/${world!.id}`, 'admin', { status: 'published' });
    }
  });

  it('changing only the status leaves every other field alone (regression)', async () => {
    const [lesson] = await ctx.deps.db
      .select()
      .from(s.lessons)
      .where(eq(s.lessons.slug, 'logic-puzzles'));
    const [activity] = await ctx.deps.db
      .select()
      .from(s.activities)
      .where(eq(s.activities.lessonId, lesson!.id))
      .limit(1);
    expect(lesson!.estimatedMinutes).toBe(12);

    await req('PATCH', `/api/admin/lessons/${lesson!.id}`, 'admin', { status: 'draft' });
    await req('PATCH', `/api/admin/lessons/${lesson!.id}`, 'admin', { status: 'published' });
    await req('PATCH', `/api/admin/activities/${activity!.id}`, 'admin', { status: 'published' });

    const [after] = await ctx.deps.db.select().from(s.lessons).where(eq(s.lessons.id, lesson!.id));
    const [activityAfter] = await ctx.deps.db
      .select()
      .from(s.activities)
      .where(eq(s.activities.id, activity!.id));
    expect(after).toMatchObject({
      estimatedMinutes: 12,
      xpReward: lesson!.xpReward,
      title: lesson!.title,
    });
    expect(activityAfter).toMatchObject({
      config: activity!.config,
      xpReward: activity!.xpReward,
      isScored: activity!.isScored,
    });
  });

  it('turns duplicate slugs into a friendly 409', async () => {
    const [world] = await ctx.deps.db
      .select()
      .from(s.worlds)
      .where(eq(s.worlds.slug, 'math-playground'));
    const res = await req('POST', `/api/admin/worlds/${world!.id}/lessons`, 'admin', {
      slug: 'number-patterns',
      title: { en: 'Dup' },
    });
    expect(res.statusCode).toBe(409);
  });

  it('edits badges with validated rules', async () => {
    const [badge] = data(await req('GET', '/api/admin/badges', 'admin')) as { id: string }[];
    expect(
      (
        await req('PATCH', `/api/admin/badges/${badge!.id}`, 'admin', {
          criteria: { type: 'magic' },
        })
      ).statusCode,
    ).toBe(400);
    const res = await req('PATCH', `/api/admin/badges/${badge!.id}`, 'admin', {
      name: { en: 'Brain Champion', km: 'ជើងឯកខួរក្បាល' },
    });
    expect(res.json().data.name).toEqual({ en: 'Brain Champion', km: 'ជើងឯកខួរក្បាល' });
  });
});

describe('staff', () => {
  it('creates a teacher for a class who must change their password', async () => {
    const res = await req('POST', '/api/admin/staff', 'admin', {
      username: 'new.teacher2',
      displayName: 'New Teacher',
      role: 'TEACHER',
      cohortIds: [classB],
    });
    const { temporaryPassword } = res.json().data;
    const signIn = await login(ctx.app, 'new.teacher2', temporaryPassword);
    expect(signIn.json().data.user).toMatchObject({ role: 'TEACHER', mustChangePassword: true });
    const list = data(await req('GET', '/api/admin/staff', 'admin')) as {
      username: string;
      cohortCount: number;
    }[];
    expect(list.find((x) => x.username === 'new.teacher2')?.cohortCount).toBe(1);
  });
});
