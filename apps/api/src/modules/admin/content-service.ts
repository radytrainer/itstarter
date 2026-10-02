import { and, asc, eq, inArray, isNull, max, sql } from 'drizzle-orm';
import type { z } from 'zod';
import {
  ErrorCode,
  type activityInputSchema,
  type activityPatchSchema,
  type badgeInputSchema,
  type courseInputSchema,
  type lessonInputSchema,
  type lessonPatchSchema,
  type QuestionInput,
  type worldInputSchema,
} from '@itstarter/shared';
import type { Database, DbExecutor } from '../../db/client';
import {
  activities,
  badges,
  courses,
  lessons,
  questionOptions,
  questions,
  worlds,
} from '../../db/schema';
import { validateQuestion } from '../../engine/validate-question';
import type { Cache } from '../../lib/cache';
import { AppError } from '../../lib/errors';
import type { SessionUser } from '../auth/sessions';
import { audit, isUniqueViolation } from './audit';

type CourseInput = z.infer<typeof courseInputSchema>;
type WorldInput = z.infer<typeof worldInputSchema>;
type LessonInput = z.infer<typeof lessonInputSchema>;
type ActivityInput = z.infer<typeof activityInputSchema>;
type BadgeInput = z.infer<typeof badgeInputSchema>;

const notFound = (what: string) =>
  AppError.notFound(`${what.toUpperCase()}_NOT_FOUND`, `${what} not found`);

/**
 * Content management for admins. Every change:
 * - is validated (questions must be answerable),
 * - is written to the audit log,
 * - bumps the content cache version so students see it on their next request.
 * Deleting is soft (deleted_at), so student history and analytics keep working.
 */
export class AdminContentService {
  constructor(
    private readonly db: Database,
    private readonly cache: Cache,
  ) {}

  /** Runs a change in a transaction, audits it, refreshes caches, and turns duplicate slugs into 409s. */
  private async write<T>(
    actor: SessionUser,
    action: string,
    entityType: string,
    change: (
      tx: DbExecutor,
    ) => Promise<{ result: T; entityId: string | null; metadata?: Record<string, unknown> }>,
  ): Promise<T> {
    try {
      const result = await this.db.transaction(async (tx) => {
        const { result, entityId, metadata } = await change(tx);
        await audit(tx, actor, action, entityType, entityId, metadata);
        return result;
      });
      await this.cache.bumpContentVersion();
      return result;
    } catch (err) {
      if (isUniqueViolation(err)) {
        throw new AppError(
          409,
          ErrorCode.CONFLICT,
          'That slug or code is already used (maybe by a deleted item). Choose another.',
        );
      }
      throw err;
    }
  }

  // ---------- Courses ----------

  listCourses() {
    return this.db
      .select({
        id: courses.id,
        slug: courses.slug,
        title: courses.title,
        description: courses.description,
        status: courses.status,
        worlds:
          sql<number>`(select count(*) from ${worlds} where ${worlds.courseId} = ${courses.id} and ${worlds.deletedAt} is null)`.mapWith(
            Number,
          ),
      })
      .from(courses)
      .where(isNull(courses.deletedAt))
      .orderBy(asc(courses.createdAt));
  }

  createCourse(actor: SessionUser, input: CourseInput) {
    return this.write(actor, 'course.created', 'course', async (tx) => {
      const [row] = await tx
        .insert(courses)
        .values({
          ...input,
          status: input.status ?? 'draft',
          publishedAt: input.status === 'published' ? new Date() : null,
        })
        .returning();
      return { result: row!, entityId: row!.id };
    });
  }

  updateCourse(actor: SessionUser, id: string, patch: Partial<CourseInput>) {
    return this.write(actor, 'course.updated', 'course', async (tx) => {
      const [row] = await tx
        .update(courses)
        .set({
          ...patch,
          ...(patch.status === 'published'
            ? { publishedAt: sql`coalesce(${courses.publishedAt}, now())` }
            : {}),
        })
        .where(and(eq(courses.id, id), isNull(courses.deletedAt)))
        .returning();
      if (!row) throw notFound('Course');
      return { result: row, entityId: id, metadata: { fields: Object.keys(patch) } };
    });
  }

  deleteCourse(actor: SessionUser, id: string) {
    return this.softDelete(actor, courses, id, 'course');
  }

  // ---------- Worlds ----------

