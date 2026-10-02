import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  date,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  smallint,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createdAt, id, timestamps, updatedAt } from './_columns';
import { achievements, activities, badges, lessons, questions, worlds } from './content';
import { lessonProgressStatus, xpSource } from './enums';
import { students } from './identity';

const studentId = () =>
  uuid('student_id')
    .notNull()
    .references(() => students.userId, { onDelete: 'cascade' });

/** Per-world summary for fast dashboards. Recomputed whenever a lesson is completed. */
export const studentProgress = pgTable(
  'student_progress',
  {
    studentId: studentId(),
    worldId: uuid('world_id')
      .notNull()
      .references(() => worlds.id, { onDelete: 'cascade' }),
    lessonsCompleted: integer('lessons_completed').notNull().default(0),
    lessonsTotal: integer('lessons_total').notNull().default(0),
    percent: smallint('percent').notNull().default(0),
    lastActivityAt: timestamp('last_activity_at', { withTimezone: true }),
    updatedAt: updatedAt(),
  },
  (t) => [
    primaryKey({ name: 'student_progress_pk', columns: [t.studentId, t.worldId] }),
    index('student_progress_world_idx').on(t.worldId),
    check('student_progress_percent_ck', sql`${t.percent} between 0 and 100`),
  ],
);

export const studentLessonProgress = pgTable(
  'student_lesson_progress',
  {
    studentId: studentId(),
    lessonId: uuid('lesson_id')
      .notNull()
      .references(() => lessons.id, { onDelete: 'restrict' }),
    status: lessonProgressStatus('status').notNull().default('in_progress'),
    /** Position of the activity the student is on, so they can resume. */
    currentPosition: integer('current_position').notNull().default(0),
    bestScore: smallint('best_score'),
    attempts: integer('attempts').notNull().default(0),
    /** How many times the lesson was finished. Seeds generated questions, so replays get new numbers. */
    completions: integer('completions').notNull().default(0),
    timeSpentSeconds: integer('time_spent_seconds').notNull().default(0),
    startedAt: timestamp('started_at', { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    updatedAt: updatedAt(),
  },
  (t) => [
    primaryKey({ name: 'student_lesson_progress_pk', columns: [t.studentId, t.lessonId] }),
    index('student_lesson_progress_lesson_status_idx').on(t.lessonId, t.status),
    check('student_lesson_progress_score_ck', sql`${t.bestScore} between 0 and 100`),
  ],
);

/** Every answer a student submits. Used for feedback history and "difficult activity" analytics. */
export const studentActivityAttempts = pgTable(
  'student_activity_attempts',
  {
    id: id(),
    studentId: studentId(),
    activityId: uuid('activity_id')
      .notNull()
      .references(() => activities.id, { onDelete: 'restrict' }),
    questionId: uuid('question_id').references(() => questions.id, { onDelete: 'set null' }),
    answer: jsonb('answer').$type<unknown>().notNull(),
    /** null for unscored activities. */
    isCorrect: boolean('is_correct'),
    score: smallint('score'),
    durationMs: integer('duration_ms'),
    createdAt: createdAt(),
  },
  (t) => [
    index('attempts_student_activity_idx').on(t.studentId, t.activityId),
    index('attempts_activity_correct_idx').on(t.activityId, t.isCorrect),
    index('attempts_created_idx').on(t.createdAt),
    check('attempts_score_ck', sql`${t.score} between 0 and 100`),
  ],
);

/** Creative work (My Profile, My Weekly Budget, My Dream slides, prompts). */
export const studentCreations = pgTable(
  'student_creations',
  {
    studentId: studentId(),
    activityId: uuid('activity_id')
      .notNull()
      .references(() => activities.id, { onDelete: 'restrict' }),
    content: jsonb('content').$type<Record<string, unknown>>().notNull(),
    ...timestamps(),
  },
  (t) => [primaryKey({ name: 'student_creations_pk', columns: [t.studentId, t.activityId] })],
);

/** One row per student per active day: powers streaks and "active students" analytics. */
export const studentDailyActivity = pgTable(
  'student_daily_activity',
  {
    studentId: studentId(),
    day: date('day').notNull(),
    xpEarned: integer('xp_earned').notNull().default(0),
    secondsActive: integer('seconds_active').notNull().default(0),
    activitiesCompleted: integer('activities_completed').notNull().default(0),
    lessonsCompleted: integer('lessons_completed').notNull().default(0),
    updatedAt: updatedAt(),
  },
  (t) => [
    primaryKey({ name: 'student_daily_activity_pk', columns: [t.studentId, t.day] }),
    index('student_daily_activity_day_idx').on(t.day),
  ],
);

/**
 * XP ledger. The unique (student, source_type, source_id) constraint is what makes
 * XP impossible to earn twice for the same activity or lesson.
 */
export const xpTransactions = pgTable(
  'xp_transactions',
  {
    id: id(),
    studentId: studentId(),
    amount: integer('amount').notNull(),
    sourceType: xpSource('source_type').notNull(),
    sourceId: uuid('source_id').notNull(),
    reason: varchar('reason', { length: 200 }),
    createdAt: createdAt(),
  },
  (t) => [
    unique('xp_transactions_source_uq').on(t.studentId, t.sourceType, t.sourceId),
    index('xp_transactions_student_created_idx').on(t.studentId, t.createdAt),
    check('xp_transactions_amount_ck', sql`${t.amount} <> 0`),
  ],
);

export const studentBadges = pgTable(
  'student_badges',
  {
    studentId: studentId(),
    badgeId: uuid('badge_id')
      .notNull()
      .references(() => badges.id, { onDelete: 'cascade' }),
    awardedAt: timestamp('awarded_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ name: 'student_badges_pk', columns: [t.studentId, t.badgeId] }),
    index('student_badges_badge_idx').on(t.badgeId),
  ],
);

export const studentAchievements = pgTable(
  'student_achievements',
  {
    studentId: studentId(),
    achievementId: uuid('achievement_id')
      .notNull()
      .references(() => achievements.id, { onDelete: 'cascade' }),
    awardedAt: timestamp('awarded_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ name: 'student_achievements_pk', columns: [t.studentId, t.achievementId] }),
    index('student_achievements_achievement_idx').on(t.achievementId),
  ],
);
