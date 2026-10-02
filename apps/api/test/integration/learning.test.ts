import { and, eq } from 'drizzle-orm';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import type { Dashboard, LessonPlay, PlayActivity } from '@itstarter/shared';
import * as s from '../../src/db/schema';
import { ALL_LESSONS } from '../../src/db/seed/data/lessons';
import {
  correctAnswerFor,
  creationContent,
  lessonIdBySlug,
  playLesson,
  wrongAnswerFor,
} from './answers';
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

/** Each test gets a fresh student so tests don't depend on each other. */
async function newStudent() {
  const username = `learner${(counter += 1)}`;
  const id = await createUser(ctx.deps, { username, role: 'STUDENT', cohortId: cohort });
  return { id, cookie: await loginAs(ctx.app, username) };
}

const get = (url: string, cookie: string) =>
  ctx.app.inject({ method: 'GET', url, headers: { cookie } });
const post = (url: string, cookie: string, payload?: object) =>
  ctx.app.inject({
    method: 'POST',
    url,
    headers: { ...CSRF, cookie },
    ...(payload ? { payload } : {}),
  });
const put = (url: string, cookie: string, payload: object) =>
  ctx.app.inject({ method: 'PUT', url, headers: { ...CSRF, cookie }, payload });
const lessonId = (slug: string) => lessonIdBySlug(ctx, slug);
const getLesson = async (slug: string, cookie: string) =>
  (await get(`/api/lessons/${await lessonId(slug)}`, cookie)).json().data as LessonPlay;

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

describe('GET /api/lessons/:id', () => {
  it('sends the lesson without any answers', async () => {
    const { cookie } = await newStudent();
    for (const slug of [
      'better-prompts',
      'prompt-builder',
      'files-and-folders',
      'format-your-text',
      'cells-and-addresses',
      'copy-and-paste',
    ]) {
      const res = await get(`/api/lessons/${await lessonId(slug)}`, cookie);
      expect(res.statusCode).toBe(200);
      expect(res.body, slug).not.toMatch(
        /isCorrect|is_correct|matchKey|match_key|correctOrder|correct_order|"answer"|"generator"/,
      );
      const lesson = res.json().data as LessonPlay;
      for (const q of lesson.activities.flatMap((a) => a.questions)) {
        expect(q).not.toHaveProperty('explanation');
        expect(q).not.toHaveProperty('config');
      }
    }
  });

  it('every lesson has the six steps, with a game round before the reward', async () => {
    const { cookie } = await newStudent();
    const lesson = await getLesson('better-prompts', cookie);
    expect(lesson.activities.map((a) => a.step)).toEqual([
      'welcome',
      'learn',
      'see',
      'play',
      'challenge',
      'challenge',
      'reward',
    ]);
    expect(lesson.activities.at(-2)!.type).toBe('game');
    expect(lesson.progress).toEqual({
      status: 'not_started',
      completedActivityIds: [],
      solvedQuestionIds: [],
      creations: {},
    });
  });

  it('never sends an ordering question already in the right order', async () => {
    const { cookie } = await newStudent();
    const lesson = await getLesson('better-prompts', cookie);
    const q = lesson.activities.flatMap((a) => a.questions).find((x) => x.kind === 'ordering')!;
    const correct = (await correctAnswerFor(ctx, q.id)) as { order: string[] };
    expect(q.options.map((o) => o.id)).not.toEqual(correct.order);
  });

  it('shows the same option order on reload, and the correct option is not always first', async () => {
    const { cookie } = await newStudent();
    const first = await getLesson('number-patterns', cookie);
    expect((await getLesson('number-patterns', cookie)).activities).toEqual(first.activities);

    const positions = new Set<number>();
    for (let i = 0; i < 6; i += 1) {
      const other = await newStudent();
      const lesson = await getLesson('number-patterns', other.cookie);
      const q = lesson.activities.find((a) => a.type === 'multiple_choice')!.questions[0]!;
      const right = ((await correctAnswerFor(ctx, q.id)) as { optionId: string }).optionId;
      positions.add(q.options.findIndex((o) => o.id === right));
    }
    expect(positions.size).toBeGreaterThan(1);
  });

  it('lets staff preview without progress, but not answer', async () => {
    await createUser(ctx.deps, { username: 'preview.teacher', role: 'TEACHER', cohortId: cohort });
    const cookie = await loginAs(ctx.app, 'preview.teacher');
    const lesson = await getLesson('number-patterns', cookie);
    expect(lesson.progress).toBeNull();
    const activity = lesson.activities.find((a) => a.isScored)!;
    const res = await post(`/api/activities/${activity.id}/answer`, cookie, {
      questionId: activity.questions[0]!.id,
      answer: { optionId: activity.questions[0]!.options[0]!.id },
    });
    expect(res.statusCode).toBe(403);
  });

  it('hides unpublished lessons', async () => {
    const { cookie } = await newStudent();
    const id = await lessonId('money-maths');
    await ctx.deps.db.update(s.lessons).set({ status: 'draft' }).where(eq(s.lessons.id, id));
    await ctx.deps.redis.incr('content:version');
    try {
      expect((await get(`/api/lessons/${id}`, cookie)).statusCode).toBe(404);
    } finally {
      await ctx.deps.db.update(s.lessons).set({ status: 'published' }).where(eq(s.lessons.id, id));
      await ctx.deps.redis.incr('content:version');
    }
  });
});