  async listWorlds(courseId: string) {
    await this.requireRow(courses, courseId, 'Course');
    return this.db
      .select({
        world: worlds,
        lessons:
          sql<number>`(select count(*) from ${lessons} where ${lessons.worldId} = ${worlds.id} and ${lessons.deletedAt} is null)`.mapWith(
            Number,
          ),
      })
      .from(worlds)
      .where(and(eq(worlds.courseId, courseId), isNull(worlds.deletedAt)))
      .orderBy(asc(worlds.position), asc(worlds.createdAt))
      .then((rows) => rows.map((r) => ({ ...r.world, lessons: r.lessons })));
  }

  async createWorld(actor: SessionUser, courseId: string, input: WorldInput) {
    await this.requireRow(courses, courseId, 'Course');
    return this.write(actor, 'world.created', 'world', async (tx) => {
      const position = await nextPosition(tx, worlds, worlds.courseId, courseId);
      const [row] = await tx
        .insert(worlds)
        .values({ ...input, courseId, position, status: input.status ?? 'draft' })
        .returning();
      return { result: row!, entityId: row!.id };
    });
  }

  updateWorld(actor: SessionUser, id: string, patch: Partial<WorldInput>) {
    return this.write(actor, 'world.updated', 'world', async (tx) => {
      const [row] = await tx
        .update(worlds)
        .set(patch)
        .where(and(eq(worlds.id, id), isNull(worlds.deletedAt)))
        .returning();
      if (!row) throw notFound('World');
      return { result: row, entityId: id, metadata: { fields: Object.keys(patch) } };
    });
  }

  deleteWorld(actor: SessionUser, id: string) {
    return this.softDelete(actor, worlds, id, 'world');
  }

  reorderWorlds(actor: SessionUser, courseId: string, ids: string[]) {
    return this.reorder(actor, worlds, worlds.courseId, courseId, ids, 'world');
  }

  // ---------- Lessons ----------

  async listLessons(worldId: string) {
    await this.requireRow(worlds, worldId, 'World');
    return this.db
      .select({
        lesson: lessons,
        activities:
          sql<number>`(select count(*) from ${activities} where ${activities.lessonId} = ${lessons.id} and ${activities.deletedAt} is null)`.mapWith(
            Number,
          ),
      })
      .from(lessons)
      .where(and(eq(lessons.worldId, worldId), isNull(lessons.deletedAt)))
      .orderBy(asc(lessons.position), asc(lessons.createdAt))
      .then((rows) => rows.map((r) => ({ ...r.lesson, activities: r.activities })));
  }

  /** The whole lesson for the editor, INCLUDING answers (admins only). */
  async getLesson(id: string) {
    const [lesson] = await this.db
      .select()
      .from(lessons)
      .where(and(eq(lessons.id, id), isNull(lessons.deletedAt)));
    if (!lesson) throw notFound('Lesson');
    const activityRows = await this.db
      .select()
      .from(activities)
      .where(and(eq(activities.lessonId, id), isNull(activities.deletedAt)))
      .orderBy(asc(activities.position), asc(activities.createdAt));
    const ids = activityRows.map((a) => a.id);
    const questionRows = ids.length
      ? await this.db
          .select()
          .from(questions)
          .where(inArray(questions.activityId, ids))
          .orderBy(asc(questions.position))
      : [];
    const qIds = questionRows.map((q) => q.id);
    const optionRows = qIds.length
      ? await this.db
          .select()
          .from(questionOptions)
          .where(inArray(questionOptions.questionId, qIds))
          .orderBy(asc(questionOptions.position))
      : [];
    return {
      ...lesson,
      activities: activityRows.map((a) => ({
        ...a,
        questions: questionRows
          .filter((q) => q.activityId === a.id)
          .map((q) => ({ ...q, options: optionRows.filter((o) => o.questionId === q.id) })),
      })),
    };
  }

  async createLesson(actor: SessionUser, worldId: string, input: LessonInput) {
    await this.requireRow(worlds, worldId, 'World');
    return this.write(actor, 'lesson.created', 'lesson', async (tx) => {
      const position = await nextPosition(tx, lessons, lessons.worldId, worldId);
      const [row] = await tx
        .insert(lessons)
        .values({ ...input, worldId, position, status: input.status ?? 'draft' })
        .returning();
      // Start every new lesson with the unscored steps; editors add play/challenge activities.
      const t = (en: string) => ({ en });
      await tx.insert(activities).values([
        {
          lessonId: row!.id,
          step: 'welcome',
          type: 'intro',
          position: 1,
          xpReward: 0,
          config: { emoji: '👋', message: t('Welcome! Let’s learn something new.') },
        },
        {
          lessonId: row!.id,
          step: 'learn',
          type: 'learn_card',
          position: 2,
          xpReward: 0,
          config: {
            cards: [{ emoji: '💡', title: t('Idea'), body: t('Explain one idea simply.') }],
          },
        },
        {
          lessonId: row!.id,
          step: 'see',
          type: 'see_example',
          position: 3,
          xpReward: 0,
          config: { example: 'Example', explanation: t('Show it in action.') },
        },
        {
          lessonId: row!.id,
          step: 'reward',
          type: 'reward',
          position: 99,
          xpReward: 0,
          config: { message: t('Great work! 🎉') },
        },
      ]);
      return { result: row!, entityId: row!.id };
    });
  }

