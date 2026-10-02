import { hash, verify } from '@node-rs/argon2';

/**
 * Argon2id with the library defaults, which match the OWASP recommendation:
 * 19 MiB memory, 2 iterations, 1 thread. The parameters are stored inside each hash,
 * so they can be raised later without breaking existing passwords.
 */
export function hashPassword(password: string): Promise<string> {
  // 2 = Algorithm.Argon2id (a const enum, which isolatedModules cannot import).
  return hash(password, { algorithm: 2 });
}

/** Returns false (never throws) for a wrong password or a malformed hash. */
export async function verifyPassword(passwordHash: string, password: string): Promise<boolean> {
  try {
    return await verify(passwordHash, password);
  } catch {
    return false;
  }
}
