import { z } from 'zod';
import type { LocalizedText } from './i18n';

/** Reporting windows offered in the UI (days, counted in Cambodia time). */
export const ANALYTICS_RANGES = [7, 30, 90] as const;
export type AnalyticsRange = (typeof ANALYTICS_RANGES)[number];

export const analyticsQuerySchema = z.object({
  cohortId: z.uuid().optional(),
  days: z.coerce
    .number()
    .int()
    .refine((d): d is AnalyticsRange => (ANALYTICS_RANGES as readonly number[]).includes(d), {
      message: `Choose one of ${ANALYTICS_RANGES.join(', ')}`,
    })
    .default(7),
});
export type AnalyticsQuery = z.infer<typeof analyticsQuerySchema>;

/** Course progress groups: how many students finished 0%, 1–25%, … 100% of the lessons. */
export const PROGRESS_BUCKETS = ['0', '1-25', '26-50', '51-75', '76-99', '100'] as const;
export type ProgressBucket = (typeof PROGRESS_BUCKETS)[number];

// Every analytics response is aggregate: counts and averages, never names.

export interface AnalyticsOverview {
  generatedAt: string;
  days: number;
  students: {
    total: number;
    /** Did something in the last `days` days. */
    active: number;
    /** Has never started a lesson. */
    notStarted: number;
  };
  lessons: {
    published: number;
    /** Lessons finished (each student–lesson pair counts once). */
    completed: number;
    /** completed ÷ (students × published lessons). */
    completionPercent: number;
  };
  quiz: {
    /** Average best score of finished lessons (0–100). */
    averageScore: number | null;
    /** Share of questions answered correctly on the first try. */
    firstTryCorrectPercent: number | null;
    answers: number;
  };
  xp: { total: number; average: number };
  progress: { bucket: ProgressBucket; students: number }[];
  badges: { badgeId: string; code: string; name: LocalizedText; icon: string; students: number }[];
}

export interface EngagementDay {
  day: string; // YYYY-MM-DD
  activeStudents: number;
  lessonsCompleted: number;
  activitiesCompleted: number;
  minutes: number;
  xp: number;
}

export interface AnalyticsEngagement {
  generatedAt: string;
  days: EngagementDay[];
  /** Average minutes per student per active day, over the window. */
  averageMinutesPerActiveDay: number | null;
  /** Students whose current streak is 3 days or more. */
  studentsOnStreak: number;
}

export interface LessonStats {
  lessonId: string;
  slug: string;
  title: LocalizedText;
  worldTitle: LocalizedText;
  started: number;
  completed: number;
  /** completed ÷ started (null until someone starts). */
  finishRate: number | null;
  averageScore: number | null;
  averageMinutes: number | null;
}

export interface WorldStats {
  worldId: string;
  slug: string;
  title: LocalizedText;
  icon: string;
  color: string;
  lessonCount: number;
  studentsStarted: number;
  studentsFinished: number;
  completionPercent: number;
  averageScore: number | null;
  lessons: LessonStats[];
}

export interface AnalyticsWorlds {
  generatedAt: string;
  worlds: WorldStats[];
  mostCompleted: LessonStats[];
  leastCompleted: LessonStats[];
  /** Lowest average score, among lessons enough students finished. */
  hardest: LessonStats[];
}

export interface ActivityStats {
  activityId: string;
  lessonId: string;
  type: string;
  title: LocalizedText | null;
  lessonTitle: LocalizedText;
  worldTitle: LocalizedText;
  students: number;
  answers: number;
  firstTryCorrectPercent: number;
  /** Average number of tries per question before it was right. */
  averageTries: number;
}

export interface AnalyticsActivities {
  generatedAt: string;
  /** Hardest first. Only activities answered by enough students to mean something. */
  activities: ActivityStats[];
  minStudents: number;
}
