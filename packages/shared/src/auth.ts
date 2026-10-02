import { z } from 'zod';
import { LOCALES } from './i18n';
import { ROLES } from './domain';

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;

/** Usernames are matched case-insensitively and without surrounding spaces. */
export const normalizeUsername = (raw: string) => raw.trim().toLowerCase();

export const loginRequestSchema = z.object({
  username: z.string().trim().min(1).max(50),
  password: z.string().min(1).max(PASSWORD_MAX_LENGTH),
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const changePasswordRequestSchema = z.object({
  currentPassword: z.string().min(1).max(PASSWORD_MAX_LENGTH),
  newPassword: z.string().max(PASSWORD_MAX_LENGTH),
});
export type ChangePasswordRequest = z.infer<typeof changePasswordRequestSchema>;

export type PasswordProblem = 'TOO_SHORT' | 'TOO_LONG' | 'SAME_AS_USERNAME' | 'SAME_AS_CURRENT';

/**
 * Simple, explainable rules for beginners: long enough, not your username, not the old one.
 * (Length beats complexity rules; the login rate limit handles guessing.)
 */
export function checkNewPassword(
  newPassword: string,
  context: { username: string; currentPassword?: string },
): PasswordProblem[] {
  const problems: PasswordProblem[] = [];
  if (newPassword.length < PASSWORD_MIN_LENGTH) problems.push('TOO_SHORT');
  if (newPassword.length > PASSWORD_MAX_LENGTH) problems.push('TOO_LONG');
  if (normalizeUsername(newPassword) === normalizeUsername(context.username)) {
    problems.push('SAME_AS_USERNAME');
  }
  if (context.currentPassword !== undefined && newPassword === context.currentPassword) {
    problems.push('SAME_AS_CURRENT');
  }
  return problems;
}

/** The signed-in user as the API returns it. Never includes the password hash. */
export const authUserSchema = z.object({
  id: z.uuid(),
  username: z.string(),
  displayName: z.string(),
  role: z.enum(ROLES),
  locale: z.enum(LOCALES),
  mustChangePassword: z.boolean(),
});
export type AuthUser = z.infer<typeof authUserSchema>;

/** Header every state-changing request must carry (CSRF protection; see docs/SECURITY.md). */
export const CSRF_HEADER = 'x-requested-with';
export const CSRF_HEADER_VALUE = 'itstarter';

/** What a user may change about their own account. */
export const updateMeRequestSchema = z.object({
  locale: z.enum(LOCALES),
});
export type UpdateMeRequest = z.infer<typeof updateMeRequestSchema>;
