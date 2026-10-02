import { and, count, eq, inArray, isNotNull, or, sql, sum } from 'drizzle-orm';
import type { Redis } from 'ioredis';
import {
  feedbackMode,
  ErrorCode,
  type ActivityCompleteResult,
  type AnswerRequest,
  type AnswerResult,
  type LessonCompleteResult,
  type CreationRequest,
  type LessonPlay,
  type NewAward,
  type PlayActivity,
} from '@itstarter/shared';
import type { Database, DbExecutor } from '../../db/client';
import {
  activities,
  lessons,
  studentActivityAttempts,
  studentCreations,
  studentDailyActivity,
  studentLessonProgress,
  studentProgress,
  students,
  xpTransactions,
} from '../../db/schema';
import { checkAnswer, InvalidAnswerError, UnsupportedQuestionError } from '../../engine/checkers';
import { levelFor } from '../../engine/levels';
import { advanceStreak, localDate } from '../../engine/streak';
import { studentDashboardKey, type Cache } from '../../lib/cache';
import { AppError } from '../../lib/errors';
import { FixedWindowLimiter } from '../../lib/rate-limiter';
import type { SessionUser } from '../auth/sessions';
import { published, type ContentService } from '../content/service';
import { evaluateAwards } from '../gamification/awards';
import { awardXp } from '../gamification/xp';
import { percent } from '../progress/service';
import {
  generatedInstance,
  loadFullLesson,
  toPlayActivity,
  type FullActivity,
  type FullLesson,
  type FullQuestion,
} from './content';

/** After this many wrong tries the answer and explanation are shown, so nobody gets stuck. */
export const REVEAL_AFTER_WRONG_ATTEMPTS = 2;
/** Generous: a fast student answers maybe one question every few seconds. */
const ANSWER_LIMIT = { limit: 60, windowSeconds: 60 };
const MAX_SECONDS_PER_LESSON = 60 * 60;
/** A lesson's total time stops growing here (a tab left open for days is not learning). */
const MAX_SECONDS_PER_LESSON_TOTAL = 20 * 60 * 60;

interface Logger {
  warn(obj: object, msg: string): void;
}

export class LearningService {
  private readonly answerLimiter: FixedWindowLimiter;

  constructor(
    private readonly db: Database,
    redis: Redis,
    private readonly cache: Cache,
    private readonly content: ContentService,
    private readonly log: Logger,
  ) {
    this.answerLimiter = new FixedWindowLimiter(
      redis,
      'answers',
      ANSWER_LIMIT.limit,
      ANSWER_LIMIT.windowSeconds,
    );
  }

  // ---------- Reading ----------

  async lessonForPlay(user: SessionUser, lessonId: string): Promise<LessonPlay> {
    const lesson = await loadFullLesson(this.db, this.cache, lessonId);
    const isStudent = user.role === 'STUDENT';
    const progress = isStudent ? await this.lessonProgress(user.id, lesson) : null;
    const round = isStudent ? await this.round(user.id, lesson.id) : 0;
    return {
      id: lesson.id,
      title: lesson.title,
      summary: lesson.summary,
      icon: lesson.icon,
      estimatedMinutes: lesson.estimatedMinutes,
      xpReward: lesson.xpReward,
      world: lesson.world,
      activities: lesson.activities.map((a) => toPlayActivity(a, user.id, round)),
      nextLessonId: await this.nextLessonId(lesson),
      progress,
    };
  }

  async activityForPlay(user: SessionUser, activityId: string): Promise<PlayActivity> {
    const { lesson, activity } = await this.findActivity(activityId);
    const round = user.role === 'STUDENT' ? await this.round(user.id, lesson.id) : 0;
    return toPlayActivity(activity, user.id, round);
  }

  // ---------- Writing (students only) ----------

  async startLesson(user: SessionUser, lessonId: string): Promise<{ status: string }> {
    await loadFullLesson(this.db, this.cache, lessonId); // 404 unless published
    const [row] = await this.db
      .insert(studentLessonProgress)
      .values({ studentId: user.id, lessonId, attempts: 1 })
      .onConflictDoUpdate({
        target: [studentLessonProgress.studentId, studentLessonProgress.lessonId],
        set: { attempts: sql`${studentLessonProgress.attempts} + 1` },
      })
      .returning({ status: studentLessonProgress.status });
    await this.cache.delete(studentDashboardKey(user.id));
    return { status: row!.status };
  }

