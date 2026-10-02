import { pgEnum } from 'drizzle-orm/pg-core';
import {
  CONTENT_STATUSES,
  LESSON_PROGRESS_STATUSES,
  LESSON_STEPS,
  USER_STATUSES,
  XP_SOURCES,
} from '@itstarter/shared';

// Small, stable value sets become PostgreSQL enums. Activity types stay text (see shared/domain.ts).
export const userStatus = pgEnum('user_status', USER_STATUSES);
export const contentStatus = pgEnum('content_status', CONTENT_STATUSES);
export const lessonStep = pgEnum('lesson_step', LESSON_STEPS);
export const lessonProgressStatus = pgEnum('lesson_progress_status', LESSON_PROGRESS_STATUSES);
export const xpSource = pgEnum('xp_source', XP_SOURCES);