describe('answering', () => {
  // The built-in lessons all use "reveal" feedback; admins can switch an activity back to the
  // default "retry" mode (config without feedback). These tests do that for one activity.
  let retryActivityId: string;
  let originalConfig: Record<string, unknown>;

  beforeAll(async () => {
    const id = await lessonId('browsers-and-urls');
    const [row] = await ctx.deps.db
      .select()
      .from(s.activities)
      .where(and(eq(s.activities.lessonId, id), eq(s.activities.step, 'play')));
    retryActivityId = row!.id;
    originalConfig = row!.config;
    await ctx.deps.db
      .update(s.activities)
      .set({ config: {} })
      .where(eq(s.activities.id, retryActivityId));
    await ctx.deps.redis.incr('content:version');
  });

  afterAll(async () => {
    await ctx.deps.db
      .update(s.activities)
      .set({ config: originalConfig })
      .where(eq(s.activities.id, retryActivityId));
    await ctx.deps.redis.incr('content:version');
  });

  async function firstChoiceActivity(cookie: string) {
    return (await getLesson('browsers-and-urls', cookie)).activities.find(
      (a) => a.id === retryActivityId,
    ) as PlayActivity;
  }

  /** Answers every question but the last one correctly. */
  async function answerAllButLast(cookie: string, activity: PlayActivity) {
    for (const q of activity.questions.slice(0, -1)) {
      const res = (
        await post(`/api/activities/${activity.id}/answer`, cookie, {
          questionId: q.id,
          answer: await correctAnswerFor(ctx, q.id),
        })
      ).json().data;
      expect(res).toMatchObject({ correct: true, activityCompleted: false, xpAwarded: 0 });
    }
    return activity.questions.at(-1)!;
  }

  it('gives a clue-friendly response for a wrong answer, then reveals after 2 tries', async () => {
    const { cookie } = await newStudent();
    const activity = await firstChoiceActivity(cookie);
    const q = activity.questions[0]!;
    const wrong = await wrongAnswerFor(ctx, q.id);

    const first = (
      await post(`/api/activities/${activity.id}/answer`, cookie, {
        questionId: q.id,
        answer: wrong,
      })
    ).json().data;
    expect(first).toMatchObject({
      correct: false,
      explanation: null,
      revealed: null,
      xpAwarded: 0,
    });

    const second = (
      await post(`/api/activities/${activity.id}/answer`, cookie, {
        questionId: q.id,
        answer: wrong,
      })
    ).json().data;
    expect(second.correct).toBe(false);
    expect(second.revealed).toEqual(await correctAnswerFor(ctx, q.id));
  });

  it('Math & Logic: the first Check shows the answer, and a wrong answer still finishes the question', async () => {
    const student = await newStudent();
    const id = await lessonId('number-patterns');
    const lesson = await getLesson('number-patterns', student.cookie);
    const scored = lesson.activities.filter((a) => a.isScored);
    const quizzes = scored.filter((a) => a.type !== 'game');
    expect(quizzes.every((a) => a.config.feedback === 'reveal')).toBe(true);

    const [play] = quizzes;
    const q = play!.questions[0]!;
    const first = (
      await post(`/api/activities/${play!.id}/answer`, student.cookie, {
        questionId: q.id,
        answer: await wrongAnswerFor(ctx, q.id),
      })
    ).json().data;
    expect(first).toMatchObject({
      correct: false,
      explanation: { en: '8 + 2 = 10', km: '8 + 2 = 10' },
      revealed: await correctAnswerFor(ctx, q.id),
    });

    // Answer every question wrong once: each counts as done, so the lesson can be finished.
    for (const activity of quizzes) {
      for (const question of activity.questions) {
        if (question.id === q.id) continue;
        const res = (
          await post(`/api/activities/${activity.id}/answer`, student.cookie, {
            questionId: question.id,
            answer: await wrongAnswerFor(ctx, question.id, { id: student.id, lessonId: id }),
          })
        ).json().data;
        expect(res.correct, question.prompt.en).toBe(false);
        expect(res.revealed, question.prompt.en).not.toBeNull();
      }
    }
    // Games can be replayed: a wrong try is just "try again" (no answer shown yet), then win.
    for (const activity of scored.filter((a) => a.type === 'game')) {
      expect(activity.config.feedback).toBeUndefined();
      for (const question of activity.questions) {
        const send = async (answer: unknown) =>
          (
            await post(`/api/activities/${activity.id}/answer`, student.cookie, {
              questionId: question.id,
              answer,
            })
          ).json().data;
        expect(await send(await wrongAnswerFor(ctx, question.id))).toMatchObject({
          correct: false,
          revealed: null,
        });
        expect((await send(await correctAnswerFor(ctx, question.id))).correct).toBe(true);
      }
    }
    for (const activity of lesson.activities.filter((a) => !a.isScored)) {
      await post(`/api/activities/${activity.id}/complete`, student.cookie);
    }
    const resumed = await getLesson('number-patterns', student.cookie);
    expect(resumed.progress!.solvedQuestionIds).toHaveLength(
      scored.reduce((n, a) => n + a.questions.length, 0),
    );
    expect((await post(`/api/lessons/${id}/complete`, student.cookie, {})).statusCode).toBe(200);
    const [row] = await ctx.deps.db
      .select()
      .from(s.studentLessonProgress)
      .where(
        and(
          eq(s.studentLessonProgress.studentId, student.id),
          eq(s.studentLessonProgress.lessonId, id),
        ),
      );
    expect(row!.bestScore).toBe(0); // every first answer was wrong
  });

  it('completes an activity (and awards its XP once) when every question is solved', async () => {
    const { id, cookie } = await newStudent();
    const activity = await firstChoiceActivity(cookie);
    const q2 = await answerAllButLast(cookie, activity);

    const a2 = (
      await post(`/api/activities/${activity.id}/answer`, cookie, {
        questionId: q2!.id,
        answer: await correctAnswerFor(ctx, q2!.id),
      })
    ).json().data;
    expect(a2).toMatchObject({
      correct: true,
      activityCompleted: true,
      xpAwarded: 10,
      totalXp: 10,
    });

    for (let i = 0; i < 3; i += 1) {
      const again = (
        await post(`/api/activities/${activity.id}/answer`, cookie, {
          questionId: q2!.id,
          answer: await correctAnswerFor(ctx, q2!.id),
        })
      ).json().data;
      expect(again).toMatchObject({ xpAwarded: 0, totalXp: 10 });
    }
    const ledger = await ctx.deps.db
      .select()
      .from(s.xpTransactions)
      .where(eq(s.xpTransactions.studentId, id));
    expect(ledger).toHaveLength(1);
  });

  it('awards XP once even when the same answer is sent many times at once', async () => {
    const { id, cookie } = await newStudent();
    const activity = await firstChoiceActivity(cookie);
    const q2 = await answerAllButLast(cookie, activity);
    const answer = await correctAnswerFor(ctx, q2!.id);

    const results = await Promise.all(
      Array.from({ length: 8 }, () =>
        post(`/api/activities/${activity.id}/answer`, cookie, { questionId: q2!.id, answer }),
      ),
    );
    expect(results.every((r) => r.statusCode === 200)).toBe(true);
    expect(results.map((r) => r.json().data.xpAwarded).filter((x: number) => x > 0)).toEqual([10]);
    const [student] = await ctx.deps.db.select().from(s.students).where(eq(s.students.userId, id));
    expect(student!.xpTotal).toBe(10);
  });

  it('validates answers and questions', async () => {
    const { cookie } = await newStudent();
    const activity = await firstChoiceActivity(cookie);
    const q = activity.questions[0]!;
    expect(
      (
        await post(`/api/activities/${activity.id}/answer`, cookie, {
          questionId: q.id,
          answer: { value: 3 },
        })
      ).statusCode,
    ).toBe(400);
    expect(
      (
        await post(`/api/activities/${activity.id}/answer`, cookie, {
          questionId: '00000000-0000-7000-8000-000000000000',
          answer: {},
        })
      ).statusCode,
    ).toBe(404);
    expect(
      (await post(`/api/activities/${activity.id}/answer`, cookie, { answer: {} })).statusCode,
    ).toBe(400);
  });

  it('only content steps can be "completed" without answers', async () => {
    const { cookie } = await newStudent();
    const activity = await firstChoiceActivity(cookie);
    expect((await post(`/api/activities/${activity.id}/complete`, cookie)).statusCode).toBe(400);
  });
});