  updateLesson(actor: SessionUser, id: string, patch: z.infer<typeof lessonPatchSchema>) {
    return this.write(actor, 'lesson.updated', 'lesson', async (tx) => {
      const [row] = await tx
        .update(lessons)
        .set(patch)
        .where(and(eq(lessons.id, id), isNull(lessons.deletedAt)))
        .returning();
      if (!row) throw notFound('Lesson');
      return { result: row, entityId: id, metadata: { fields: Object.keys(patch) } };
    });
  }

  deleteLesson(actor: SessionUser, id: string) {
    return this.softDelete(actor, lessons, id, 'lesson');
  }

  reorderLessons(actor: SessionUser, worldId: string, ids: string[]) {
    return this.reorder(actor, lessons, lessons.worldId, worldId, ids, 'lesson');
  }

  // ---------- Activities ----------

  async createActivity(actor: SessionUser, lessonId: string, input: ActivityInput) {
    await this.requireRow(lessons, lessonId, 'Lesson');
    return this.write(actor, 'activity.created', 'activity', async (tx) => {
      // New activities go just before the reward step.
      const [reward] = await tx
        .select({ position: activities.position })
        .from(activities)
        .where(
          and(
            eq(activities.lessonId, lessonId),
            eq(activities.step, 'reward'),
            isNull(activities.deletedAt),
          ),
        );
      const position = reward
        ? reward.position - 1
        : await nextPosition(tx, activities, activities.lessonId, lessonId);
      const [row] = await tx
        .insert(activities)
        .values({ ...input, lessonId, position, status: input.status ?? 'published' })
        .returning();
      return { result: row!, entityId: row!.id };
    });
  }

  updateActivity(actor: SessionUser, id: string, patch: z.infer<typeof activityPatchSchema>) {
    return this.write(actor, 'activity.updated', 'activity', async (tx) => {
      const [row] = await tx
        .update(activities)
        .set(patch)
        .where(and(eq(activities.id, id), isNull(activities.deletedAt)))
        .returning();
      if (!row) throw notFound('Activity');
      return { result: row, entityId: id, metadata: { fields: Object.keys(patch) } };
    });
  }

  deleteActivity(actor: SessionUser, id: string) {
    return this.softDelete(actor, activities, id, 'activity');
  }

  reorderActivities(actor: SessionUser, lessonId: string, ids: string[]) {
    return this.reorder(actor, activities, activities.lessonId, lessonId, ids, 'activity');
  }

  // ---------- Questions ----------

  async createQuestion(actor: SessionUser, activityId: string, input: QuestionInput) {
    await this.requireRow(activities, activityId, 'Activity');
    assertAnswerable(input);
    return this.write(actor, 'question.created', 'question', async (tx) => {
      const position = await nextPosition(tx, questions, questions.activityId, activityId);
      const { options, ...fields } = input;
      const [row] = await tx
        .insert(questions)
        .values({ ...fields, activityId, position })
        .returning();
      await insertOptions(tx, row!.id, options);
      return { result: row!, entityId: row!.id };
    });
  }

  async updateQuestion(actor: SessionUser, id: string, input: QuestionInput) {
    assertAnswerable(input);
    return this.write(actor, 'question.updated', 'question', async (tx) => {
      const { options, ...fields } = input;
      const [row] = await tx.update(questions).set(fields).where(eq(questions.id, id)).returning();
      if (!row) throw notFound('Question');
      // Options are replaced as a whole (attempts reference questions, not options).
      await tx.delete(questionOptions).where(eq(questionOptions.questionId, id));
      await insertOptions(tx, id, options);
      return { result: row, entityId: id };
    });
  }

