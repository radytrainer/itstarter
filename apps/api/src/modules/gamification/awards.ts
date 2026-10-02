import { and, eq, isNull, sql } from 'drizzle-orm';
import type { AwardCriteria, NewAward } from '@itstarter/shared';
import type { DbExecutor } from '../../db/client';
import {
  achievements,
  badges,
  courses,
  lessons,
  notifications,
  studentAchievements,
  studentBadges,
  studentLessonProgress,
  students,
  worlds,
} from '../../db/schema';
import { awardXp } from './xp';

/** Everything the award rules look at, for one student. */
export interface StudentFacts {
  xpTotal: number;
  currentStreak: number;
  lessonsCompleted: number;
  /** world slug → { done, total } (published lessons only) */
  worlds: Map<string, { done: number; total: number }>;
  /** course slug → { done, total } */
  courses: Map<string, { done: number; total: number }>;
  /** activity type → how many activities of that type the student has completed */
  activityTypes: Map<string, number>;
}

/** Pure rule check: easy to unit-test and to extend with new rule types. */
export function meetsCriteria(criteria: AwardCriteria, facts: StudentFacts): boolean {
  switch (criteria.type) {
    case 'world_completed': {
      const w = facts.worlds.get(criteria.worldSlug);
      return !!w && w.total > 0 && w.done >= w.total;
    }
    case 'course_completed': {
      const c = facts.courses.get(criteria.courseSlug);
      return !!c && c.total > 0 && c.done >= c.total;
    }
    case 'lessons_completed':
      return facts.lessonsCompleted >= criteria.count;
    case 'xp_reached':
      return facts.xpTotal >= criteria.xp;
    case 'streak_days':
      return facts.currentStreak >= criteria.days;
    case 'activity_type_completed':
      return (facts.activityTypes.get(criteria.activityType) ?? 0) >= criteria.count;
  }
}

async function loadFacts(tx: DbExecutor, studentId: string): Promise<StudentFacts> {
  const [student] = await tx.select().from(students).where(eq(students.userId, studentId));

  const lessonRows = await tx
    .select({
      worldSlug: worlds.slug,
      courseSlug: courses.slug,
      done: sql<number>`count(${studentLessonProgress.lessonId}) filter (where ${studentLessonProgress.status} = 'completed')`.mapWith(
        Number,
      ),
      total: sql<number>`count(${lessons.id})`.mapWith(Number),
    })
    .from(lessons)
    .innerJoin(worlds, eq(worlds.id, lessons.worldId))
    .innerJoin(courses, eq(courses.id, worlds.courseId))
    .leftJoin(
      studentLessonProgress,
      and(
        eq(studentLessonProgress.lessonId, lessons.id),
        eq(studentLessonProgress.studentId, studentId),
      ),
    )
    .where(
      and(
        eq(lessons.status, 'published'),
        isNull(lessons.deletedAt),
        eq(worlds.status, 'published'),
        isNull(worlds.deletedAt),
      ),
    )
    .groupBy(worlds.slug, courses.slug);

  const worldMap = new Map<string, { done: number; total: number }>();
  const courseMap = new Map<string, { done: number; total: number }>();
  let lessonsCompleted = 0;
  for (const row of lessonRows) {
    worldMap.set(row.worldSlug, { done: row.done, total: row.total });
    const c = courseMap.get(row.courseSlug) ?? { done: 0, total: 0 };
    courseMap.set(row.courseSlug, { done: c.done + row.done, total: c.total + row.total });
    lessonsCompleted += row.done;
  }

  // An activity is completed when: unscored → viewed; scored → every question solved at least once.
  const typeRows = await tx.execute<{ type: string; n: string }>(sql`
    with attempted as (
      select activity_id,
             count(distinct question_id) filter (where is_correct) as solved
      from student_activity_attempts
      where student_id = ${studentId}
      group by activity_id
    ),
    question_counts as (
      select activity_id, count(*) as n from questions group by activity_id
    )
    select a.type, count(*) as n
    from activities a
    join attempted t on t.activity_id = a.id
    left join question_counts q on q.activity_id = a.id
    where a.status = 'published' and a.deleted_at is null
      and (not a.is_scored or (q.n > 0 and t.solved >= q.n))
    group by a.type`);

  return {
    xpTotal: student?.xpTotal ?? 0,
    currentStreak: student?.currentStreak ?? 0,
    lessonsCompleted,
    worlds: worldMap,
    courses: courseMap,
    activityTypes: new Map(typeRows.rows.map((r) => [r.type, Number(r.n)])),
  };
}

/**
 * Awards every badge and achievement the student now qualifies for and hasn't got yet.
 * Safe to call any number of times (primary keys prevent duplicates). Achievement bonus XP
 * goes through the XP ledger, so it is also given only once. Run inside the caller's transaction.
 */
export async function evaluateAwards(tx: DbExecutor, studentId: string): Promise<NewAward[]> {
  const facts = await loadFacts(tx, studentId);
  const awarded: NewAward[] = [];

  const openBadges = await tx
    .select({ badge: badges })
    .from(badges)
    .leftJoin(
      studentBadges,
      and(eq(studentBadges.badgeId, badges.id), eq(studentBadges.studentId, studentId)),
    )
    .where(and(eq(badges.status, 'published'), isNull(studentBadges.badgeId)));
  for (const { badge } of openBadges) {
    if (!meetsCriteria(badge.criteria, facts)) continue;
    const inserted = await tx
      .insert(studentBadges)
      .values({ studentId, badgeId: badge.id })
      .onConflictDoNothing()
      .returning();
    if (inserted.length === 0) continue;
    awarded.push({
      kind: 'badge',
      code: badge.code,
      name: badge.name,
      icon: badge.icon,
      xpBonus: 0,
    });
  }

  // Bonus XP can unlock XP achievements, so re-check facts after each bonus.
  let changed = true;
  while (changed) {
    changed = false;
    const openAchievements = await tx
      .select({ achievement: achievements })
      .from(achievements)
      .leftJoin(
        studentAchievements,
        and(
          eq(studentAchievements.achievementId, achievements.id),
          eq(studentAchievements.studentId, studentId),
        ),
      )
      .where(and(eq(achievements.status, 'published'), isNull(studentAchievements.achievementId)));
    for (const { achievement } of openAchievements) {
      if (!meetsCriteria(achievement.criteria, facts)) continue;
      const inserted = await tx
        .insert(studentAchievements)
        .values({ studentId, achievementId: achievement.id })
        .onConflictDoNothing()
        .returning();
      if (inserted.length === 0) continue;
      const bonus = await awardXp(
        tx,
        studentId,
        'achievement',
        achievement.id,
        achievement.xpBonus,
      );
      facts.xpTotal += bonus;
      if (bonus > 0) changed = true;
      awarded.push({
        kind: 'achievement',
        code: achievement.code,
        name: achievement.name,
        icon: achievement.icon,
        xpBonus: bonus,
      });
    }
  }

  if (awarded.length > 0) {
    await tx.insert(notifications).values(
      awarded.map((a) => ({
        userId: studentId,
        type: a.kind === 'badge' ? 'badge_earned' : 'achievement_earned',
        payload: { code: a.code, name: a.name, icon: a.icon, xpBonus: a.xpBonus },
      })),
    );
  }
  return awarded;
}