describe('generated maths (Brain Playground)', () => {
  it('shows a number question with this student’s numbers and checks it on the server', async () => {
    const student = await newStudent();
    const id = await lessonId('times-tables');
    const lesson = await getLesson('times-tables', student.cookie);
    const activity = lesson.activities.find((a) => a.step === 'play')!;
    const q = activity.questions[0]!;
    expect(q.kind).toBe('number');
    expect(q.prompt.en).toMatch(/^\d+ × \d+ = \?$/);
    expect(q.prompt.km).toBeTruthy();
    expect(q.data).toMatchObject({ generated: true });

    const [a, b] = q.prompt.en.match(/\d+/g)!.map(Number);
    const res = (
      await post(`/api/activities/${activity.id}/answer`, student.cookie, {
        questionId: q.id,
        answer: { value: a! * b! },
      })
    ).json().data;
    expect(res.correct).toBe(true);
    expect(res.explanation.en).toBe(`${a} × ${b} = ${a! * b!}`);

    // Two students get different numbers (with overwhelming probability over 3 questions).
    const other = await newStudent();
    const theirs = (await getLesson('times-tables', other.cookie)).activities
      .find((x) => x.step === 'play')!
      .questions.map((x) => x.prompt.en);
    expect(theirs).not.toEqual(activity.questions.map((x) => x.prompt.en));
    expect(id).toBeTruthy();
  });

  it('reveals the generated answer straight away (Math Playground)', async () => {
    const student = await newStudent();
    const id = await lessonId('adding-and-subtracting');
    const activity = (await getLesson('adding-and-subtracting', student.cookie)).activities.find(
      (a) => a.step === 'play',
    )!;
    const q = activity.questions[0]!;
    const wrong = await wrongAnswerFor(ctx, q.id, { id: student.id, lessonId: id });
    const second = (
      await post(`/api/activities/${activity.id}/answer`, student.cookie, {
        questionId: q.id,
        answer: wrong,
      })
    ).json().data;
    expect(second.revealed).toEqual(
      await correctAnswerFor(ctx, q.id, { id: student.id, lessonId: id }),
    );
    expect(second.explanation.en).toContain(String((second.revealed as { value: number }).value));
  });

  it('a replay after finishing gives new numbers', async () => {
    const student = await newStudent();
    const before = (await getLesson('percentages', student.cookie)).activities
      .flatMap((a) => a.questions)
      .map((q) => q.prompt.en);
    const { complete } = await playLesson(ctx, student, 'percentages');
    expect((await complete()).statusCode).toBe(200);
    const after = (await getLesson('percentages', student.cookie)).activities
      .flatMap((a) => a.questions)
      .map((q) => q.prompt.en);
    expect(after).not.toEqual(before);
    // …and the new numbers are still answerable.
    const { complete: again } = await playLesson(ctx, student, 'percentages');
    expect((await again()).json().data.firstCompletion).toBe(false);
  });
});

