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

/** 🏆 Ranking: students ordered by XP (all time, or earned in the last 7 days). */
export const RANKING_PERIODS = ['all', 'week'] as const;
export type RankingPeriod = (typeof RANKING_PERIODS)[number];

export interface RankingEntry {
  /** Same XP = same rank (1, 2, 2, 4…). Null while the student has no XP in this period. */
  rank: number | null;
  displayName: string;
  xp: number;
  levelIcon: string;
  isYou: boolean;
}

export interface RankingView {
  period: RankingPeriod;
  /** The top students (ties ordered by name). */
  top: RankingEntry[];
  /** The signed-in student's own place; null for staff. */
  you: RankingEntry | null;
  /** Outside the top: the students just above and below you (you included), to compare. */
  around: RankingEntry[];
  /** Students with XP in this period. */
  ranked: number;
}