  async answer(
    user: SessionUser,
    activityId: string,
    request: AnswerRequest,
  ): Promise<AnswerResult> {
    await this.checkAnswerRate(user.id);
    const { lesson, activity } = await this.findActivity(activityId);
    const question = activity.questions.find((q) => q.id === request.questionId);
    if (!question)
      throw AppError.notFound('QUESTION_NOT_FOUND', 'Question not found in this activity');

    // Generated maths: re-create this student's numbers for this round, then check as a number.
    let checkable: FullQuestion = question;
    let explanation = question.explanation;
    if (question.kind === 'generated') {
      const instance = generatedInstance(question, user.id, await this.round(user.id, lesson.id));
      checkable = { ...question, kind: 'number', config: { answer: instance.answer } };
      explanation = instance.explanation;
    }

    let check;
    try {
      check = checkAnswer(checkable, request.answer);
    } catch (err) {
      if (err instanceof InvalidAnswerError) {
        throw new AppError(
          400,
          ErrorCode.VALIDATION_ERROR,
          'That answer is not in the expected format.',
        );
      }
      if (err instanceof UnsupportedQuestionError) {
        this.log.warn(
          { questionId: question.id, reason: err.message },
          'Question cannot be checked',
        );
        throw new AppError(422, 'QUESTION_NOT_CHECKABLE', 'This question cannot be checked yet.');
      }
      throw err;
    }

    const result = await this.db.transaction(async (tx) => {
      await lockStudent(tx, user.id);
      const wasComplete = await this.isActivityComplete(tx, user.id, activity);
      const [previous] = await tx
        .select({
          wrong:
            sql<number>`count(*) filter (where ${studentActivityAttempts.isCorrect} = false)`.mapWith(
              Number,
            ),
          right:
            sql<number>`count(*) filter (where ${studentActivityAttempts.isCorrect} = true)`.mapWith(
              Number,
            ),
        })
        .from(studentActivityAttempts)
        .where(
          and(
            eq(studentActivityAttempts.studentId, user.id),
            eq(studentActivityAttempts.questionId, question.id),
          ),
        );
      const alreadySolved = (previous?.right ?? 0) > 0;

      await tx.insert(studentActivityAttempts).values({
        studentId: user.id,
        activityId,
        questionId: question.id,
        answer: request.answer ?? null,
        isCorrect: check.correct,
        score:
          check.score ??
          (check.partial
            ? Math.round((check.partial.correct / check.partial.total) * 100)
            : check.correct
              ? 100
              : 0),
        durationMs: request.durationMs ?? null,
      });

      const reveal =
        !check.correct &&
        (feedbackMode(activity.config) === 'reveal' ||
          (!alreadySolved && (previous?.wrong ?? 0) + 1 >= REVEAL_AFTER_WRONG_ATTEMPTS));
      const nowComplete = await this.isActivityComplete(tx, user.id, activity);
      const newlyCompleted = nowComplete && !wasComplete;

      const xpAwarded = newlyCompleted
        ? await awardXp(tx, user.id, 'activity', activity.id, activity.xpReward)
        : 0;
      await this.markPosition(tx, user.id, lesson.id, activity.position);
      await recordDailyActivity(tx, user.id, { xp: xpAwarded, activities: newlyCompleted ? 1 : 0 });
      const totalXp = await currentXp(tx, user.id);

      return {
        correct: check.correct,
        partial: check.partial,
        explanation: check.correct || reveal ? explanation : null,
        revealed: reveal ? check.correctAnswer : null,
        activityCompleted: nowComplete,
        xpAwarded,
        totalXp,
      } satisfies AnswerResult;
    });

    await this.cache.delete(studentDashboardKey(user.id));
    return result;
  }