describe('creative work', () => {
  async function profileActivity(cookie: string) {
    return (await getLesson('my-profile', cookie)).activities.find((a) => a.type === 'creation')!;
  }

  it('saves the work, completes the activity once, and shows it again', async () => {
    const { cookie } = await newStudent();
    const activity = await profileActivity(cookie);
    const content = {
      name: 'Sokha',
      province: 'Kampot',
      hobby: 'Football',
      subject: 'Maths',
      dream: 'Build apps <b>for</b> farmers',
    };

    const first = (await put(`/api/activities/${activity.id}/creation`, cookie, { content })).json()
      .data;
    expect(first).toMatchObject({ activityCompleted: true, xpAwarded: 20 });
    const second = (
      await put(`/api/activities/${activity.id}/creation`, cookie, {
        content: { ...content, hobby: 'Music' },
      })
    ).json().data;
    expect(second.xpAwarded).toBe(0);

    const lesson = await getLesson('my-profile', cookie);
    expect(lesson.progress!.creations[activity.id]).toMatchObject({
      hobby: 'Music',
      dream: 'Build apps <b>for</b> farmers',
    });
    expect(lesson.progress!.completedActivityIds).toContain(activity.id);
  });

  it('validates the fields', async () => {
    const { cookie } = await newStudent();
    const activity = await profileActivity(cookie);
    const valid = creationContent(activity);
    expect(
      (
        await put(`/api/activities/${activity.id}/creation`, cookie, {
          content: { ...valid, password: 'x' },
        })
      ).statusCode,
    ).toBe(400);
    expect(
      (
        await put(`/api/activities/${activity.id}/creation`, cookie, {
          content: { ...valid, name: 'x'.repeat(61) },
        })
      ).statusCode,
    ).toBe(400);
    expect(
      (
        await put(`/api/activities/${activity.id}/creation`, cookie, {
          content: { name: 'Only a name' },
        })
      ).json().error.details,
    ).toMatchObject({
      missing: ['province', 'hobby', 'subject', 'dream'],
    });
    expect((await post(`/api/activities/${activity.id}/complete`, cookie)).statusCode).toBe(400);
  });
});