  deleteQuestion(actor: SessionUser, id: string) {
    return this.write(actor, 'question.deleted', 'question', async (tx) => {
      const deleted = await tx
        .delete(questions)
        .where(eq(questions.id, id))
        .returning({ id: questions.id });
      if (deleted.length === 0) throw notFound('Question');
      return { result: { deleted: true as const }, entityId: id };
    });
  }

  // ---------- Badges ----------

  listBadges() {
    return this.db.select().from(badges).orderBy(asc(badges.position));
  }

  createBadge(actor: SessionUser, input: BadgeInput) {
    return this.write(actor, 'badge.created', 'badge', async (tx) => {
      const [row] = await tx
        .insert(badges)
        .values({ ...input, status: input.status ?? 'draft' })
        .returning();
      return { result: row!, entityId: row!.id };
    });
  }

  updateBadge(actor: SessionUser, id: string, patch: Partial<BadgeInput>) {
    return this.write(actor, 'badge.updated', 'badge', async (tx) => {
      const [row] = await tx.update(badges).set(patch).where(eq(badges.id, id)).returning();
      if (!row) throw notFound('Badge');
      return { result: row, entityId: id, metadata: { fields: Object.keys(patch) } };
    });
  }

  // ---------- helpers ----------

  private async requireRow(
    table: typeof courses | typeof worlds | typeof lessons | typeof activities,
    id: string,
    what: string,
  ) {
    const [row] = await this.db
      .select({ id: table.id })
      .from(table)
      .where(and(eq(table.id, id), isNull(table.deletedAt)));
    if (!row) throw notFound(what);
  }

  private softDelete(
    actor: SessionUser,
    table: typeof courses | typeof worlds | typeof lessons | typeof activities,
    id: string,
    what: string,
  ) {
    return this.write(actor, `${what}.deleted`, what, async (tx) => {
      const rows = await tx
        .update(table)
        .set({ deletedAt: new Date(), status: 'archived' })
        .where(and(eq(table.id, id), isNull(table.deletedAt)))
        .returning({ id: table.id });
      if (rows.length === 0) throw notFound(what[0]!.toUpperCase() + what.slice(1));
      return { result: { deleted: true as const }, entityId: id };
    });
  }

  /** Sets positions 1..n in the given order. `ids` must be exactly the current children. */
  private reorder(
    actor: SessionUser,
    table: typeof worlds | typeof lessons | typeof activities,
    parentColumn: typeof worlds.courseId | typeof lessons.worldId | typeof activities.lessonId,
    parentId: string,
    ids: string[],
    what: string,
  ) {
    return this.write(actor, `${what}.reordered`, what, async (tx) => {
      const current = await tx
        .select({ id: table.id })
        .from(table)
        .where(and(eq(parentColumn, parentId), isNull(table.deletedAt)));
      const currentIds = new Set(current.map((r) => r.id));
      if (
        ids.length !== currentIds.size ||
        new Set(ids).size !== ids.length ||
        !ids.every((id) => currentIds.has(id))
      ) {
        throw new AppError(
          400,
          ErrorCode.VALIDATION_ERROR,
          'Send every item exactly once to reorder.',
        );
      }
      for (const [index, id] of ids.entries()) {
        await tx
          .update(table)
          .set({ position: index + 1 })
          .where(eq(table.id, id));
      }
      return { result: { reordered: ids.length }, entityId: parentId };
    });
  }
}

function assertAnswerable(input: QuestionInput) {
  const problems = validateQuestion(input);
  if (problems.length > 0) {
    throw new AppError(400, ErrorCode.VALIDATION_ERROR, 'This question can’t be answered yet.', {
      problems,
    });
  }
}

async function insertOptions(
  tx: DbExecutor,
  questionId: string,
  options: QuestionInput['options'],
) {
  if (options.length === 0) return;
  await tx.insert(questionOptions).values(
    options.map((o, i) => ({
      questionId,
      label: o.label,
      media: o.media ?? null,
      isCorrect: o.isCorrect,
      groupKey: o.groupKey ?? null,
      matchKey: o.matchKey ?? null,
      correctOrder: o.correctOrder ?? null,
      position: i + 1,
    })),
  );
}

async function nextPosition(
  tx: DbExecutor,
  table: typeof worlds | typeof lessons | typeof activities | typeof questions,
  parentColumn:
    | typeof worlds.courseId
    | typeof lessons.worldId
    | typeof activities.lessonId
    | typeof questions.activityId,
  parentId: string,
): Promise<number> {
  const [row] = await tx
    .select({ top: max(table.position) })
    .from(table)
    .where(eq(parentColumn, parentId));
  return (row?.top ?? 0) + 1;
}
