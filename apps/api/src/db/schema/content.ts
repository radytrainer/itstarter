import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  type AnyPgColumn,
  index,
  integer,
  jsonb,
  pgTable,
  smallint,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import type { AwardCriteria, LocalizedText, Media } from '@itstarter/shared';
import { deletedAt, id, position, timestamps } from './_columns';
import { contentStatus, lessonStep } from './enums';

const slugCheck = (name: string, column: AnyPgColumn) =>
  check(name, sql`${column} ~ '^[a-z0-9]+(-[a-z0-9]+)*$'`);

export const badges = pgTable(
  'badges',
  {
    id: id(),
    code: varchar('code', { length: 40 }).notNull().unique('badges_code_uq'),
    name: jsonb('name').$type<LocalizedText>().notNull(),
    description: jsonb('description').$type<LocalizedText>().notNull(),
    icon: varchar('icon', { length: 16 }).notNull(),
    criteria: jsonb('criteria').$type<AwardCriteria>().notNull(),
    status: contentStatus('status').notNull().default('published'),
    position: position(),
    ...timestamps(),
  },
  (t) => [index('badges_status_position_idx').on(t.status, t.position)],
);

export const achievements = pgTable(
  'achievements',
  {
    id: id(),
    code: varchar('code', { length: 40 }).notNull().unique('achievements_code_uq'),
    name: jsonb('name').$type<LocalizedText>().notNull(),
    description: jsonb('description').$type<LocalizedText>().notNull(),
    icon: varchar('icon', { length: 16 }).notNull(),
    criteria: jsonb('criteria').$type<AwardCriteria>().notNull(),
    xpBonus: integer('xp_bonus').notNull().default(0),
    status: contentStatus('status').notNull().default('published'),
    position: position(),
    ...timestamps(),
  },
  (t) => [check('achievements_xp_bonus_ck', sql`${t.xpBonus} >= 0`)],
);

/** Level thresholds (🌱 Curious Beginner → 🚀 IT Starter). Data, so admins can tune them. */
export const levels = pgTable(
  'levels',
  {
    number: smallint('number').primaryKey(),
    name: jsonb('name').$type<LocalizedText>().notNull(),
    icon: varchar('icon', { length: 16 }).notNull(),
    minXp: integer('min_xp').notNull().unique('levels_min_xp_uq'),
    ...timestamps(),
  },
  (t) => [
    check('levels_number_ck', sql`${t.number} >= 1`),
    check('levels_min_xp_ck', sql`${t.minXp} >= 0`),
  ],
);

export const courses = pgTable(
  'courses',
  {
    id: id(),
    slug: varchar('slug', { length: 80 }).notNull(),
    title: jsonb('title').$type<LocalizedText>().notNull(),
    description: jsonb('description').$type<LocalizedText>(),
    status: contentStatus('status').notNull().default('draft'),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    ...timestamps(),
    deletedAt: deletedAt(),
  },
  (t) => [unique('courses_slug_uq').on(t.slug), slugCheck('courses_slug_ck', t.slug)],
);

export const worlds = pgTable(
  'worlds',
  {
    id: id(),
    courseId: uuid('course_id')
      .notNull()
      .references(() => courses.id, { onDelete: 'restrict' }),
    slug: varchar('slug', { length: 80 }).notNull(),
    title: jsonb('title').$type<LocalizedText>().notNull(),
    description: jsonb('description').$type<LocalizedText>(),
    icon: varchar('icon', { length: 16 }).notNull(),
    /** Design-token name, e.g. "violet". The web app maps it to real colours. */
    color: varchar('color', { length: 20 }).notNull(),
    position: position(),
    status: contentStatus('status').notNull().default('draft'),
    badgeId: uuid('badge_id').references(() => badges.id, { onDelete: 'set null' }),
    ...timestamps(),
    deletedAt: deletedAt(),
  },
  (t) => [
    unique('worlds_course_slug_uq').on(t.courseId, t.slug),
    index('worlds_course_position_idx').on(t.courseId, t.position),
    slugCheck('worlds_slug_ck', t.slug),
  ],
);