describe('completing a lesson', () => {
  it('refuses until every scored activity is done', async () => {
    const { cookie } = await newStudent();
    const res = await post(
      `/api/lessons/${await lessonId('number-patterns')}/complete`,
      cookie,
      {},
    );
    expect(res.statusCode).toBe(409);
    expect(res.json().error.code).toBe('LESSON_INCOMPLETE');
    expect(res.json().error.details.missingActivityIds).toHaveLength(3); // play, challenge, game
  });

  it('awards lesson XP, the first-lesson achievement, progress and streak — exactly once', async () => {
    const student = await newStudent();
    const before = (await get('/api/progress', student.cookie)).json().data as Dashboard;

    const { lessonId: id, complete } = await playLesson(ctx, student, 'number-patterns');
    const first = (await complete()).json().data;
    expect(first).toMatchObject({
      firstCompletion: true,
      xpAwarded: 50,
      lessonXpTotal: 90, // 10 (play) + 15 (challenge) + 15 (game) + 50 (lesson)
      totalXp: 110, // + 20 bonus for the "First Step" achievement
      levelUp: false,
      streak: 1,
      worldPercent: 7, // 1 of 15 Math lessons
      nextLessonId: await lessonId('place-value'),
    });
    expect(first.newAwards).toEqual([
      {
        kind: 'achievement',
        code: 'first-lesson',
        name: { en: 'First Step' },
        icon: '👣',
        xpBonus: 20,
      },
    ]);

    const replay = (await complete()).json().data;
    expect(replay).toMatchObject({
      firstCompletion: false,
      xpAwarded: 0,
      totalXp: 110,
      lessonXpTotal: 90,
      newAwards: [],
    });

    const after = (await get('/api/progress', student.cookie)).json().data as Dashboard;
    expect(before.course!.lessonsCompleted).toBe(0);
    expect(after.course).toMatchObject({
      lessonsTotal: ALL_LESSONS.length,
      lessonsCompleted: 1,
      percent: Math.round(100 / ALL_LESSONS.length),
    });
    expect(after.student).toMatchObject({ xpTotal: 110, streak: 1 });
    expect(after.continue?.title).toEqual({ en: 'Adding & Subtracting', km: 'ការបូក និងការដក' });

    const [row] = await ctx.deps.db
      .select()
      .from(s.studentLessonProgress)
      .where(
        and(
          eq(s.studentLessonProgress.studentId, student.id),
          eq(s.studentLessonProgress.lessonId, id),
        ),
      );
    expect(row).toMatchObject({
      status: 'completed',
      bestScore: 100,
      timeSpentSeconds: 600,
      completions: 2,
    });

    const [daily] = await ctx.deps.db
      .select()
      .from(s.studentDailyActivity)
      .where(eq(s.studentDailyActivity.studentId, student.id));
    expect(daily).toMatchObject({ xpEarned: 110, lessonsCompleted: 1 });
  });

  it('scores first tries (a reveal still lets you finish)', async () => {
    const student = await newStudent();
    const id = await lessonId('browsers-and-urls');
    const lesson = await getLesson('browsers-and-urls', student.cookie);
    let questions = 0;
    let missed = 0;
    for (const activity of lesson.activities) {
      if (!activity.isScored) {
        await post(`/api/activities/${activity.id}/complete`, student.cookie);
        continue;
      }
      for (const q of activity.questions) {
        questions += 1;
        if (q.kind === 'single_choice' && missed === 0) {
          missed += 1;
          for (let i = 0; i < 2; i += 1) {
            await post(`/api/activities/${activity.id}/answer`, student.cookie, {
              questionId: q.id,
              answer: await wrongAnswerFor(ctx, q.id),
            });
          }
        }
        await post(`/api/activities/${activity.id}/answer`, student.cookie, {
          questionId: q.id,
          answer: await correctAnswerFor(ctx, q.id),
        });
      }
    }
    expect((await post(`/api/lessons/${id}/complete`, student.cookie, {})).statusCode).toBe(200);
    const [row] = await ctx.deps.db
      .select()
      .from(s.studentLessonProgress)
      .where(
        and(
          eq(s.studentLessonProgress.studentId, student.id),
          eq(s.studentLessonProgress.lessonId, id),
        ),
      );
    expect(row!.bestScore).toBe(Math.round(((questions - missed) / questions) * 100));
  });

  it('announces a level up on the reward screen', async () => {
    const student = await newStudent();
    await ctx.deps.db
      .update(s.students)
      .set({ xpTotal: 290 })
      .where(eq(s.students.userId, student.id));
    const { complete } = await playLesson(ctx, student, 'computer-parts');
    const result = (await complete()).json().data;
    expect(result.levelUp).toBe(true);
    expect(result.level).toMatchObject({ number: 2, name: { en: 'IT Explorer' } });
    expect((await complete()).json().data.levelUp).toBe(false);
  });
});

