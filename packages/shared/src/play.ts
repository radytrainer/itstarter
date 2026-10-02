import { z } from 'zod';
import type { LessonStep, Media } from './domain';
import { PROGRAM_MAX_BLOCKS, robotBlockSchema } from './games';
import type { LocalizedText } from './i18n';
import type { LessonStatus, LevelInfo } from './learning';

/**
 * What the phone receives to play a lesson. Built by the API from the database with every
 * answer removed (no is_correct, match keys, correct order or expected values).
 */
export interface PlayOption {
  id: string;
  label: LocalizedText;
  media: Media | null;
  /** Matching side ("left"/"right") or drag-and-drop bucket. */
  groupKey: string | null;
}

export interface PlayQuestion {
  id: string;
  kind: string;
  prompt: LocalizedText;
  media: Media | null;
  hint: LocalizedText | null;
  difficulty: number;
  options: PlayOption[];
  /** Public data shown with the question: a mock email/URL/search/chat, a grid, keys... */
  data: Record<string, unknown>;
}

/**
 * Activity setting `config.feedback`:
 * - "retry" (default): a wrong answer means "try again"; the answer is shown after 2 tries.
 * - "reveal": every Check shows the right answer and the explanation at once, then Next.
 *   One answer per question; it counts as done whether it was right or not.
 */
export const FEEDBACK_MODES = ['retry', 'reveal'] as const;
export type FeedbackMode = (typeof FEEDBACK_MODES)[number];

export function feedbackMode(config: Record<string, unknown> | null | undefined): FeedbackMode {
  return config?.feedback === 'reveal' ? 'reveal' : 'retry';
}

export interface PlayActivity {
  id: string;
  step: LessonStep;
  type: string;
  title: LocalizedText | null;
  config: Record<string, unknown>;
  isScored: boolean;
  xpReward: number;
  position: number;
  questions: PlayQuestion[];
}

export interface LessonPlay {
  id: string;
  title: LocalizedText;
  summary: LocalizedText | null;
  icon: string | null;
  estimatedMinutes: number;
  xpReward: number;
  world: { id: string; title: LocalizedText; icon: string; color: string };
  activities: PlayActivity[];
  nextLessonId: string | null;
  /** null for staff previews. */
  progress: {
    status: LessonStatus;
    completedActivityIds: string[];
    solvedQuestionIds: string[];
    /** Saved creative work, by activity id (to show and edit again). */
    creations: Record<string, Record<string, string>>;
  } | null;
}

// ---------- Answers ----------

/** The answer shape for each question kind. */
export const answerSchemas = {
  single_choice: z.object({ optionId: z.uuid() }),
  true_false: z.object({ value: z.boolean() }),
  number: z.object({ value: z.number().finite() }),
  safe_or_dangerous: z.object({ value: z.enum(['safe', 'dangerous']) }),
  matching: z.object({
    pairs: z
      .array(z.object({ left: z.uuid(), right: z.uuid() }))
      .min(1)
      .max(20),
  }),
  ordering: z.object({ order: z.array(z.uuid()).min(2).max(20) }),
  /** Press a key combination, e.g. ["Ctrl", "C"]. Order doesn't matter. */
  key_combo: z.object({ keys: z.array(z.string().min(1).max(12)).min(1).max(4) }),
  /** Put every item into a bucket (files into folders, things into groups). */
  categorize: z.object({
    placements: z
      .array(z.object({ item: z.uuid(), bucket: z.uuid() }))
      .min(1)
      .max(30),
  }),
  /** Tap a cell in a spreadsheet, e.g. "B3". */
  cell_select: z.object({ cell: z.string().regex(/^[A-Z][1-9][0-9]?$/) }),
  /** Format text with a mini word-processor toolbar. */
  format_text: z.object({
    format: z.object({
      bold: z.boolean(),
      italic: z.boolean(),
      underline: z.boolean(),
      align: z.enum(['left', 'center', 'right']),
      size: z.enum(['small', 'normal', 'large']),
    }),
  }),
  /** Build a prompt by choosing one piece for each part (role, task, context, format). */
  prompt_builder: z.object({ optionIds: z.array(z.uuid()).min(1).max(8) }),

  // ---------- Moving games ----------
  /** Catch the falling answers: the options the student caught (right AND wrong ones). */
  catch: z.object({ caught: z.array(z.uuid()).max(30) }),
  /** Memory cards: the pairs found, and how many times two cards were turned over. */
  memory: z.object({
    pairs: z
      .array(z.object({ a: z.uuid(), b: z.uuid() }))
      .min(1)
      .max(12),
    moves: z.number().int().min(1).max(500),
  }),
  /** Program a robot with arrows and repeat blocks. */
  robot: z.object({ program: z.array(robotBlockSchema).min(1).max(PROGRAM_MAX_BLOCKS) }),
  /** Spell a word or build a sentence from tiles (or type it). */
  word_builder: z.object({ word: z.string().max(120) }),
} as const;

export const TEXT_FORMAT_DEFAULT = {
  bold: false,
  italic: false,
  underline: false,
  align: 'left',
  size: 'normal',
} as const;
export type TextFormat = z.infer<(typeof answerSchemas)['format_text']>['format'];

/** Creative work: a few short text fields (My Profile, My Dream slides, my own prompt...). */
export const creationRequestSchema = z.object({
  content: z.record(z.string().regex(/^[a-z][a-zA-Z0-9]{0,30}$/), z.string().max(500)),
});
export type CreationRequest = z.infer<typeof creationRequestSchema>;

export type QuestionKind = keyof typeof answerSchemas;
export type AnswerFor<K extends QuestionKind> = z.infer<(typeof answerSchemas)[K]>;
export type AnyAnswer = AnswerFor<QuestionKind>;

export const answerRequestSchema = z.object({
  questionId: z.uuid(),
  answer: z.unknown(),
  /** How long the student thought about it (for analytics). Capped server-side. */
  durationMs: z
    .number()
    .int()
    .min(0)
    .max(60 * 60 * 1000)
    .optional(),
});
export type AnswerRequest = z.infer<typeof answerRequestSchema>;

export const completeLessonRequestSchema = z.object({
  timeSpentSeconds: z
    .number()
    .int()
    .min(0)
    .max(4 * 60 * 60)
    .optional(),
});

export interface AnswerResult {
  correct: boolean;
  /** For matching/ordering: how many parts are right. */
  partial: { correct: number; total: number } | null;
  /** Shown after a correct answer, or once the answer is revealed. */
  explanation: LocalizedText | null;
  /** The correct answer, revealed after 2 tries so nobody gets stuck. */
  revealed: AnyAnswer | null;
  activityCompleted: boolean;
  xpAwarded: number;
  totalXp: number;
}

export interface ActivityCompleteResult {
  activityCompleted: true;
  xpAwarded: number;
  totalXp: number;
}

export interface LessonCompleteResult {
  /** false when replaying a lesson finished before (no new XP). */
  firstCompletion: boolean;
  /** Lesson bonus XP awarded now. */
  xpAwarded: number;
  /** All XP this lesson has given the student (activities + bonus). */
  lessonXpTotal: number;
  totalXp: number;
  level: LevelInfo;
  levelUp: boolean;
  streak: number;
  worldPercent: number;
  nextLessonId: string | null;
  /** Badges and achievements unlocked by finishing this lesson. */
  newAwards: NewAward[];
}

export interface NewAward {
  kind: 'badge' | 'achievement';
  code: string;
  name: LocalizedText;
  icon: string;
  xpBonus: number;
}

export interface NotificationView {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  readAt: string | null;
  createdAt: string;
}
