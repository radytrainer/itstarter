import { and, eq, inArray, isNull, ne, or } from 'drizzle-orm';
import type { Role } from '@itstarter/shared';
import { hashPassword } from '../../lib/password';
import type { Database, DbExecutor } from '../client';
import {
  achievements,
  activities,
  auditLogs,
  badges,
  cohorts,
  courses,
  lessons,
  levels,
  questionOptions,
  questions,
  roles,
  staff,
  students,
  teacherCohorts,
  users,
  worlds,
} from '../schema';
import {
  ACHIEVEMENT_SEEDS,
  BADGE_SEEDS,
  COHORT_SEED,
  COURSE_SEED,
  LEVEL_SEEDS,
  RETIRED_BADGE_CODES,
  RETIRED_WORLD_SLUGS,
  ROLE_SEEDS,
  WORLD_SEEDS,
} from './data/foundation';
import { ALL_LESSONS } from './data/lessons';
import type { LessonSeed, UserSeed } from './types';

export interface SeedOptions {
  users: UserSeed[];
  lessons?: LessonSeed[];
}

/** How many rows of each kind were newly created (0 everywhere on a repeat run). */
export interface SeedReport {
  roles: number;
  levels: number;
  badges: number;
  achievements: number;
  courses: number;
  worlds: number;
  lessons: number;
  activities: number;
  questions: number;
  cohorts: number;
  users: number;
  /** Old worlds archived because the course no longer uses them. */
  retiredWorlds: number;
  /** Existing lessons whose built-in content was replaced by a newer revision. */
  lessonsUpgraded: number;
  /** Newer revisions NOT applied because staff edited the lesson (their version is kept). */
  lessonsKeptAsEdited: number;
}

/**
 * Idempotent: creates whatever is missing and never overwrites existing rows, so content
 * edited by admins and passwords changed by users are left alone. Runs in one transaction.
 */
export async function runSeed(db: Database, options: SeedOptions): Promise<SeedReport> {
  const lessonSeeds = options.lessons ?? ALL_LESSONS;

  return db.transaction(async (tx) => {
    const report: SeedReport = {
      roles: 0,
      levels: 0,
      badges: 0,
      achievements: 0,
      courses: 0,
      worlds: 0,
      retiredWorlds: 0,
      lessonsUpgraded: 0,
      lessonsKeptAsEdited: 0,
      lessons: 0,
      activities: 0,
      questions: 0,
      cohorts: 0,
      users: 0,
    };

    report.roles = (
      await tx.insert(roles).values(ROLE_SEEDS).onConflictDoNothing().returning()
    ).length;
    report.levels = (
      await tx.insert(levels).values(LEVEL_SEEDS).onConflictDoNothing().returning()
    ).length;

    report.badges = (
      await tx
        .insert(badges)
        .values(
          BADGE_SEEDS.map(({ code, name, description, icon, criteria }, i) => ({
            code,
            name,
            description,
            icon,
            criteria,
            position: i + 1,
          })),
        )
        .onConflictDoNothing()
        .returning()
    ).length;
    report.achievements = (
      await tx
        .insert(achievements)
        .values(ACHIEVEMENT_SEEDS.map((a, i) => ({ ...a, position: i + 1 })))
        .onConflictDoNothing()
        .returning()
    ).length;
    const badgeIds = new Map(
      (await tx.select({ id: badges.id, code: badges.code }).from(badges)).map((b) => [
        b.code,
        b.id,
      ]),
    );

    report.courses = (
      await tx
        .insert(courses)
        .values({ ...COURSE_SEED, status: 'published', publishedAt: new Date() })
        .onConflictDoNothing()
        .returning()
    ).length;
    const [course] = await tx
      .select({ id: courses.id })
      .from(courses)
      .where(eq(courses.slug, COURSE_SEED.slug));
    if (!course) throw new Error('Seed: course was not created');

    report.worlds = (
      await tx
        .insert(worlds)
        .values(
          WORLD_SEEDS.map(({ badgeCode, ...w }, i) => ({
            ...w,
            courseId: course.id,
            position: i + 1,
            status: 'published' as const,
            badgeId: badgeIds.get(badgeCode) ?? null,
          })),
        )
        .onConflictDoNothing()
        .returning()
    ).length;
    report.retiredWorlds = await retireOldContent(tx, course.id);

    const worldIds = new Map(
      (
        await tx
          .select({ id: worlds.id, slug: worlds.slug })
          .from(worlds)
          .where(eq(worlds.courseId, course.id))
      ).map((w) => [w.slug, w.id]),
    );

    const positionInWorld = new Map<string, number>();
    for (const lesson of lessonSeeds) {
      const worldId = worldIds.get(lesson.worldSlug);
      if (!worldId) throw new Error(`Seed: unknown world "${lesson.worldSlug}"`);
      const position = (positionInWorld.get(lesson.worldSlug) ?? 0) + 1;
      positionInWorld.set(lesson.worldSlug, position);

      const result = await syncLesson(tx, worldId, position, lesson);
      if (result.kind === 'kept') report.lessonsKeptAsEdited += 1;
      if (result.kind === 'created' || result.kind === 'upgraded') {
        report[result.kind === 'created' ? 'lessons' : 'lessonsUpgraded'] += 1;
        report.activities += result.activities;
        report.questions += result.questions;
      }
    }

    report.cohorts = (
      await tx
        .insert(cohorts)
        .values({ ...COHORT_SEED, courseId: course.id })
        .onConflictDoNothing()
        .returning()
    ).length;
    const [cohort] = await tx
      .select({ id: cohorts.id })
      .from(cohorts)
      .where(and(eq(cohorts.courseId, course.id), eq(cohorts.name, COHORT_SEED.name)));
    if (!cohort) throw new Error('Seed: cohort was not created');

    for (const user of options.users) {
      if (await createUserIfMissing(tx, user, cohort.id)) report.users += 1;
    }

    return report;
  });
}