export const lessons = pgTable(
  'lessons',
  {
    id: id(),
    worldId: uuid('world_id')
      .notNull()
      .references(() => worlds.id, { onDelete: 'restrict' }),
    slug: varchar('slug', { length: 80 }).notNull(),
    title: jsonb('title').$type<LocalizedText>().notNull(),
    summary: jsonb('summary').$type<LocalizedText>(),
    icon: varchar('icon', { length: 16 }),
    estimatedMinutes: smallint('estimated_minutes').notNull().default(5),
    /** Bonus XP for finishing the whole lesson (activities give their own XP). */
    xpReward: integer('xp_reward').notNull().default(50),
    /** Version of the built-in content this lesson came from; the seed upgrades older ones. */
    seedRevision: smallint('seed_revision').notNull().default(1),
    position: position(),
    status: contentStatus('status').notNull().default('draft'),
    ...timestamps(),
    deletedAt: deletedAt(),
  },
  (t) => [
    unique('lessons_world_slug_uq').on(t.worldId, t.slug),
    index('lessons_world_position_idx').on(t.worldId, t.position),
    slugCheck('lessons_slug_ck', t.slug),
    check('lessons_minutes_ck', sql`${t.estimatedMinutes} between 1 and 60`),
    check('lessons_xp_ck', sql`${t.xpReward} >= 0`),
  ],
);

/**
 * One step of a lesson. `config` is PUBLIC: it is sent to the student's phone, so it
 * must never contain answers. Answers live in questions/question_options.
 */
export const activities = pgTable(
  'activities',
  {
    id: id(),
    lessonId: uuid('lesson_id')
      .notNull()
      .references(() => lessons.id, { onDelete: 'restrict' }),
    step: lessonStep('step').notNull(),
    type: varchar('type', { length: 40 }).notNull(),
    title: jsonb('title').$type<LocalizedText>(),
    config: jsonb('config').$type<Record<string, unknown>>().notNull().default({}),
    isScored: boolean('is_scored').notNull().default(false),
    /** Minimum percentage of correct answers to count as completed (0 = any attempt). */
    passScore: smallint('pass_score').notNull().default(0),
    xpReward: integer('xp_reward').notNull().default(10),
    position: position(),
    status: contentStatus('status').notNull().default('published'),
    ...timestamps(),
    deletedAt: deletedAt(),
  },
  (t) => [
    index('activities_lesson_position_idx').on(t.lessonId, t.position),
    check('activities_pass_score_ck', sql`${t.passScore} between 0 and 100`),
    check('activities_xp_ck', sql`${t.xpReward} >= 0`),
  ],
);

/**
 * A question inside an activity. `config` is PRIVATE: it may hold the expected answer
 * (e.g. `{ "answer": 25 }`) and is never sent to students as-is.
 */
export const questions = pgTable(
  'questions',
  {
    id: id(),
    activityId: uuid('activity_id')
      .notNull()
      .references(() => activities.id, { onDelete: 'cascade' }),
    kind: varchar('kind', { length: 40 }).notNull(),
    prompt: jsonb('prompt').$type<LocalizedText>().notNull(),
    media: jsonb('media').$type<Media>(),
    hint: jsonb('hint').$type<LocalizedText>(),
    explanation: jsonb('explanation').$type<LocalizedText>(),
    difficulty: smallint('difficulty').notNull().default(1),
    config: jsonb('config').$type<Record<string, unknown>>().notNull().default({}),
    /** PUBLIC data shown with the question (a mock email, a spreadsheet grid, keys to press...). */
    publicConfig: jsonb('public_config').$type<Record<string, unknown>>().notNull().default({}),
    position: position(),
    ...timestamps(),
  },
  (t) => [
    index('questions_activity_position_idx').on(t.activityId, t.position),
    check('questions_difficulty_ck', sql`${t.difficulty} between 1 and 3`),
  ],
);

export const questionOptions = pgTable(
  'question_options',
  {
    id: id(),
    questionId: uuid('question_id')
      .notNull()
      .references(() => questions.id, { onDelete: 'cascade' }),
    label: jsonb('label').$type<LocalizedText>().notNull(),
    media: jsonb('media').$type<Media>(),
    /** PUBLIC display grouping: matching side ("left"/"right") or drag-and-drop bucket. */
    groupKey: varchar('group_key', { length: 40 }),
    /** PRIVATE — stripped before sending to students. */
    isCorrect: boolean('is_correct').notNull().default(false),
    /** For matching: options with the same key belong together. PRIVATE. */
    matchKey: varchar('match_key', { length: 40 }),
    /** For ordering: 1-based correct position. PRIVATE. */
    correctOrder: smallint('correct_order'),
    position: position(),
    ...timestamps(),
  },
  (t) => [index('question_options_question_idx').on(t.questionId, t.position)],
);