  /** For content steps (welcome, learn, see, ...): "I've read this". */
  async completeActivity(user: SessionUser, activityId: string): Promise<ActivityCompleteResult> {
    const { lesson, activity } = await this.findActivity(activityId);
    if (activity.isScored) {
      throw new AppError(
        400,
        ErrorCode.VALIDATION_ERROR,
        'This activity is completed by answering its questions.',
      );
    }
    if (activity.type === 'creation') {
      throw new AppError(
        400,
        ErrorCode.VALIDATION_ERROR,
        'Save your work to finish this activity.',
      );
    }
    return this.markViewed(user, lesson, activity);
  }

  /** Saves creative work (My Profile, My Dream, my prompt...) and completes the activity. */
  async saveCreation(
    user: SessionUser,
    activityId: string,
    request: CreationRequest,
  ): Promise<ActivityCompleteResult> {
    const { lesson, activity } = await this.findActivity(activityId);
    if (activity.type !== 'creation') {
      throw new AppError(400, ErrorCode.VALIDATION_ERROR, 'This activity does not save work.');
    }
    const content = validateCreation(activity, request.content);
    await this.db
      .insert(studentCreations)
      .values({ studentId: user.id, activityId, content })
      .onConflictDoUpdate({
        target: [studentCreations.studentId, studentCreations.activityId],
        set: { content },
      });
    return this.markViewed(user, lesson, activity);
  }

  private async markViewed(
    user: SessionUser,
    lesson: FullLesson,
    activity: FullActivity,
  ): Promise<ActivityCompleteResult> {
    const activityId = activity.id;
    const result = await this.db.transaction(async (tx) => {
      await lockStudent(tx, user.id);
      const before = await this.isActivityComplete(tx, user.id, activity);
      if (!before) {
        await tx.insert(studentActivityAttempts).values({
          studentId: user.id,
          activityId,
          answer: { viewed: true },
          isCorrect: null,
        });
      }
      const xpAwarded = before
        ? 0
        : await awardXp(tx, user.id, 'activity', activity.id, activity.xpReward);
      await this.markPosition(tx, user.id, lesson.id, activity.position);
      await recordDailyActivity(tx, user.id, { xp: xpAwarded, activities: before ? 0 : 1 });
      return { activityCompleted: true as const, xpAwarded, totalXp: await currentXp(tx, user.id) };
    });

    await this.cache.delete(studentDashboardKey(user.id));
    return result;
  }

  /**
   * Active learning time, reported by the phone every minute or so while a lesson is open
   * (only while visible and in use). Counts even if the lesson is never finished.
   */
  async recordLessonTime(user: SessionUser, lessonId: string, seconds: number): Promise<void> {
    await this.checkAnswerRate(user.id);
    await loadFullLesson(this.db, this.cache, lessonId); // 404 unless published
    await this.db.transaction(async (tx) => {
      await tx
        .insert(studentLessonProgress)
        .values({ studentId: user.id, lessonId, timeSpentSeconds: seconds })
        .onConflictDoUpdate({
          target: [studentLessonProgress.studentId, studentLessonProgress.lessonId],
          set: {
            timeSpentSeconds: sql`least(${studentLessonProgress.timeSpentSeconds} + ${seconds}, ${MAX_SECONDS_PER_LESSON_TOTAL})`,
          },
        });
      await recordDailyActivity(tx, user.id, { seconds });
    });
  }

