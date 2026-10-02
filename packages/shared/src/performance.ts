import { z } from 'zod';
import type { LocalizedText } from './i18n';

/**
 * Performance & commitment: how well and how regularly a student learns. Shown to staff (one
 * student's report) and, in friendly words, to the student ("My progress").
 */

/** Commitment looks at the last 4 weeks. */
export const COMMITMENT_WINDOW_DAYS = 28;

/**
 * What "fully committed" means over 4 weeks (each part is capped at 100%):
 * learning on 12 days (3 a week), 120 active minutes (30 a week) and 8 lessons (2 a week).
 */
export const COMMITMENT_TARGETS = { activeDays: 12, minutes: 120, lessons: 8 } as const;
export const COMMITMENT_WEIGHTS = { consistency: 0.4, effort: 0.3, progress: 0.3 } as const;

export const COMMITMENT_LEVELS = ['not_started', 'starting', 'steady', 'strong'] as const;
export type CommitmentLevel = (typeof COMMITMENT_LEVELS)[number];

export interface CommitmentInput {
  activeDays: number;
  minutes: number;
  lessons: number;
}

export interface Commitment extends CommitmentInput {
  /** 0–100 */
  score: number;
  level: CommitmentLevel;
  /** Each part 0–100: days learned, time spent, lessons finished. */
  parts: { consistency: number; effort: number; progress: number };
}

const part = (value: number, target: number) => Math.min(1, Math.max(0, value) / target);

/** The commitment score. The progress report's SQL uses the same formula (tested to agree). */
export function commitmentScore(input: CommitmentInput): Commitment {
  const consistency = part(input.activeDays, COMMITMENT_TARGETS.activeDays);
  const effort = part(input.minutes, COMMITMENT_TARGETS.minutes);
  const progress = part(input.lessons, COMMITMENT_TARGETS.lessons);
  const score = Math.round(
    100 *
      (COMMITMENT_WEIGHTS.consistency * consistency +
        COMMITMENT_WEIGHTS.effort * effort +
        COMMITMENT_WEIGHTS.progress * progress),
  );
  return {
    ...input,
    score,
    level: commitmentLevel(score, input.activeDays),
    parts: {
      consistency: Math.round(consistency * 100),
      effort: Math.round(effort * 100),
      progress: Math.round(progress * 100),
    },
  };
}

export function commitmentLevel(score: number, activeDays: number): CommitmentLevel {
  if (activeDays === 0) return 'not_started';
  if (score >= 70) return 'strong';
  if (score >= 40) return 'steady';
  return 'starting';
}

/** Question kinds grouped into skills a teacher understands. */
export const SKILLS = [
  'quiz',
  'numbers',
  'sorting',
  'hands_on',
  'games',
  'coding',
  'spelling',
] as const;
export type Skill = (typeof SKILLS)[number];

export const SKILL_OF_KIND: Record<string, Skill> = {
  single_choice: 'quiz',
  true_false: 'quiz',
  safe_or_dangerous: 'quiz',
  number: 'numbers',
  generated: 'numbers',
  matching: 'sorting',
  ordering: 'sorting',
  categorize: 'sorting',
  key_combo: 'hands_on',
  cell_select: 'hands_on',
  format_text: 'hands_on',
  prompt_builder: 'hands_on',
  catch: 'games',
  memory: 'games',
  robot: 'coding',
  word_builder: 'spelling',
};

/** Fewer answers than this: accuracy is not shown (too few to mean anything). */
export const MIN_ANSWERS_FOR_ACCURACY = 5;

export interface PerformanceDay {
  /** YYYY-MM-DD */
  day: string;
  minutes: number;
  xp: number;
}

export interface PerformanceWeek {
  /** Monday, YYYY-MM-DD */
  weekStart: string;
  activeDays: number;
  minutes: number;
  lessons: number;
  /** Questions answered for the first time that week. */
  answered: number;
  /** First-try accuracy, null when fewer than MIN_ANSWERS_FOR_ACCURACY. */
  accuracy: number | null;
}

export interface PerformanceWorld {
  id: string;
  title: LocalizedText;
  icon: string;
  color: string;
  lessonsCompleted: number;
  lessonsTotal: number;
  answered: number;
  accuracy: number | null;
  minutes: number;
}

export interface PerformanceSkill {
  skill: Skill;
  answered: number;
  accuracy: number | null;
}

export interface StudentPerformance {
  commitment: Commitment;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  totals: {
    lessonsCompleted: number;
    /** Different questions answered. */
    answered: number;
    accuracy: number | null;
    minutes: number;
    gamesWon: number;
  };
  /** The last 28 days, oldest first. */
  days: PerformanceDay[];
  /** The last 8 weeks, oldest first. */
  weeks: PerformanceWeek[];
  worlds: PerformanceWorld[];
  skills: PerformanceSkill[];
}

/** Active learning time the phone reports while a lesson is open (seconds since last report). */
export const lessonTimeRequestSchema = z.object({
  seconds: z.number().int().min(1).max(600),
});
