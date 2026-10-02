import { createHash } from 'node:crypto';
import { and, asc, eq, inArray, isNull } from 'drizzle-orm';
import type { LessonPlay, LocalizedText, Media, PlayActivity, PlayOption } from '@itstarter/shared';
import type { Database } from '../../db/client';
import { activities, lessons, questionOptions, questions, worlds } from '../../db/schema';
import type { QuestionWithAnswer } from '../../engine/checkers';
import { generatedSeed, generateQuestion, isGenerator } from '../../engine/generators';
import { seededShuffle } from '../../engine/shuffle';
import type { Cache } from '../../lib/cache';
import { AppError } from '../../lib/errors';
import { published } from '../content/service';

/**
 * A lesson exactly as stored, INCLUDING answers. Stays on the server (and in the server-side
 * Redis cache); only `toPlay*` output is ever sent to a phone.
 */
export interface FullQuestion extends QuestionWithAnswer {
  id: string;
  prompt: LocalizedText;
  media: Media | null;
  hint: LocalizedText | null;
  explanation: LocalizedText | null;
  difficulty: number;
  /** PUBLIC data shown with the question. */
  publicConfig: Record<string, unknown>;
  options: (QuestionWithAnswer['options'][number] & {
    label: LocalizedText;
    media: Media | null;
  })[];
}

export interface FullActivity {
  id: string;
  step: PlayActivity['step'];
  type: string;
  title: LocalizedText | null;
  config: Record<string, unknown>;
  isScored: boolean;
  xpReward: number;
  position: number;
  questions: FullQuestion[];
}

export interface FullLesson {
  id: string;
  worldId: string;
  courseId: string;
  title: LocalizedText;
  summary: LocalizedText | null;
  icon: string | null;
  estimatedMinutes: number;
  xpReward: number;
  world: LessonPlay['world'];
  activities: FullActivity[];
}

const LESSON_TTL_SECONDS = 60 * 60;

export async function loadFullLesson(
  db: Database,
  cache: Cache,
  lessonId: string,
): Promise<FullLesson> {
  const lesson = await cache.getOrLoad(
    await cache.contentKey(`lesson:${lessonId}`),
    LESSON_TTL_SECONDS,
    () => queryFullLesson(db, lessonId),
  );
  if (!lesson) throw AppError.notFound('LESSON_NOT_FOUND', 'Lesson not found');
  return lesson;
}

async function queryFullLesson(db: Database, lessonId: string): Promise<FullLesson | null> {
  const [row] = await db
    .select({ lesson: lessons, world: worlds })
    .from(lessons)
    .innerJoin(worlds, eq(worlds.id, lessons.worldId))
    .where(and(eq(lessons.id, lessonId), published(lessons), published(worlds)));
  if (!row) return null;

  const activityRows = await db
    .select()
    .from(activities)
    .where(
      and(
        eq(activities.lessonId, lessonId),
        eq(activities.status, 'published'),
        isNull(activities.deletedAt),
      ),
    )
    .orderBy(asc(activities.position), asc(activities.createdAt));
  const activityIds = activityRows.map((a) => a.id);

  const questionRows = activityIds.length
    ? await db
        .select()
        .from(questions)
        .where(inArray(questions.activityId, activityIds))
        .orderBy(asc(questions.position), asc(questions.createdAt))
    : [];
  const questionIds = questionRows.map((q) => q.id);
  const optionRows = questionIds.length
    ? await db
        .select()
        .from(questionOptions)
        .where(inArray(questionOptions.questionId, questionIds))
        .orderBy(asc(questionOptions.position))
    : [];

  return {
    id: row.lesson.id,
    worldId: row.world.id,
    courseId: row.world.courseId,
    title: row.lesson.title,
    summary: row.lesson.summary,
    icon: row.lesson.icon,
    estimatedMinutes: row.lesson.estimatedMinutes,
    xpReward: row.lesson.xpReward,
    world: {
      id: row.world.id,
      title: row.world.title,
      icon: row.world.icon,
      color: row.world.color,
    },
    activities: activityRows.map((a) => ({
      id: a.id,
      step: a.step,
      type: a.type,
      title: a.title,
      config: a.config,
      isScored: a.isScored,
      xpReward: a.xpReward,
      position: a.position,
      questions: questionRows
        .filter((q) => q.activityId === a.id)
        .map((q) => ({
          id: q.id,
          kind: q.kind,
          prompt: q.prompt,
          media: q.media,
          hint: q.hint,
          explanation: q.explanation,
          difficulty: q.difficulty,
          config: q.config,
          publicConfig: q.publicConfig,
          options: optionRows
            .filter((o) => o.questionId === q.id)
            .map((o) => ({
              id: o.id,
              label: o.label,
              media: o.media,
              groupKey: o.groupKey,
              isCorrect: o.isCorrect,
              matchKey: o.matchKey,
              correctOrder: o.correctOrder,
            })),
        })),
    })),
  };
}

