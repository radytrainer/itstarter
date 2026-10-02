import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  date,
  index,
  integer,
  pgTable,
  primaryKey,
  smallint,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import type { Role } from '@itstarter/shared';
import { createdAt, deletedAt, id, timestamps } from './_columns';
import { courses } from './content';
import { userStatus } from './enums';

export const roles = pgTable('roles', {
  id: smallint('id').primaryKey(),
  code: varchar('code', { length: 20 }).$type<Role>().notNull().unique('roles_code_uq'),
});

export const users = pgTable(
  'users',
  {
    id: id(),
    /** Always lowercase; students type it on small keyboards, so keep it simple. */
    username: varchar('username', { length: 50 }).notNull(),
    email: varchar('email', { length: 254 }),
    passwordHash: text('password_hash').notNull(),
    roleId: smallint('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'restrict' }),
    displayName: varchar('display_name', { length: 80 }).notNull(),
    locale: varchar('locale', { length: 5 }).notNull().default('en'),
    status: userStatus('status').notNull().default('active'),
    mustChangePassword: boolean('must_change_password').notNull().default(false),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
    ...timestamps(),
    deletedAt: deletedAt(),
  },
  (t) => [
    // Unique among non-deleted users, so a username can be reused after soft delete.
    uniqueIndex('users_username_active_uq')
      .on(t.username)
      .where(sql`${t.deletedAt} is null`),
    uniqueIndex('users_email_active_uq')
      .on(sql`lower(${t.email})`)
      .where(sql`${t.email} is not null and ${t.deletedAt} is null`),
    index('users_role_idx').on(t.roleId),
    check('users_username_ck', sql`${t.username} ~ '^[a-z0-9][a-z0-9._-]{2,49}$'`),
    check('users_locale_ck', sql`${t.locale} in ('en', 'km')`),
  ],
);

export const cohorts = pgTable(
  'cohorts',
  {
    id: id(),
    courseId: uuid('course_id')
      .notNull()
      .references(() => courses.id, { onDelete: 'restrict' }),
    name: varchar('name', { length: 100 }).notNull(),
    year: smallint('year').notNull(),
    ...timestamps(),
    deletedAt: deletedAt(),
  },
  (t) => [unique('cohorts_course_name_uq').on(t.courseId, t.name)],
);

export const students = pgTable(
  'students',
  {
    userId: uuid('user_id')
      .primaryKey()
      .references(() => users.id, { onDelete: 'cascade' }),
    cohortId: uuid('cohort_id').references(() => cohorts.id, { onDelete: 'set null' }),
    /** Cached sum of xp_transactions; the ledger is the source of truth. */
    xpTotal: integer('xp_total').notNull().default(0),
    level: smallint('level').notNull().default(1),
    currentStreak: integer('current_streak').notNull().default(0),
    longestStreak: integer('longest_streak').notNull().default(0),
    lastActiveDate: date('last_active_date'),
    timezone: varchar('timezone', { length: 40 }).notNull().default('Asia/Phnom_Penh'),
    ...timestamps(),
  },
  (t) => [
    index('students_cohort_idx').on(t.cohortId),
    index('students_xp_idx').on(t.xpTotal),
    check('students_xp_ck', sql`${t.xpTotal} >= 0`),
    check('students_streak_ck', sql`${t.currentStreak} >= 0 and ${t.longestStreak} >= 0`),
  ],
);

/** Profile for TEACHER and ADMIN users (the brief's "admins" table). */
export const staff = pgTable('staff', {
  userId: uuid('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 80 }),
  ...timestamps(),
});

export const teacherCohorts = pgTable(
  'teacher_cohorts',
  {
    staffUserId: uuid('staff_user_id')
      .notNull()
      .references(() => staff.userId, { onDelete: 'cascade' }),
    cohortId: uuid('cohort_id')
      .notNull()
      .references(() => cohorts.id, { onDelete: 'cascade' }),
    createdAt: createdAt(),
  },
  (t) => [
    primaryKey({ name: 'teacher_cohorts_pk', columns: [t.staffUserId, t.cohortId] }),
    index('teacher_cohorts_cohort_idx').on(t.cohortId),
  ],
);

/** Login sessions. Only a SHA-256 hash of the token is stored. */
export const sessions = pgTable(
  'sessions',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    tokenHash: varchar('token_hash', { length: 64 }).notNull().unique('sessions_token_hash_uq'),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    lastSeenAt: timestamp('last_seen_at', { withTimezone: true }).notNull().defaultNow(),
    userAgent: varchar('user_agent', { length: 255 }),
    revokedAt: timestamp('revoked_at', { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [index('sessions_user_idx').on(t.userId), index('sessions_expires_idx').on(t.expiresAt)],
);
