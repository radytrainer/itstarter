import { createHash } from 'node:crypto';

/** A random-number function (0 ≤ x < 1) that always gives the same sequence for the same seed. */
export type Rng = () => number;

export function createRng(seed: string): Rng {
  const digest = createHash('sha256').update(seed).digest();
  let state = digest.readUInt32LE(0) || 1;
  // mulberry32: tiny, fast, good enough for shuffling options and making practice numbers.
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Whole number from min to max (both included). */
export function randomInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

export function pick<T>(rng: Rng, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)]!;
}

/**
 * Shuffles items in a way that is random-looking but stable for the same seed, so a student
 * sees the same option order if they reload, while the correct answer isn't always first.
 */
export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  return shuffleWith(createRng(seed), items);
}

/** Fisher–Yates shuffle driven by an existing random sequence. */
export function shuffleWith<T>(rng: Rng, items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}
