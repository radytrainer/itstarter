import { z } from 'zod';
import {
  ACTIVITY_TYPES,
  awardCriteriaSchema,
  CONTENT_STATUSES,
  LESSON_STEPS,
  mediaSchema,
} from './domain';
import { localizedTextSchema } from './i18n';

/** Same rule as the database check: lowercase letters, digits, . _ - ; 3–50 characters. */
export const USERNAME_PATTERN = /^[a-z0-9][a-z0-9._-]{2,49}$/;
export const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(USERNAME_PATTERN, 'Use 3–50 lowercase letters, numbers, dots, dashes or underscores');

export const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(80)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use lowercase words joined by dashes, e.g. my-lesson');

const contentStatus = z.enum(CONTENT_STATUSES);
const nullableText = localizedTextSchema.nullable().optional();

// ---------- People ----------

export const createStudentSchema = z.object({
  username: usernameSchema,
  displayName: z.string().trim().min(1).max(80),
  cohortId: z.uuid().nullable().optional(),
});

export const updateStudentSchema = z.object({
  displayName: z.string().trim().min(1).max(80).optional(),
  cohortId: z.uuid().nullable().optional(),
  status: z.enum(['active', 'disabled']).optional(),
});

export const importStudentsSchema = z.object({
  csv: z.string().min(1).max(200_000),
  /** Check everything and report problems, but create nobody. */
  dryRun: z.boolean().default(false),
});

export const createCohortSchema = z.object({
  name: z.string().trim().min(1).max(100),
  year: z.number().int().min(2000).max(2100),
  courseId: z.uuid().optional(),
});

export const createStaffSchema = z.object({
  username: usernameSchema,
  displayName: z.string().trim().min(1).max(80),
  role: z.enum(['TEACHER', 'ADMIN']),
  cohortIds: z.array(z.uuid()).max(50).default([]),
});

export const studentListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().min(1).max(50).optional(),
  cohortId: z.uuid().optional(),
  status: z.enum(['active', 'disabled']).optional(),
});

/** The result of a CSV import (or a dry run). Temporary passwords are shown ONCE. */
export interface ImportRowResult {
  line: number;
  username: string;
  displayName: string;
  cohort: string | null;
  problems: string[];
  temporaryPassword?: string;
}

// ---------- Content ----------

export const courseInputSchema = z.object({
  slug: slugSchema,
  title: localizedTextSchema,
  description: nullableText,
  status: contentStatus.optional(),
});

export const worldInputSchema = z.object({
  slug: slugSchema,
  title: localizedTextSchema,
  description: nullableText,
  icon: z.string().trim().min(1).max(16),
  color: z.string().trim().min(1).max(20),
  status: contentStatus.optional(),
  badgeId: z.uuid().nullable().optional(),
});

const lessonFields = z.object({
  slug: slugSchema,
  title: localizedTextSchema,
  summary: nullableText,
  icon: z.string().trim().max(16).nullable().optional(),
  estimatedMinutes: z.number().int().min(1).max(60),
  xpReward: z.number().int().min(0).max(1000),
  status: contentStatus.optional(),
});
/** Creating: missing numbers get sensible defaults. */
export const lessonInputSchema = lessonFields.extend({
  estimatedMinutes: lessonFields.shape.estimatedMinutes.default(5),
  xpReward: lessonFields.shape.xpReward.default(50),
});
/**
 * Updating: ONLY the fields sent are changed. (A .partial() of the create schema would still
 * fill in defaults and silently overwrite values the admin never touched.)
 */
export const lessonPatchSchema = lessonFields.partial();

const activityFields = z.object({
  step: z.enum(LESSON_STEPS),
  type: z.enum(ACTIVITY_TYPES),
  title: nullableText,
  config: z.record(z.string(), z.unknown()),
  isScored: z.boolean(),
  passScore: z.number().int().min(0).max(100),
  xpReward: z.number().int().min(0).max(1000),
  status: contentStatus.optional(),
});
export const activityInputSchema = activityFields.extend({
  config: activityFields.shape.config.default({}),
  isScored: activityFields.shape.isScored.default(false),
  passScore: activityFields.shape.passScore.default(0),
  xpReward: activityFields.shape.xpReward.default(10),
});
/** Updating: only the fields sent (see lessonPatchSchema). */
export const activityPatchSchema = activityFields.partial();

export const questionOptionInputSchema = z.object({
  label: localizedTextSchema,
  media: mediaSchema.nullable().optional(),
  isCorrect: z.boolean().default(false),
  groupKey: z.string().trim().max(40).nullable().optional(),
  matchKey: z.string().trim().max(40).nullable().optional(),
  correctOrder: z.number().int().min(1).max(50).nullable().optional(),
});

export const questionInputSchema = z.object({
  kind: z.string().trim().min(1).max(40),
  prompt: localizedTextSchema,
  hint: nullableText,
  explanation: nullableText,
  difficulty: z.number().int().min(1).max(3).default(1),
  config: z.record(z.string(), z.unknown()).default({}),
  publicConfig: z.record(z.string(), z.unknown()).default({}),
  options: z.array(questionOptionInputSchema).max(30).default([]),
});
export type QuestionInput = z.infer<typeof questionInputSchema>;

export const reorderSchema = z.object({ ids: z.array(z.uuid()).min(1).max(200) });

export const badgeInputSchema = z.object({
  code: slugSchema,
  name: localizedTextSchema,
  description: localizedTextSchema,
  icon: z.string().trim().min(1).max(16),
  criteria: awardCriteriaSchema,
  status: contentStatus.optional(),
});

// ---------- CSV ----------

/**
 * Small RFC 4180-style CSV parser: commas, "quoted, values", "" for a quote, CRLF or LF.
 * Used by the import preview in the browser AND by the API, so both see the same rows.
 */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  const input = text.replace(/^\uFEFF/, ''); // Excel adds a byte-order mark

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i]!;
    if (quoted) {
      if (char === '"' && input[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && input[i + 1] === '\n') i += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}
