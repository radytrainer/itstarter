import { describe, expect, it } from 'vitest';
import { commitmentScore } from '@itstarter/shared';
import {
  accuracy,
  addDays,
  lastDays,
  lastWeeks,
  skillBreakdown,
  weekStart,
  windowTotals,
  type FirstAnswer,
} from '../../src/engine/performance';

describe('commitment score', () => {
  it('weighs days learned (40%), minutes (30%) and lessons (30%), each capped at the target', () => {
    expect(commitmentScore({ activeDays: 0, minutes: 0, lessons: 0 })).toMatchObject({
      score: 0,
      level: 'not_started',
    });
    expect(commitmentScore({ activeDays: 12, minutes: 120, lessons: 8 })).toMatchObject({
      score: 100,
      level: 'strong',
      parts: { consistency: 100, effort: 100, progress: 100 },
    });
    // Doing far more than the target in one part can't make up for another.
    expect(commitmentScore({ activeDays: 1, minutes: 900, lessons: 40 }).score).toBe(63);
    expect(commitmentScore({ activeDays: 6, minutes: 60, lessons: 4 })).toMatchObject({
      score: 50,
      level: 'steady',
    });
    expect(commitmentScore({ activeDays: 2, minutes: 10, lessons: 1 }).level).toBe('starting');
  });
});

describe('dates', () => {
  it('finds the Monday of a week and adds days across months', () => {
    expect(weekStart('2026-10-02')).toBe('2026-09-28'); // Friday → Monday
    expect(weekStart('2026-09-28')).toBe('2026-09-28');
    expect(weekStart('2026-10-04')).toBe('2026-09-28'); // Sunday belongs to the same week
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
  });
});

describe('report building', () => {
  const today = '2026-10-02';
  const daily = [
    { day: '2026-10-02', seconds: 600, xp: 40, lessons: 1 },
    { day: '2026-09-20', seconds: 1200, xp: 60, lessons: 2 },
    { day: '2026-08-01', seconds: 3000, xp: 90, lessons: 3 }, // outside the 4 weeks
  ];

  it('counts the last 28 days only', () => {
    expect(windowTotals(daily, today)).toEqual({ activeDays: 2, minutes: 30, lessons: 3 });
    const days = lastDays(daily, today);
    expect(days).toHaveLength(28);
    expect(days[0]!.day).toBe('2026-09-05');
    expect(days.at(-1)).toEqual({ day: today, minutes: 10, xp: 40 });
    expect(days.find((d) => d.day === '2026-09-21')).toEqual({
      day: '2026-09-21',
      minutes: 0,
      xp: 0,
    });
  });

  it('builds 8 weeks, oldest first, with accuracy only when there are enough answers', () => {
    const answers: FirstAnswer[] = [
      ...Array.from({ length: 4 }, () => ({
        day: '2026-10-01',
        kind: 'catch',
        worldId: 'w',
        correct: true,
      })),
      { day: '2026-10-01', kind: 'robot', worldId: 'w', correct: false },
      { day: '2026-09-20', kind: 'number', worldId: 'w', correct: true },
    ];
    const weeks = lastWeeks(daily, answers, today);
    expect(weeks).toHaveLength(8);
    expect(weeks.at(-1)).toMatchObject({
      weekStart: '2026-09-28',
      activeDays: 1,
      answered: 5,
      accuracy: 80,
    });
    expect(weeks.at(-2)).toMatchObject({ weekStart: '2026-09-21', answered: 0, accuracy: null });
    expect(weeks.at(-3)).toMatchObject({
      weekStart: '2026-09-14',
      minutes: 20,
      lessons: 2,
      answered: 1,
      accuracy: null,
    });

    expect(skillBreakdown(answers)).toEqual([
      { skill: 'numbers', answered: 1, accuracy: null },
      { skill: 'games', answered: 4, accuracy: null },
      { skill: 'coding', answered: 1, accuracy: null },
    ]);
    expect(accuracy([])).toBeNull();
  });
});
