import {
  COMMITMENT_WINDOW_DAYS,
  MIN_ANSWERS_FOR_ACCURACY,
  SKILL_OF_KIND,
  SKILLS,
  type PerformanceDay,
  type PerformanceSkill,
  type PerformanceWeek,
} from '@itstarter/shared';
import { daysBetween } from './streak';

/** Pure helpers for the performance report (the service only fetches rows). */

export const WEEKS_SHOWN = 8;

export interface DailyRow {
  day: string;
  seconds: number;
  xp: number;
  lessons: number;
}

/** The first answer a student gave to a question (that is what accuracy counts). */
export interface FirstAnswer {
  day: string;
  kind: string;
  worldId: string;
  correct: boolean;
}

/** "YYYY-MM-DD" plus n days (n may be negative). */
export function addDays(day: string, n: number): string {
  return new Date(Date.parse(`${day}T00:00:00Z`) + n * 86_400_000).toISOString().slice(0, 10);
}

/** The Monday of that day's week. */
export function weekStart(day: string): string {
  const weekday = new Date(`${day}T00:00:00Z`).getUTCDay(); // 0 = Sunday
  return addDays(day, -((weekday + 6) % 7));
}

/** Rounded % of correct first answers, or null when there are too few to mean anything. */
export function accuracy(answers: { correct: boolean }[]): number | null {
  if (answers.length < MIN_ANSWERS_FOR_ACCURACY) return null;
  return Math.round((answers.filter((a) => a.correct).length / answers.length) * 100);
}

const minutes = (seconds: number) => Math.round(seconds / 60);

/** The last 28 days ending today (oldest first), with zeros for days without learning. */
export function lastDays(daily: DailyRow[], today: string): PerformanceDay[] {
  const byDay = new Map(daily.map((d) => [d.day, d]));
  return Array.from({ length: COMMITMENT_WINDOW_DAYS }, (_, i) => {
    const day = addDays(today, i - COMMITMENT_WINDOW_DAYS + 1);
    const row = byDay.get(day);
    return { day, minutes: minutes(row?.seconds ?? 0), xp: row?.xp ?? 0 };
  });
}

/** Commitment inputs over the last 28 days. A day counts once the student did anything. */
export function windowTotals(daily: DailyRow[], today: string) {
  const inWindow = daily.filter((d) => {
    const ago = daysBetween(d.day, today);
    return ago >= 0 && ago < COMMITMENT_WINDOW_DAYS;
  });
  return {
    activeDays: inWindow.length,
    minutes: minutes(inWindow.reduce((n, d) => n + d.seconds, 0)),
    lessons: inWindow.reduce((n, d) => n + d.lessons, 0),
  };
}

/** The last 8 weeks (Monday to Sunday, oldest first). */
export function lastWeeks(
  daily: DailyRow[],
  answers: FirstAnswer[],
  today: string,
): PerformanceWeek[] {
  const thisWeek = weekStart(today);
  return Array.from({ length: WEEKS_SHOWN }, (_, i) => {
    const start = addDays(thisWeek, (i - WEEKS_SHOWN + 1) * 7);
    const inWeek = (day: string) => weekStart(day) === start;
    const days = daily.filter((d) => inWeek(d.day));
    const answered = answers.filter((a) => inWeek(a.day));
    return {
      weekStart: start,
      activeDays: days.length,
      minutes: minutes(days.reduce((n, d) => n + d.seconds, 0)),
      lessons: days.reduce((n, d) => n + d.lessons, 0),
      answered: answered.length,
      accuracy: accuracy(answered),
    };
  });
}

/** Accuracy per skill (quiz, numbers, games, coding…), in a fixed order; unused skills left out. */
export function skillBreakdown(answers: FirstAnswer[]): PerformanceSkill[] {
  return SKILLS.map((skill) => {
    const mine = answers.filter((a) => (SKILL_OF_KIND[a.kind] ?? 'quiz') === skill);
    return { skill, answered: mine.length, accuracy: accuracy(mine) };
  }).filter((s) => s.answered > 0);
}