// ---------- Sanitising: the ONLY way lesson content leaves the server ----------

const publicOption = (o: FullQuestion['options'][number]): PlayOption => ({
  id: o.id,
  label: o.label,
  media: o.media,
  groupKey: o.groupKey,
});

/** Shuffles options so their order never gives the answer away. Stable per student + question. */
function playOptions(question: FullQuestion, seed: string): PlayOption[] {
  if (question.kind === 'matching') {
    const lefts = question.options.filter((o) => o.groupKey === 'left');
    let rights = seededShuffle(
      question.options.filter((o) => o.groupKey === 'right'),
      `${seed}:right`,
    );
    // Don't line every answer up with its partner.
    if (rights.length > 1 && rights.every((r, i) => r.matchKey === lefts[i]?.matchKey)) {
      rights = [...rights.slice(1), rights[0]!];
    }
    return [...seededShuffle(lefts, `${seed}:left`), ...rights].map(publicOption);
  }

  if (question.kind === 'categorize') {
    // Buckets (folders, groups) keep their authored order; the items to sort get shuffled.
    const buckets = question.options.filter((o) => o.groupKey === 'bucket');
    const items = seededShuffle(
      question.options.filter((o) => o.groupKey === 'item'),
      seed,
    );
    return [...buckets, ...items].map(publicOption);
  }

  if (question.kind === 'prompt_builder') {
    // Parts stay in order (role, task, context, format); choices inside each part are shuffled.
    const parts = [...new Set(question.options.map((o) => o.groupKey))];
    return parts
      .flatMap((part) =>
        seededShuffle(
          question.options.filter((o) => o.groupKey === part),
          `${seed}:${part}`,
        ),
      )
      .map(publicOption);
  }

  if (question.kind === 'memory') {
    // The game itself shows which cards belong together (they stay face up), so the phone gets
    // a pair code — a hash, so the stored match keys and their order are not visible.
    return seededShuffle(question.options, seed).map((o) => ({
      ...publicOption(o),
      groupKey: createHash('sha256').update(`${seed}:${o.matchKey}`).digest('hex').slice(0, 10),
    }));
  }

  let shuffled = seededShuffle(question.options, seed);
  if (question.kind === 'ordering' && shuffled.length > 1) {
    const solved = shuffled.every((o, i) => o.correctOrder === i + 1);
    if (solved) shuffled = [...shuffled.slice(1), shuffled[0]!];
  }
  if (question.kind === 'word_builder' && shuffled.length > 1) {
    // Never hand out the tiles already spelling the answer.
    const answer = String(question.config.answer ?? '');
    const spelled = (list: typeof shuffled, gap: string) =>
      list.map((o) => o.label.en).join(gap) === answer;
    if (spelled(shuffled, '') || spelled(shuffled, ' ')) {
      shuffled = [...shuffled.slice(1), shuffled[0]!];
    }
  }
  return shuffled.map(publicOption);
}

/**
 * The ONLY way lesson content leaves the server.
 * @param viewerId seeds option order and generated numbers (per student)
 * @param round times the lesson was finished: replays get new generated numbers
 */
export function toPlayActivity(
  activity: FullActivity,
  viewerId: string,
  round: number,
): PlayActivity {
  return {
    id: activity.id,
    step: activity.step,
    type: activity.type,
    title: activity.title,
    config: activity.config,
    isScored: activity.isScored,
    xpReward: activity.xpReward,
    position: activity.position,
    questions: activity.questions.map((q) => {
      if (q.kind === 'generated') {
        // Practice maths: the phone sees an ordinary number question with this round's numbers.
        const instance = generatedInstance(q, viewerId, round);
        return {
          id: q.id,
          kind: 'number',
          prompt: instance.prompt,
          media: q.media,
          hint: instance.hint,
          difficulty: q.difficulty,
          options: [],
          data: { ...q.publicConfig, generated: true },
        };
      }
      return {
        id: q.id,
        kind: q.kind,
        prompt: q.prompt,
        media: q.media,
        hint: q.hint,
        difficulty: q.difficulty,
        // explanation is withheld until the student has answered correctly (or it is revealed).
        options: playOptions(q, `${viewerId}:${q.id}`),
        data: q.publicConfig,
      };
    }),
  };
}

/** Re-creates a generated question for a viewer and round (used to show it AND to check it). */
export function generatedInstance(question: FullQuestion, viewerId: string, round: number) {
  const generator = question.config.generator;
  if (!isGenerator(generator)) throw new Error(`Question ${question.id} has no valid generator`);
  return generateQuestion(
    generator,
    question.difficulty,
    generatedSeed(viewerId, question.id, round),
  );
}