  async completeLesson(
    user: SessionUser,
    lessonId: string,
    timeSpentSeconds = 0,
  ): Promise<LessonCompleteResult> {
    const lesson = await loadFullLesson(this.db, this.cache, lessonId);
    const levels = await this.content.levels();
    const seconds = Math.min(timeSpentSeconds, MAX_SECONDS_PER_LESSON);

    const result = await this.db.transaction(async (tx) => {
      await lockStudent(tx, user.id);
      const completed = await this.completedActivityIds(tx, user.id, lesson);
      const missing = lesson.activities
        .filter((a) => a.isScored && !completed.has(a.id))
        .map((a) => a.id);
      if (missing.length > 0) {
        throw new AppError(409, ErrorCode.LESSON_INCOMPLETE, 'Finish all the activities first.', {
          missingActivityIds: missing,
        });
      }

      // Lock this student's progress row so two quick taps can't both count as "first".
      const [existing] = await tx
        .select()
        .from(studentLessonProgress)
        .where(
          and(
            eq(studentLessonProgress.studentId, user.id),
            eq(studentLessonProgress.lessonId, lessonId),
          ),
        )
        .for('update');
      const firstCompletion = existing?.status !== 'completed';
      const score = await this.firstTryScore(tx, user.id, lesson);
      const now = new Date();

      await tx
        .insert(studentLessonProgress)
        .values({
          studentId: user.id,
          lessonId,
          status: 'completed',
          attempts: 1,
          bestScore: score,
          timeSpentSeconds: seconds,
          completedAt: now,
          completions: 1,
          currentPosition: lesson.activities.at(-1)?.position ?? 0,
        })
        .onConflictDoUpdate({
          target: [studentLessonProgress.studentId, studentLessonProgress.lessonId],
          set: {
            status: 'completed',
            bestScore: sql`greatest(coalesce(${studentLessonProgress.bestScore}, 0), ${score ?? 0})`,
            timeSpentSeconds: sql`${studentLessonProgress.timeSpentSeconds} + ${seconds}`,
            completedAt: sql`coalesce(${studentLessonProgress.completedAt}, ${now})`,
            completions: sql`${studentLessonProgress.completions} + 1`,
          },
        });

      const xpAwarded = await awardXp(tx, user.id, 'lesson', lessonId, lesson.xpReward);
      const streak = await recordDailyActivity(tx, user.id, {
        xp: xpAwarded,
        lessons: firstCompletion ? 1 : 0,
        seconds,
      });
      const worldPercent = await refreshWorldProgress(tx, user.id, lesson.worldId);

      // Badges and achievements (bonus XP counts towards today's XP too).
      const newAwards: NewAward[] = await evaluateAwards(tx, user.id);
      const bonus = newAwards.reduce((n, a) => n + a.xpBonus, 0);
      if (bonus > 0) await recordDailyActivity(tx, user.id, { xp: bonus });

      // Level-ups are announced here, on the reward screen.
      const [student] = await tx.select().from(students).where(eq(students.userId, user.id));
      const status = levelFor(student!.xpTotal, levels);
      const levelUp = status.current.number > student!.level;
      if (levelUp) {
        await tx
          .update(students)
          .set({ level: status.current.number })
          .where(eq(students.userId, user.id));
      }

      const activityIds = lesson.activities.map((a) => a.id);
      const [earned] = await tx
        .select({ total: sum(xpTransactions.amount).mapWith(Number) })
        .from(xpTransactions)
        .where(
          and(
            eq(xpTransactions.studentId, user.id),
            or(
              and(eq(xpTransactions.sourceType, 'lesson'), eq(xpTransactions.sourceId, lessonId)),
              activityIds.length
                ? and(
                    eq(xpTransactions.sourceType, 'activity'),
                    inArray(xpTransactions.sourceId, activityIds),
                  )
                : undefined,
            ),
          ),
        );

      return {
        firstCompletion,
        xpAwarded,
        lessonXpTotal: earned?.total ?? 0,
        totalXp: student!.xpTotal,
        level: {
          ...status.current,
          next: status.next,
          xpToNext: status.xpToNext,
          percentToNext: status.percentToNext,
        },
        levelUp,
        streak,
        worldPercent,
        nextLessonId: null as string | null,
        newAwards,
      };
    });

    await this.cache.delete(studentDashboardKey(user.id));
    return { ...result, nextLessonId: await this.nextLessonId(lesson) };
  }

  // ---------- Helpers ----------

  private async checkAnswerRate(studentId: string) {
    try {
      const status = await this.answerLimiter.hit(studentId);
      if (!status.allowed) {
        throw new AppError(429, ErrorCode.RATE_LIMITED, 'Slow down a little!', {
          retryAfterSeconds: status.retryAfterSeconds,
        });
      }
    } catch (err) {
      if (err instanceof AppError) throw err;
      // Redis down: answering is low-risk (XP can't be duplicated), so fail open.
    }
  }

