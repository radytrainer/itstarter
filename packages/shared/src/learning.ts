import type { LocalizedText } from './i18n';

/** Response shapes for the student-facing learning API (dashboard, worlds, lessons). */

export type LessonStatus = 'not_started' | 'in_progress' | 'completed';

export interface LevelInfo {
  number: number;
  name: LocalizedText;
  icon: string;
  minXp: number;
  next: { number: number; name: LocalizedText; icon: string; minXp: number } | null;
  xpToNext: number;
  percentToNext: number;
}

export interface WorldSummary {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText | null;
  icon: string;
  color: string;
  position: number;
  lessonsTotal: number;
  lessonsCompleted: number;
  percent: number;
}

export interface LessonSummary {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText | null;
  icon: string | null;
  estimatedMinutes: number;
  xpReward: number;
  position: number;
  status: LessonStatus;
  bestScore: number | null;
}

export interface CourseSummary {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText | null;
}

export interface CourseDetail extends CourseSummary {
  worlds: WorldSummary[];
}

export interface WorldDetail extends WorldSummary {
  courseId: string;
  lessons: LessonSummary[];
}

export interface AwardView {
  code: string;
  name: LocalizedText;
  description: LocalizedText;
  icon: string;
  earned: boolean;
  awardedAt: string | null;
}

export interface ContinueLesson {
  lessonId: string;
  title: LocalizedText;
  icon: string | null;
  worldId: string;
  worldTitle: LocalizedText;
  worldColor: string;
  /** true = resume a started lesson, false = start the next new one. */
  started: boolean;
}

export interface Dashboard {
  student: {
    displayName: string;
    xpTotal: number;
    streak: number;
    longestStreak: number;
    level: LevelInfo;
  };
  course: {
    id: string;
    title: LocalizedText;
    lessonsTotal: number;
    lessonsCompleted: number;
    percent: number;
  } | null;
  worlds: WorldSummary[];
  continue: ContinueLesson | null;
  badges: AwardView[];
}
