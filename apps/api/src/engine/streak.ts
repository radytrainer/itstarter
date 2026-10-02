/**
 * Streaks count calendar days in the student's own time zone (default Asia/Phnom_Penh), so
 * "today" doesn't flip at midnight UTC (7am in Cambodia).
 */

/** "YYYY-MM-DD" for an instant in a given IANA time zone. */
export function localDate(instant: Date, timeZone: string): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(instant);
}

/** Whole days from date a to date b (both "YYYY-MM-DD"). */
export function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);
}

export interface StreakState {
  current: number;
  longest: number;
  lastActiveDate: string | null;
}

/** The streak after learning something on `today`. */
export function advanceStreak(state: StreakState, today: string): StreakState {
  if (state.lastActiveDate === today) return state;
  const gap = state.lastActiveDate === null ? Infinity : daysBetween(state.lastActiveDate, today);
  const current = gap === 1 ? state.current + 1 : 1;
  return { current, longest: Math.max(state.longest, current), lastActiveDate: today };
}

/**
 * The streak to SHOW. A streak stays alive through today (the student may still learn today),
 * but is 0 once a whole day has been missed.
 */
export function visibleStreak(state: StreakState, today: string): number {
  if (state.lastActiveDate === null) return 0;
  return daysBetween(state.lastActiveDate, today) <= 1 ? state.current : 0;
}