  private async findActivity(
    activityId: string,
  ): Promise<{ lesson: FullLesson; activity: FullActivity }> {
    const [row] = await this.db
      .select({ lessonId: activities.lessonId })
      .from(activities)
      .innerJoin(lessons, eq(lessons.id, activities.lessonId))
      .where(
        and(eq(activities.id, activityId), eq(activities.status, 'published'), published(lessons)),
      );
    if (!row) throw AppError.notFound('ACTIVITY_NOT_FOUND', 'Activity not found');
    const lesson = await loadFullLesson(this.db, this.cache, row.lessonId);
    const activity = lesson.activities.find((a) => a.id === activityId);
    if (!activity) throw AppError.notFound('ACTIVITY_NOT_FOUND', 'Activity not found');
    return { lesson, activity };
  }

  /**
   * Scored: every question done (see doneQuestionIds). Unscored: viewed.
   */
  private async isActivityComplete(
    tx: DbExecutor,
    studentId: string,
    activity: FullActivity,
  ): Promise<boolean> {
    if (!activity.isScored) {
      const [row] = await tx
        .select({ n: count() })
        .from(studentActivityAttempts)
        .where(
          and(
            eq(studentActivityAttempts.studentId, studentId),
            eq(studentActivityAttempts.activityId, activity.id),
          ),
        );
      return (row?.n ?? 0) > 0;
    }
    const done = await this.doneQuestionIds(tx, studentId, [activity]);
    return activity.questions.length > 0 && activity.questions.every((q) => done.has(q.id));
  }

  /**
   * Questions the student is finished with: answered correctly at least once, or — in
   * "reveal" activities — answered at all (the right answer was shown straight away).
   */
  private async doneQuestionIds(
    tx: DbExecutor,
    studentId: string,
    activityList: Pick<FullActivity, 'id' | 'config'>[],
  ): Promise<Set<string>> {
    if (activityList.length === 0) return new Set();
    const revealIds = activityList
      .filter((a) => feedbackMode(a.config) === 'reveal')
      .map((a) => a.id);
    const rows = await tx
      .selectDistinct({ questionId: studentActivityAttempts.questionId })
      .from(studentActivityAttempts)
      .where(
        and(
          eq(studentActivityAttempts.studentId, studentId),
          inArray(
            studentActivityAttempts.activityId,
            activityList.map((a) => a.id),
          ),
          isNotNull(studentActivityAttempts.questionId),
          revealIds.length > 0
            ? or(
                eq(studentActivityAttempts.isCorrect, true),
                inArray(studentActivityAttempts.activityId, revealIds),
              )
            : eq(studentActivityAttempts.isCorrect, true),
        ),
      );
    return new Set(rows.map((r) => r.questionId!));
  }

  private async completedActivityIds(
    tx: DbExecutor,
    studentId: string,
    lesson: FullLesson,
  ): Promise<Set<string>> {
    const ids = lesson.activities.map((a) => a.id);
    const solved = await this.doneQuestionIds(tx, studentId, lesson.activities);
    const viewed = ids.length
      ? await tx
          .selectDistinct({ activityId: studentActivityAttempts.activityId })
          .from(studentActivityAttempts)
          .where(
            and(
              eq(studentActivityAttempts.studentId, studentId),
              inArray(studentActivityAttempts.activityId, ids),
            ),
          )
      : [];
    const viewedSet = new Set(viewed.map((v) => v.activityId));
    return new Set(
      lesson.activities
        .filter((a) =>
          a.isScored
            ? a.questions.length > 0 && a.questions.every((q) => solved.has(q.id))
            : viewedSet.has(a.id),
        )
        .map((a) => a.id),
    );
  }