describe('the whole course (Phase 19 journey, by API)', () => {
  it('every lesson can be completed, earning every badge', { timeout: 900_000 }, async () => {
    const student = await newStudent();
    const awards: string[] = [];
    for (const seed of ALL_LESSONS) {
      // A real student can't answer 60 questions a minute; this robot can, so reset the rate limit.
      await flushTestRedis(ctx.deps);
      const { complete } = await playLesson(ctx, student, seed.slug);
      const res = await complete();
      expect(res.statusCode, seed.slug).toBe(200);
      awards.push(...res.json().data.newAwards.map((a: { code: string }) => a.code));
    }

    const d = (await get('/api/progress', student.cookie)).json().data as Dashboard;
    expect(d.course).toMatchObject({
      lessonsTotal: ALL_LESSONS.length,
      lessonsCompleted: ALL_LESSONS.length,
      percent: 100,
    });
    expect(d.worlds.every((w) => w.percent === 100)).toBe(true);
    expect(d.continue).toBeNull();
    expect(d.student.level.number).toBe(5); // 🚀 IT Starter
    expect(d.badges.every((b) => b.earned)).toBe(true);

    expect(awards).toEqual(
      expect.arrayContaining([
        'math-master',
        'logic-master',
        'computer-explorer',
        'mouse-master',
        'keyboard-hero',
        'office-creator',
        'web-explorer',
        'cyber-guardian',
        'ai-explorer',
        'it-starter',
        'first-lesson',
        'five-lessons',
        'xp-500',
        'xp-1000',
      ]),
    );
    expect(new Set(awards).size).toBe(awards.length); // nothing awarded twice
    // The final badge comes with the very last lesson.
    const last = await ctx.deps.db
      .select()
      .from(s.notifications)
      .where(eq(s.notifications.userId, student.id));
    expect(last.length).toBe(awards.length);
  });
});

describe('privacy', () => {
  it('a student’s answers never affect another student', async () => {
    const a = await newStudent();
    const b = await newStudent();
    await (await playLesson(ctx, a, 'number-patterns')).complete();
    const lesson = await getLesson('number-patterns', b.cookie);
    expect(lesson.progress?.completedActivityIds).toEqual([]);
    expect(((await get('/api/progress', b.cookie)).json().data as Dashboard).student.xpTotal).toBe(
      0,
    );
  });
});
