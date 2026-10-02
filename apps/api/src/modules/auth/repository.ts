import { and, eq, isNull } from 'drizzle-orm';
import type { Locale } from '@itstarter/shared';
import type { DbExecutor } from '../../db/client';
import { roles, users } from '../../db/schema';

export async function findUserByUsername(db: DbExecutor, username: string) {
  const [row] = await db
    .select({
      id: users.id,
      username: users.username,
      displayName: users.displayName,
      locale: users.locale,
      status: users.status,
      mustChangePassword: users.mustChangePassword,
      passwordHash: users.passwordHash,
      role: roles.code,
    })
    .from(users)
    .innerJoin(roles, eq(roles.id, users.roleId))
    .where(and(eq(users.username, username), isNull(users.deletedAt)));
  return row ? { ...row, locale: row.locale as Locale } : undefined;
}

export async function findPasswordHash(db: DbExecutor, userId: string) {
  const [row] = await db
    .select({ passwordHash: users.passwordHash })
    .from(users)
    .where(and(eq(users.id, userId), isNull(users.deletedAt)));
  return row?.passwordHash;
}

export async function recordLogin(db: DbExecutor, userId: string) {
  await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, userId));
}

export async function setPassword(
  db: DbExecutor,
  userId: string,
  passwordHash: string,
  mustChangePassword: boolean,
) {
  await db.update(users).set({ passwordHash, mustChangePassword }).where(eq(users.id, userId));
}

export async function setLocale(db: DbExecutor, userId: string, locale: Locale) {
  await db.update(users).set({ locale }).where(eq(users.id, userId));
}