  private async lessonProgress(
    studentId: string,
    lesson: FullLesson,
  ): Promise<LessonPlay['progress']> {
    const [row] = await this.db
      .select({ status: studentLessonProgress.status })
      .from(studentLessonProgress)
      .where(
        and(
          eq(studentLessonProgress.studentId, studentId),
          eq(studentLessonProgress.lessonId, lesson.id),
        ),
      );
    const completed = await this.completedActivityIds(this.db, studentId, lesson);
    const solved = await this.doneQuestionIds(this.db, studentId, lesson.activities);
    const creationIds = lesson.activities.filter((a) => a.type === 'creation').map((a) => a.id);
    const creations = creationIds.length
      ? await this.db
          .select({ activityId: studentCreations.activityId, content: studentCreations.content })
          .from(studentCreations)
          .where(
            and(
              eq(studentCreations.studentId, studentId),
              inArray(studentCreations.activityId, creationIds),
            ),
          )
      : [];
    return {
      status: row?.status ?? 'not_started',
      completedActivityIds: [...completed],
      solvedQuestionIds: [...solved],
      creations: Object.fromEntries(
        creations.map((c) => [c.activityId, c.content as Record<string, string>]),
      ),
    };
  }

  /** Average % of questions answered correctly on the FIRST try (null if nothing is scored). */
  private async firstTryScore(
    tx: DbExecutor,
    studentId: string,
    lesson: FullLesson,
  ): Promise<number | null> {
    const scored = lesson.activities.filter((a) => a.isScored);
    if (scored.length === 0) return null;
    const rows = await tx.execute<{ is_correct: boolean }>(sql`
      select distinct on (${studentActivityAttempts.questionId}) ${studentActivityAttempts.isCorrect} as is_correct
      from ${studentActivityAttempts}
      where ${studentActivityAttempts.studentId} = ${studentId}
        and ${inArray(
          studentActivityAttempts.activityId,
          scored.map((a) => a.id),
        )}
        and ${studentActivityAttempts.questionId} is not null
      order by ${studentActivityAttempts.questionId}, ${studentActivityAttempts.createdAt}`);
    if (rows.rows.length === 0) return null;
    return Math.round((rows.rows.filter((r) => r.is_correct).length / rows.rows.length) * 100);
  }

  /** How many times the student finished this lesson: seeds generated questions. */
  private async round(studentId: string, lessonId: string): Promise<number> {
    const [row] = await this.db
      .select({ completions: studentLessonProgress.completions })
      .from(studentLessonProgress)
      .where(
        and(
          eq(studentLessonProgress.studentId, studentId),
          eq(studentLessonProgress.lessonId, lessonId),
        ),
      );
    return row?.completions ?? 0;
  }

  private async markPosition(
    tx: DbExecutor,
    studentId: string,
    lessonId: string,
    position: number,
  ) {
    await tx
      .insert(studentLessonProgress)
      .values({ studentId, lessonId, attempts: 1, currentPosition: position })
      .onConflictDoUpdate({
        target: [studentLessonProgress.studentId, studentLessonProgress.lessonId],
        set: {
          currentPosition: sql`greatest(${studentLessonProgress.currentPosition}, ${position})`,
        },
      });
  }

  private async nextLessonId(lesson: FullLesson): Promise<string | null> {
    const course = await this.content.courseStructure(lesson.courseId);
    const ordered = course.worlds.flatMap((w) => w.lessons.map((l) => l.id));
    const index = ordered.indexOf(lesson.id);
    return index >= 0 ? (ordered[index + 1] ?? null) : null;
  }
}

// ---------- Transaction helpers (exported for tests) ----------

/**
 * Serialises one student's learning writes (two quick taps, two tabs): everything that changes
 * their XP/progress takes this row lock first. Other students are not affected.
 */
async function lockStudent(tx: DbExecutor, studentId: string): Promise<void> {
  const [row] = await tx
    .select({ id: students.userId })
    .from(students)
    .where(eq(students.userId, studentId))
    .for('update');
  if (!row) throw AppError.notFound('STUDENT_NOT_FOUND', 'Student profile not found');
}

async function currentXp(tx: DbExecutor, studentId: string): Promise<number> {
  const [row] = await tx
    .select({ xp: students.xpTotal })
    .from(students)
    .where(eq(students.userId, studentId));
  return row?.xp ?? 0;
}

