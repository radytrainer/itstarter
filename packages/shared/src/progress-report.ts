import { z } from 'zod';
import type { LocalizedText } from './i18n';
import type { Commitment } from './performance';
import { studentListQuerySchema } from './admin';

/** Learning-progress report for teachers (own classes) and admins (everyone). */
export const PROGRESS_SORTS = [
  'name',
  'progress',
  'score',
  'commitment',
  'xp',
  'lastActive',
] as const;
export type ProgressSort = (typeof PROGRESS_SORTS)[number];

export const progressListQuerySchema = studentListQuerySchema.extend({
  sort: z.enum(PROGRESS_SORTS).default('name'),
  dir: z.enum(['asc', 'desc']).optional(),
});
export type ProgressListQuery = z.infer<typeof progressListQuerySchema>;

/** A world column in the report (published worlds, in course order). */
export interface ProgressWorld {
  id: string;
  slug: string;
  title: LocalizedText;
  icon: string;
  color: string;
  lessonsTotal: number;
}

export interface StudentProgressRow {
  id: string;
  username: string;
  displayName: string;
  cohortName: string | null;
  status: 'active' | 'disabled';
  xpTotal: number;
  level: number;
  currentStreak: number;
  /** YYYY-MM-DD (student's own time zone), null = never. */
  lastActiveDate: string | null;
  lessonsCompleted: number;
  lessonsTotal: number;
  percent: number;
  /** Average best score of finished lessons (0–100). */
  averageScore: number | null;
  /** Completed lessons per world id. */
  worlds: Record<string, number>;
  /** The lesson they most recently worked on and haven't finished. */
  currentLesson: { id: string; title: LocalizedText } | null;
  /** Learning habit over the last 4 weeks (see performance.ts). */
  commitment: Commitment;
}

/** Totals over every student matching the filters (not just this page). */
export interface ProgressSummary {
  students: number;
  averagePercent: number;
  activeThisWeek: number;
  notStarted: number;
  inactive: number;
}

export interface ProgressReport {
  worlds: ProgressWorld[];
  summary: ProgressSummary;
  rows: StudentProgressRow[];
}

/** Days without activity before a student is flagged as inactive. */
export const INACTIVE_AFTER_DAYS = 7;
