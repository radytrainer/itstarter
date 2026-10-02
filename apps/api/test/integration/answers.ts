import { and, eq } from 'drizzle-orm';
import { expect } from 'vitest';
import {
  robotBoardSchema,
  solveRobot,
  TEXT_FORMAT_DEFAULT,
  type LessonPlay,
} from '@itstarter/shared';
import * as s from '../../src/db/schema';
import { generatedSeed, generateQuestion } from '../../src/engine/generators';
import { CSRF, type TestContext } from './helpers';

/**
 * Test helpers that answer questions the way a student who knows everything would.
 * They read answers from the database (and re-create generated maths exactly as the server does).
 */

export async function lessonIdBySlug(ctx: TestContext, slug: string) {
  const [row] = await ctx.deps.db.select().from(s.lessons).where(eq(s.lessons.slug, slug));
  if (!row) throw new Error(`No lesson ${slug}`);
  return row.id;
}

async function lessonRound(ctx: TestContext, studentId: string, lessonId: string) {
  const [row] = await ctx.deps.db
    .select({ completions: s.studentLessonProgress.completions })
    .from(s.studentLessonProgress)
    .where(
      and(
        eq(s.studentLessonProgress.studentId, studentId),
        eq(s.studentLessonProgress.lessonId, lessonId),
      ),
    );
  return row?.completions ?? 0;
}

export async function correctAnswerFor(
  ctx: TestContext,
  questionId: string,
  student?: { id: string; lessonId: string },
): Promise<unknown> {
  const [q] = await ctx.deps.db.select().from(s.questions).where(eq(s.questions.id, questionId));
  const options = await ctx.deps.db
    .select()
    .from(s.questionOptions)
    .where(eq(s.questionOptions.questionId, questionId));
  switch (q!.kind) {
    case 'generated': {
      if (!student) throw new Error('generated questions need the student');
      const round = await lessonRound(ctx, student.id, student.lessonId);
      const instance = generateQuestion(
        q!.config.generator as string,
        q!.difficulty,
        generatedSeed(student.id, q!.id, round),
      );
      return { value: instance.answer };
    }
    case 'single_choice':
      return { optionId: options.find((o) => o.isCorrect)!.id };
    case 'number':
    case 'true_false':
    case 'safe_or_dangerous':
      return { value: q!.config.answer };
    case 'matching': {
      const rights = options.filter((o) => o.groupKey === 'right');
      return {
        pairs: options
          .filter((o) => o.groupKey === 'left')
          .map((l) => ({ left: l.id, right: rights.find((r) => r.matchKey === l.matchKey)!.id })),
      };
    }
    case 'ordering':
      return {
        order: [...options].sort((a, b) => a.correctOrder! - b.correctOrder!).map((o) => o.id),
      };
    case 'key_combo':
      return { keys: q!.config.answer };
    case 'categorize': {
      const buckets = options.filter((o) => o.groupKey === 'bucket');
      return {
        placements: options
          .filter((o) => o.groupKey === 'item')
          .map((i) => ({ item: i.id, bucket: buckets.find((b) => b.matchKey === i.matchKey)!.id })),
      };
    }
    case 'cell_select':
      return { cell: q!.config.answer };
    case 'format_text':
      return { format: { ...TEXT_FORMAT_DEFAULT, ...(q!.config.answer as object) } };
    case 'prompt_builder':
      return { optionIds: options.filter((o) => o.isCorrect).map((o) => o.id) };
    case 'catch':
      return { caught: options.filter((o) => o.isCorrect).map((o) => o.id) };
    case 'memory': {
      const keys = [...new Set(options.map((o) => o.matchKey))];
      return {
        pairs: keys.map((k) => {
          const [a, b] = options.filter((o) => o.matchKey === k);
          return { a: a!.id, b: b!.id };
        }),
        moves: keys.length,
      };
    }
    case 'robot':
      return { program: solveRobot(robotBoardSchema.parse(q!.publicConfig.robot)) };
    case 'word_builder':
      return { word: q!.config.answer };
    default:
      throw new Error(`no answer helper for ${q!.kind}`);
  }
}

