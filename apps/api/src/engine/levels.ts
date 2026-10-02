import type { LocalizedText } from '@itstarter/shared';

export interface LevelDef {
  number: number;
  name: LocalizedText;
  icon: string;
  minXp: number;
}

export interface LevelStatus {
  current: LevelDef;
  /** null when the student is at the top level. */
  next: LevelDef | null;
  /** XP still needed for the next level (0 at the top). */
  xpToNext: number;
  /** 0–100 progress from the current level to the next. */
  percentToNext: number;
}

/** Which level an XP total belongs to. `levels` may come in any order. */
export function levelFor(xp: number, levels: LevelDef[]): LevelStatus {
  const sorted = [...levels].sort((a, b) => a.minXp - b.minXp);
  if (sorted.length === 0) throw new Error('No levels defined');

  let index = 0;
  for (let i = 0; i < sorted.length; i += 1) {
    if (xp >= sorted[i]!.minXp) index = i;
  }
  const current = sorted[index]!;
  const next = sorted[index + 1] ?? null;
  if (!next) return { current, next: null, xpToNext: 0, percentToNext: 100 };

  const span = next.minXp - current.minXp;
  return {
    current,
    next,
    xpToNext: next.minXp - xp,
    percentToNext: Math.floor(((xp - current.minXp) / span) * 100),
  };
}
