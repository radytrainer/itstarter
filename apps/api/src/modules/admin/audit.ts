import type { DbExecutor } from '../../db/client';
import { auditLogs } from '../../db/schema';
import type { SessionUser } from '../auth/sessions';

/** Records who changed what. Never put passwords or tokens in metadata. */
export async function audit(
  db: DbExecutor,
  actor: SessionUser,
  action: string,
  entityType: string,
  entityId: string | null,
  metadata: Record<string, unknown> = {},
): Promise<void> {
  await db.insert(auditLogs).values({
    actorUserId: actor.id,
    action,
    entityType,
    entityId,
    metadata: { actorRole: actor.role, ...metadata },
  });
}

/** PostgreSQL unique violation (possibly wrapped by Drizzle). */
export function isUniqueViolation(err: unknown): boolean {
  let current: unknown = err;
  for (let i = 0; current && i < 5; i += 1) {
    if (typeof current === 'object' && 'code' in current && current.code === '23505') return true;
    current = (current as { cause?: unknown }).cause;
  }
  return false;
}