/** A wrong (but well-formed) answer. */
export async function wrongAnswerFor(
  ctx: TestContext,
  questionId: string,
  student?: { id: string; lessonId: string },
) {
  const [q] = await ctx.deps.db.select().from(s.questions).where(eq(s.questions.id, questionId));
  const options = await ctx.deps.db
    .select()
    .from(s.questionOptions)
    .where(eq(s.questionOptions.questionId, questionId));
  if (q!.kind === 'single_choice') return { optionId: options.find((o) => !o.isCorrect)!.id };
  if (q!.kind === 'number') return { value: (q!.config.answer as number) + 1 };
  if (q!.kind === 'generated') {
    const right = (await correctAnswerFor(ctx, questionId, student)) as { value: number };
    return { value: right.value + 1 };
  }
  if (q!.kind === 'catch') return { caught: [] };
  if (q!.kind === 'word_builder') return { word: 'not the answer' };
  if (q!.kind === 'robot') {
    // Walk straight into the nearest edge.
    const [row] = robotBoardSchema.parse(q!.publicConfig.robot).start;
    return { program: [row === 0 ? 'up' : 'down'] };
  }
  if (q!.kind === 'memory') {
    // Pair cards from different pairs.
    const [a, b] = [options[0]!, options.find((o) => o.matchKey !== options[0]!.matchKey)!];
    return { pairs: [{ a: a.id, b: b.id }], moves: 1 };
  }
  throw new Error(`no wrong-answer helper for ${q!.kind}`);
}

/** Fills every field of a creative activity. */
export function creationContent(activity: LessonPlay['activities'][number]) {
  const fields = activity.config.fields as { key: string }[];
  return Object.fromEntries(
    fields.map((f) => [
      f.key,
      f.key === 'food' || f.key === 'transport' || f.key === 'phone' || f.key === 'other'
        ? '2'
        : `My ${f.key}`,
    ]),
  );
}

/** Plays a whole lesson perfectly (every activity type), returning a function to complete it. */
export async function playLesson(
  ctx: TestContext,
  student: { id: string; cookie: string },
  slug: string,
) {
  const lessonId = await lessonIdBySlug(ctx, slug);
  const headers = { ...CSRF, cookie: student.cookie };
  const lesson = (
    await ctx.app.inject({
      method: 'GET',
      url: `/api/lessons/${lessonId}`,
      headers: { cookie: student.cookie },
    })
  ).json().data as LessonPlay;
  await ctx.app.inject({ method: 'POST', url: `/api/lessons/${lessonId}/start`, headers });

  for (const activity of lesson.activities) {
    if (activity.type === 'creation') {
      const res = await ctx.app.inject({
        method: 'PUT',
        url: `/api/activities/${activity.id}/creation`,
        headers,
        payload: { content: creationContent(activity) },
      });
      expect(res.statusCode, `${slug}/creation: ${res.body}`).toBe(200);
      continue;
    }
    if (!activity.isScored) {
      const res = await ctx.app.inject({
        method: 'POST',
        url: `/api/activities/${activity.id}/complete`,
        headers,
      });
      expect(res.statusCode, `${slug}/${activity.type}`).toBe(200);
      continue;
    }
    for (const q of activity.questions) {
      const res = await ctx.app.inject({
        method: 'POST',
        url: `/api/activities/${activity.id}/answer`,
        headers,
        payload: {
          questionId: q.id,
          answer: await correctAnswerFor(ctx, q.id, { id: student.id, lessonId }),
        },
      });
      expect(res.statusCode, `${slug}/${q.kind}: ${res.body}`).toBe(200);
      expect(res.json().data.correct, `${slug}/${q.kind}`).toBe(true);
    }
  }
  return {
    lessonId,
    lesson,
    complete: () =>
      ctx.app.inject({
        method: 'POST',
        url: `/api/lessons/${lessonId}/complete`,
        headers,
        payload: { timeSpentSeconds: 300 },
      }),
  };
}
