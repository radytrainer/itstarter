import { eq, sql } from 'drizzle-orm';
import type { DbExecutor } from '../../db/client';
import { students, xpTransactions } from '../../db/schema';

/**
 * Adds XP exactly once per (student, source). The unique constraint does the real work:
 * a duplicate insert is ignored and the total is not touched.
 */
export async function awardXp(
  tx: DbExecutor,
  studentId: string,
  sourceType: 'activity' | 'lesson' | 'achievement' | 'admin',
  sourceId: string,
  amount: number,
): Promise<number> {
  if (amount <= 0) return 0;
  const inserted = await tx
    .insert(xpTransactions)
    .values({ studentId, amount, sourceType, sourceId })
    .onConflictDoNothing()
    .returning({ id: xpTransactions.id });
  if (inserted.length === 0) return 0;
  await tx
    .update(students)
    .set({ xpTotal: sql`${students.xpTotal} + ${amount}` })
    .where(eq(students.userId, studentId));
  return amount;
}
