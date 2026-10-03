import { z } from 'zod';

export const ROLES = ['STUDENT', 'TEACHER', 'ADMIN'] as const;
export type Role = (typeof ROLES)[number];

export const USER_STATUSES = ['active', 'disabled'] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export const CONTENT_STATUSES = ['draft', 'published', 'archived'] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

/** The six steps every lesson follows, in order. */
export const LESSON_STEPS = ['welcome', 'learn', 'see', 'play', 'challenge', 'reward'] as const;
export type LessonStep = (typeof LESSON_STEPS)[number];

export const LESSON_PROGRESS_STATUSES = ['in_progress', 'completed'] as const;
export type LessonProgressStatus = (typeof LESSON_PROGRESS_STATUSES)[number];

export const XP_SOURCES = ['activity', 'lesson', 'achievement', 'admin'] as const;
export type XpSource = (typeof XP_SOURCES)[number];

/**
 * Activity types the learning engine knows. Stored as text (not a DB enum) so new
 * types can be added in later phases without a database migration.
 */
export const ACTIVITY_TYPES = [
  // content (not scored)
  'intro',
  'learn_card',
  'see_example',
  'reward',
  // quiz
  'multiple_choice',
  'true_false',
  'image_choice',
  'safe_or_dangerous',
  // interactive
  'drag_drop',
  'matching',
  'ordering',
  'tap_objects',
  'number_input',
  'pattern',
  'math_generator',
  /** Moving games: catch, memory cards, robot path, word builder. */
  'game',
  /** "Words to know": the lesson's key IT words (English ↔ Khmer, listen, spell). */
  'vocabulary',
  // simulations
  'mouse_trainer',
  'keyboard_challenge',
  'shortcut_quiz',
  'file_explorer_sim',
  'word_sim',
  'spreadsheet_sim',
  'slides_sim',
  'search_sim',
  'email_sim',
  // creative / AI
  'creation',
  'free_text',
  'profile_builder',
  'prompt_builder',
  'prompt_compare',
  'ai_fact_check',
] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

/** Image or illustration attached to content. `alt` is required for accessibility. */
export const mediaSchema = z.object({
  type: z.enum(['emoji', 'image', 'svg']),
  src: z.string().min(1),
  alt: z.string().min(1),
});
export type Media = z.infer<typeof mediaSchema>;

/** Rules that award a badge or achievement. Evaluated by the gamification engine. */
export const awardCriteriaSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('world_completed'), worldSlug: z.string() }),
  z.object({ type: z.literal('course_completed'), courseSlug: z.string() }),
  z.object({ type: z.literal('lessons_completed'), count: z.number().int().positive() }),
  z.object({ type: z.literal('xp_reached'), xp: z.number().int().positive() }),
  z.object({ type: z.literal('streak_days'), days: z.number().int().positive() }),
  z.object({
    type: z.literal('activity_type_completed'),
    activityType: z.enum(ACTIVITY_TYPES),
    count: z.number().int().positive(),
  }),
]);
export type AwardCriteria = z.infer<typeof awardCriteriaSchema>;
