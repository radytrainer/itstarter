import { describe, expect, it } from 'vitest';
import { hashPassword, verifyPassword } from '../../src/lib/password';

describe('password hashing', () => {
  it('produces an Argon2id hash with the OWASP parameters', async () => {
    const hash = await hashPassword('Correct-Horse-42');
    expect(hash).toMatch(/^\$argon2id\$v=19\$m=19456,t=2,p=1\$/);
    expect(hash).not.toContain('Correct-Horse-42');
  });

  it('salts every hash differently', async () => {
    const [a, b] = await Promise.all([hashPassword('same'), hashPassword('same')]);
    expect(a).not.toBe(b);
  });

  it('verifies the right password and rejects others', async () => {
    const hash = await hashPassword('Correct-Horse-42');
    expect(await verifyPassword(hash, 'Correct-Horse-42')).toBe(true);
    expect(await verifyPassword(hash, 'correct-horse-42')).toBe(false);
    expect(await verifyPassword(hash, '')).toBe(false);
  });

  it('returns false instead of throwing for a malformed hash', async () => {
    expect(await verifyPassword('not-a-hash', 'anything')).toBe(false);
  });

  it('handles Khmer and emoji passwords', async () => {
    const hash = await hashPassword('ពាក្យសម្ងាត់🔑');
    expect(await verifyPassword(hash, 'ពាក្យសម្ងាត់🔑')).toBe(true);
  });
});