/**
 * Archives worlds and badges the course no longer uses (soft delete: progress and XP history
 * stay). When a world is retired, the remaining worlds are put back in WORLD_SEEDS order.
 */
async function retireOldContent(tx: DbExecutor, courseId: string): Promise<number> {
  const now = new Date();
  const retired = await tx
    .update(worlds)
    .set({ status: 'archived', deletedAt: now })
    .where(
      and(
        eq(worlds.courseId, courseId),
        inArray(worlds.slug, RETIRED_WORLD_SLUGS),
        isNull(worlds.deletedAt),
      ),
    )
    .returning({ id: worlds.id });
  if (retired.length > 0) {
    await tx
      .update(lessons)
      .set({ status: 'archived', deletedAt: now })
      .where(
        and(
          inArray(
            lessons.worldId,
            retired.map((w) => w.id),
          ),
          isNull(lessons.deletedAt),
        ),
      );
    for (const [i, world] of WORLD_SEEDS.entries()) {
      await tx
        .update(worlds)
        .set({ position: i + 1 })
        .where(and(eq(worlds.courseId, courseId), eq(worlds.slug, world.slug)));
    }
  }
  await tx
    .update(badges)
    .set({ status: 'archived' })
    .where(and(inArray(badges.code, RETIRED_BADGE_CODES), ne(badges.status, 'archived')));
  return retired.length;
}

type SyncResult =
  | { kind: 'created' | 'upgraded'; activities: number; questions: number }
  | { kind: 'unchanged' | 'kept' };

/**
 * Creates a missing lesson. An existing lesson is left alone, except when the seed has a newer
 * revision: then its steps are replaced (old ones archived, so student history stays) — unless
 * staff edited it in the admin area (any audit entry for it), in which case their version wins.
 */
