import { and, asc, eq, isNull } from 'drizzle-orm';
import type {
  AwardView,
  ContinueLesson,
  Dashboard,
  LessonStatus,
  LessonSummary,
  LevelInfo,
  WorldDetail,
  WorldSummary,
} from '@itstarter/shared';
import type { Database } from '../../db/client';
import {
  achievements,
  badges,
  cohorts,
  studentAchievements,
  studentBadges,
  studentLessonProgress,
  students,
} from '../../db/schema';
import { levelFor } from '../../engine/levels';
import { localDate, visibleStreak } from '../../engine/streak';
import { studentDashboardKey, type Cache } from '../../lib/cache';
import { AppError } from '../../lib/errors';
import type { SessionUser } from '../auth/sessions';
import type { ContentService, CourseStructure, WorldBase } from '../content/service';

const DASHBOARD_TTL_SECONDS = 5 * 60;

/** Enough to identify a student: a session user, or a student looked up by staff. */
export type StudentRef = Pick<SessionUser, 'id' | 'displayName'>;

interface LessonState {
  status: LessonStatus;
  bestScore: number | null;
  updatedAt: Date;
}

export function percent(done: number, total: number): number {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

function summarizeWorld(world: WorldBase, states: Map<string, LessonState>): WorldSummary {
  const { lessons, ...rest } = world;
  const completed = lessons.filter((l) => states.get(l.id)?.status === 'completed').length;
  return {
    ...rest,
    lessonsTotal: lessons.length,
    lessonsCompleted: completed,
    percent: percent(completed, lessons.length),
  };
}

/**
 * Where the student should go next: the most recently touched unfinished lesson, otherwise the
 * first lesson they haven't finished (in course order). null when everything is done.
 */
export function pickContinueLesson(
  course: CourseStructure,
  states: Map<string, LessonState>,
): ContinueLesson | null {
  const ordered = course.worlds.flatMap((world) =>
    world.lessons.map((lesson) => ({ world, lesson })),
  );
  const toCard = (entry: (typeof ordered)[number], started: boolean): ContinueLesson => ({
    lessonId: entry.lesson.id,
    title: entry.lesson.title,
    icon: entry.lesson.icon,
    worldId: entry.world.id,
    worldTitle: entry.world.title,
    worldColor: entry.world.color,
    started,
  });

  const inProgress = ordered
    .filter((e) => states.get(e.lesson.id)?.status === 'in_progress')
    .sort(
      (a, b) =>
        states.get(b.lesson.id)!.updatedAt.getTime() - states.get(a.lesson.id)!.updatedAt.getTime(),
    );
  if (inProgress[0]) return toCard(inProgress[0], true);

  const firstNew = ordered.find((e) => states.get(e.lesson.id)?.status !== 'completed');
  return firstNew ? toCard(firstNew, false) : null;
}

export class ProgressService {
  constructor(
    private readonly db: Database,
    private readonly cache: Cache,
    private readonly content: ContentService,
  ) {}

  async dashboard(user: StudentRef): Promise<Dashboard> {
    return this.cache.getOrLoad(studentDashboardKey(user.id), DASHBOARD_TTL_SECONDS, () =>
      this.loadDashboard(user),
    );
  }

  /** A world with lessons; for students each lesson carries their own status. */
  async world(user: SessionUser, worldId: string): Promise<WorldDetail> {
    const { course, world } = await this.content.worldWithCourse(worldId);
    const states = user.role === 'STUDENT' ? await this.lessonStates(user.id) : new Map();
    const lessons: LessonSummary[] = world.lessons.map((lesson) => {
      const state = states.get(lesson.id);
      return {
        ...lesson,
        status: state?.status ?? 'not_started',
        bestScore: state?.bestScore ?? null,
      };
    });
    return { ...summarizeWorld(world, states), courseId: course.id, lessons };
  }

  async badges(user: StudentRef): Promise<AwardView[]> {
    const rows = await this.db
      .select({ badge: badges, awardedAt: studentBadges.awardedAt })
      .from(badges)
      .leftJoin(
        studentBadges,
        and(eq(studentBadges.badgeId, badges.id), eq(studentBadges.studentId, user.id)),
      )
      .where(eq(badges.status, 'published'))
      .orderBy(asc(badges.position));
    return rows.map(({ badge, awardedAt }) => ({
      code: badge.code,
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      earned: awardedAt !== null,
      awardedAt: awardedAt?.toISOString() ?? null,
    }));
  }

  async achievements(user: StudentRef): Promise<AwardView[]> {
    const rows = await this.db
      .select({ achievement: achievements, awardedAt: studentAchievements.awardedAt })
      .from(achievements)
      .leftJoin(
        studentAchievements,
        and(
          eq(studentAchievements.achievementId, achievements.id),
          eq(studentAchievements.studentId, user.id),
        ),
      )
      .where(eq(achievements.status, 'published'))
      .orderBy(asc(achievements.position));
    return rows.map(({ achievement, awardedAt }) => ({
      code: achievement.code,
      name: achievement.name,
      description: achievement.description,
      icon: achievement.icon,
      earned: awardedAt !== null,
      awardedAt: awardedAt?.toISOString() ?? null,
    }));
  }

  /** The course a student follows: their cohort's course, otherwise the first published one. */
  async courseIdFor(userId: string | null): Promise<string | null> {
    if (userId) {
      const [row] = await this.db
        .select({ courseId: cohorts.courseId })
        .from(students)
        .innerJoin(cohorts, and(eq(cohorts.id, students.cohortId), isNull(cohorts.deletedAt)))
        .where(eq(students.userId, userId));
      if (row) return row.courseId;
    }
    const [first] = await this.content.listCourses();
    return first?.id ?? null;
  }

  private async lessonStates(studentId: string): Promise<Map<string, LessonState>> {
    const rows = await this.db
      .select({
        lessonId: studentLessonProgress.lessonId,
        status: studentLessonProgress.status,
        bestScore: studentLessonProgress.bestScore,
        updatedAt: studentLessonProgress.updatedAt,
      })
      .from(studentLessonProgress)
      .where(eq(studentLessonProgress.studentId, studentId));
    return new Map(rows.map((r) => [r.lessonId, r]));
  }

  private async loadDashboard(user: StudentRef): Promise<Dashboard> {
    const [student] = await this.db.select().from(students).where(eq(students.userId, user.id));
    if (!student) throw AppError.notFound('STUDENT_NOT_FOUND', 'Student profile not found');

    const courseId = await this.courseIdFor(user.id);
    const [course, states, levelDefs, badgeViews] = await Promise.all([
      courseId ? this.content.courseStructure(courseId) : Promise.resolve(null),
      this.lessonStates(user.id),
      this.content.levels(),
      this.badges(user),
    ]);

    const status = levelFor(student.xpTotal, levelDefs);
    const level: LevelInfo = {
      ...status.current,
      next: status.next,
      xpToNext: status.xpToNext,
      percentToNext: status.percentToNext,
    };
    const today = localDate(new Date(), student.timezone);
    const worldSummaries = course ? course.worlds.map((w) => summarizeWorld(w, states)) : [];
    const lessonsTotal = worldSummaries.reduce((n, w) => n + w.lessonsTotal, 0);
    const lessonsCompleted = worldSummaries.reduce((n, w) => n + w.lessonsCompleted, 0);

    return {
      student: {
        displayName: user.displayName,
        xpTotal: student.xpTotal,
        streak: visibleStreak(
          {
            current: student.currentStreak,
            longest: student.longestStreak,
            lastActiveDate: student.lastActiveDate,
          },
          today,
        ),
        longestStreak: student.longestStreak,
        level,
      },
      course: course
        ? {
            id: course.id,
            title: course.title,
            lessonsTotal,
            lessonsCompleted,
            percent: percent(lessonsCompleted, lessonsTotal),
          }
        : null,
      worlds: worldSummaries,
      continue: course ? pickContinueLesson(course, states) : null,
      badges: badgeViews,
    };
  }
}