/** Updates today's activity row and the streak. Returns the current streak. */
export async function recordDailyActivity(
  tx: DbExecutor,
  studentId: string,
  delta: { xp?: number; activities?: number; lessons?: number; seconds?: number },
): Promise<number> {
  const [student] = await tx
    .select()
    .from(students)
    .where(eq(students.userId, studentId))
    .for('update');
  if (!student) throw AppError.notFound('STUDENT_NOT_FOUND', 'Student profile not found');
  const today = localDate(new Date(), student.timezone);

  await tx
    .insert(studentDailyActivity)
    .values({
      studentId,
      day: today,
      xpEarned: delta.xp ?? 0,
      activitiesCompleted: delta.activities ?? 0,
      lessonsCompleted: delta.lessons ?? 0,
      secondsActive: delta.seconds ?? 0,
    })
    .onConflictDoUpdate({
      target: [studentDailyActivity.studentId, studentDailyActivity.day],
      set: {
        xpEarned: sql`${studentDailyActivity.xpEarned} + ${delta.xp ?? 0}`,
        activitiesCompleted: sql`${studentDailyActivity.activitiesCompleted} + ${delta.activities ?? 0}`,
        lessonsCompleted: sql`${studentDailyActivity.lessonsCompleted} + ${delta.lessons ?? 0}`,
        secondsActive: sql`${studentDailyActivity.secondsActive} + ${delta.seconds ?? 0}`,
      },
    });

  const next = advanceStreak(
    {
      current: student.currentStreak,
      longest: student.longestStreak,
      lastActiveDate: student.lastActiveDate,
    },
    today,
  );
  if (next.lastActiveDate !== student.lastActiveDate || next.current !== student.currentStreak) {
    await tx
      .update(students)
      .set({
        currentStreak: next.current,
        longestStreak: next.longest,
        lastActiveDate: next.lastActiveDate,
      })
      .where(eq(students.userId, studentId));
  }
  return next.current;
}

/** Recomputes the per-world summary row used by dashboards and analytics. Returns the %. */
async function refreshWorldProgress(
  tx: DbExecutor,
  studentId: string,
  worldId: string,
): Promise<number> {
  const [totals] = await tx
    .select({
      total: count(),
      done: sql<number>`count(${studentLessonProgress.lessonId}) filter (where ${studentLessonProgress.status} = 'completed')`.mapWith(
        Number,
      ),
    })
    .from(lessons)
    .leftJoin(
      studentLessonProgress,
      and(
        eq(studentLessonProgress.lessonId, lessons.id),
        eq(studentLessonProgress.studentId, studentId),
      ),
    )
    .where(and(eq(lessons.worldId, worldId), published(lessons)));
  const total = totals?.total ?? 0;
  const done = totals?.done ?? 0;
  const value = percent(done, total);
  await tx
    .insert(studentProgress)
    .values({
      studentId,
      worldId,
      lessonsCompleted: done,
      lessonsTotal: total,
      percent: value,
      lastActivityAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [studentProgress.studentId, studentProgress.worldId],
      set: {
        lessonsCompleted: done,
        lessonsTotal: total,
        percent: value,
        lastActivityAt: new Date(),
      },
    });
  return value;
}

interface CreationField {
  key: string;
  maxLength?: number;
  required?: boolean;
}

/**
 * Creative work is free text, but only for the fields the activity defines and within their
 * limits. (React escapes it when shown, so it can't inject HTML.)
 */
function validateCreation(
  activity: FullActivity,
  content: Record<string, string>,
): Record<string, string> {
  const fields = (activity.config.fields ?? []) as CreationField[];
  const allowed = new Map(fields.map((f) => [f.key, f]));
  const clean: Record<string, string> = {};
  for (const [key, raw] of Object.entries(content)) {
    const field = allowed.get(key);
    if (!field) throw new AppError(400, ErrorCode.VALIDATION_ERROR, `Unknown field: ${key}`);
    const value = raw.trim();
    if (value.length > (field.maxLength ?? 200)) {
      throw new AppError(400, ErrorCode.VALIDATION_ERROR, `${key} is too long`);
    }
    clean[key] = value;
  }
  const missing = fields.filter((f) => f.required && !clean[f.key]).map((f) => f.key);
  if (missing.length > 0) {
    throw new AppError(400, ErrorCode.VALIDATION_ERROR, 'Please fill in every field.', { missing });
  }
  return clean;
}