async function syncLesson(
  tx: DbExecutor,
  worldId: string,
  position: number,
  seed: LessonSeed,
): Promise<SyncResult> {
  const revision = seed.revision ?? 1;
  const [created] = await tx
    .insert(lessons)
    .values({
      worldId,
      slug: seed.slug,
      title: seed.title,
      summary: seed.summary,
      icon: seed.icon,
      estimatedMinutes: seed.estimatedMinutes,
      xpReward: seed.xpReward ?? 50,
      seedRevision: revision,
      position,
      status: 'published',
    })
    .onConflictDoNothing()
    .returning({ id: lessons.id });
  if (created) return { kind: 'created', ...(await insertSteps(tx, created.id, seed)) };

  const [existing] = await tx
    .select({ id: lessons.id, seedRevision: lessons.seedRevision })
    .from(lessons)
    .where(and(eq(lessons.worldId, worldId), eq(lessons.slug, seed.slug)));
  if (!existing || existing.seedRevision >= revision) return { kind: 'unchanged' };

  const oldActivities = await tx
    .select({ id: activities.id })
    .from(activities)
    .where(and(eq(activities.lessonId, existing.id), isNull(activities.deletedAt)));
  const oldQuestions = oldActivities.length
    ? await tx
        .select({ id: questions.id })
        .from(questions)
        .where(
          inArray(
            questions.activityId,
            oldActivities.map((a) => a.id),
          ),
        )
    : [];
  const ids = [existing.id, ...oldActivities.map((a) => a.id), ...oldQuestions.map((q) => q.id)];
  const [edit] = await tx
    .select({ id: auditLogs.id })
    .from(auditLogs)
    .where(
      and(
        or(
          eq(auditLogs.entityType, 'lesson'),
          eq(auditLogs.entityType, 'activity'),
          eq(auditLogs.entityType, 'question'),
        ),
        inArray(auditLogs.entityId, ids),
      ),
    )
    .limit(1);
  if (edit) {
    await tx.update(lessons).set({ seedRevision: revision }).where(eq(lessons.id, existing.id));
    return { kind: 'kept' };
  }

  const now = new Date();
  if (oldActivities.length > 0) {
    await tx
      .update(activities)
      .set({ status: 'archived', deletedAt: now })
      .where(
        inArray(
          activities.id,
          oldActivities.map((a) => a.id),
        ),
      );
  }
  await tx
    .update(lessons)
    .set({
      title: seed.title,
      summary: seed.summary,
      icon: seed.icon,
      estimatedMinutes: seed.estimatedMinutes,
      xpReward: seed.xpReward ?? 50,
      seedRevision: revision,
    })
    .where(eq(lessons.id, existing.id));
  return { kind: 'upgraded', ...(await insertSteps(tx, existing.id, seed)) };
}

async function insertSteps(
  tx: DbExecutor,
  lessonId: string,
  seed: LessonSeed,
): Promise<{ activities: number; questions: number }> {
  const lesson = { id: lessonId };
  let questionCount = 0;
  for (const [i, activity] of seed.activities.entries()) {
    const [activityRow] = await tx
      .insert(activities)
      .values({
        lessonId: lesson.id,
        step: activity.step,
        type: activity.type,
        title: activity.title ?? null,
        config: activity.config ?? {},
        isScored: activity.isScored ?? false,
        passScore: activity.passScore ?? 0,
        xpReward: activity.xpReward ?? 10,
        position: i + 1,
      })
      .returning({ id: activities.id });

    for (const [j, question] of (activity.questions ?? []).entries()) {
      const { options = [], ...fields } = question;
      const [questionRow] = await tx
        .insert(questions)
        .values({
          ...fields,
          config: fields.config ?? {},
          activityId: activityRow!.id,
          position: j + 1,
        })
        .returning({ id: questions.id });
      questionCount += 1;

      if (options.length > 0) {
        await tx
          .insert(questionOptions)
          .values(options.map((o, k) => ({ ...o, questionId: questionRow!.id, position: k + 1 })));
      }
    }
  }

  return { activities: seed.activities.length, questions: questionCount };
}

async function createUserIfMissing(
  tx: DbExecutor,
  seed: UserSeed,
  cohortId: string,
): Promise<boolean> {
  const [existing] = await tx
    .select({ id: users.id })
    .from(users)
    .where(and(eq(users.username, seed.username), isNull(users.deletedAt)));
  if (existing) return false;

  const roleId = roleIdFor(seed.role);
  const [user] = await tx
    .insert(users)
    .values({
      username: seed.username,
      displayName: seed.displayName,
      passwordHash: await hashPassword(seed.password),
      roleId,
    })
    .returning({ id: users.id });

  if (seed.role === 'STUDENT') {
    await tx.insert(students).values({ userId: user!.id, cohortId });
  } else {
    await tx.insert(staff).values({ userId: user!.id });
    if (seed.role === 'TEACHER') {
      await tx.insert(teacherCohorts).values({ staffUserId: user!.id, cohortId });
    }
  }
  return true;
}

function roleIdFor(code: Role): number {
  const role = ROLE_SEEDS.find((r) => r.code === code);
  if (!role) throw new Error(`Seed: unknown role ${code}`);
  return role.id;
}
