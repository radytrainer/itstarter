import { describe, expect, it } from 'vitest';
import { levelFor, type LevelDef } from '../../src/engine/levels';
import { advanceStreak, daysBetween, localDate, visibleStreak } from '../../src/engine/streak';
import { percent, pickContinueLesson } from '../../src/modules/progress/service';
import type { CourseStructure } from '../../src/modules/content/service';

const LEVELS: LevelDef[] = [
  { number: 3, name: { en: 'Digital Creator' }, icon: '🛠️', minXp: 900 },
  { number: 1, name: { en: 'Curious Beginner' }, icon: '🌱', minXp: 0 },
  { number: 2, name: { en: 'IT Explorer' }, icon: '🔍', minXp: 300 },
];

describe('levelFor', () => {
  it('starts at level 1 with 0 XP', () => {
    const s = levelFor(0, LEVELS);
    expect(s.current.number).toBe(1);
    expect(s.next?.number).toBe(2);
    expect(s.xpToNext).toBe(300);
    expect(s.percentToNext).toBe(0);
  });

  it('moves up exactly at the threshold', () => {
    expect(levelFor(299, LEVELS).current.number).toBe(1);
    expect(levelFor(300, LEVELS).current.number).toBe(2);
  });

  it('reports progress inside a level', () => {
    const s = levelFor(600, LEVELS); // halfway from 300 to 900
    expect(s.percentToNext).toBe(50);
    expect(s.xpToNext).toBe(300);
  });

  it('caps at the top level', () => {
    const s = levelFor(5000, LEVELS);
    expect(s.current.number).toBe(3);
    expect(s.next).toBeNull();
    expect(s.percentToNext).toBe(100);
  });
});

describe('streaks', () => {
  it('uses the local calendar day (Phnom Penh is UTC+7)', () => {
    const lateEveningUtc = new Date('2028-03-01T18:30:00Z'); // 01:30 on 2 March in Phnom Penh
    expect(localDate(lateEveningUtc, 'Asia/Phnom_Penh')).toBe('2028-03-02');
    expect(localDate(lateEveningUtc, 'UTC')).toBe('2028-03-01');
  });

  it('counts days across months and leap days', () => {
    expect(daysBetween('2028-02-28', '2028-03-01')).toBe(2);
    expect(daysBetween('2027-12-31', '2028-01-01')).toBe(1);
  });

  const start = { current: 0, longest: 0, lastActiveDate: null };

  it('starts at 1, grows on consecutive days, ignores repeats on the same day', () => {
    let s = advanceStreak(start, '2028-03-01');
    expect(s.current).toBe(1);
    s = advanceStreak(s, '2028-03-01');
    expect(s.current).toBe(1);
    s = advanceStreak(s, '2028-03-02');
    s = advanceStreak(s, '2028-03-03');
    expect(s).toEqual({ current: 3, longest: 3, lastActiveDate: '2028-03-03' });
  });

  it('restarts after a missed day but remembers the longest', () => {
    const s = advanceStreak({ current: 5, longest: 5, lastActiveDate: '2028-03-01' }, '2028-03-04');
    expect(s).toEqual({ current: 1, longest: 5, lastActiveDate: '2028-03-04' });
  });

  it('shows yesterday’s streak today (you can still keep it) but 0 after a missed day', () => {
    const s = { current: 4, longest: 4, lastActiveDate: '2028-03-01' };
    expect(visibleStreak(s, '2028-03-01')).toBe(4);
    expect(visibleStreak(s, '2028-03-02')).toBe(4);
    expect(visibleStreak(s, '2028-03-03')).toBe(0);
    expect(visibleStreak(start, '2028-03-03')).toBe(0);
  });
});

describe('percent', () => {
  it('rounds and handles empty worlds', () => {
    expect(percent(1, 3)).toBe(33);
    expect(percent(2, 3)).toBe(67);
    expect(percent(0, 0)).toBe(0);
  });
});

describe('pickContinueLesson', () => {
  const lesson = (id: string) => ({
    id,
    slug: id,
    title: { en: id },
    summary: null,
    icon: null,
    estimatedMinutes: 5,
    xpReward: 50,
    position: 0,
  });
  const course: CourseStructure = {
    id: 'c',
    slug: 'c',
    title: { en: 'c' },
    description: null,
    worlds: [
      {
        id: 'w1',
        slug: 'w1',
        title: { en: 'W1' },
        description: null,
        icon: '🧠',
        color: 'violet',
        position: 1,
        lessons: [lesson('a'), lesson('b')],
      },
      {
        id: 'w2',
        slug: 'w2',
        title: { en: 'W2' },
        description: null,
        icon: '🖥️',
        color: 'sky',
        position: 2,
        lessons: [lesson('c')],
      },
    ],
  };
  const state = (status: 'in_progress' | 'completed', minutesAgo = 0) => ({
    status,
    bestScore: null,
    updatedAt: new Date(Date.now() - minutesAgo * 60_000),
  });

  it('suggests the very first lesson to a new student', () => {
    expect(pickContinueLesson(course, new Map())).toMatchObject({ lessonId: 'a', started: false });
  });

  it('resumes the most recently touched unfinished lesson', () => {
    const states = new Map([
      ['a', state('in_progress', 60)],
      ['c', state('in_progress', 5)],
    ]);
    expect(pickContinueLesson(course, states)).toMatchObject({
      lessonId: 'c',
      started: true,
      worldId: 'w2',
    });
  });

  it('otherwise suggests the first unfinished lesson in course order', () => {
    const states = new Map([['a', state('completed')]]);
    expect(pickContinueLesson(course, states)).toMatchObject({ lessonId: 'b', started: false });
  });

  it('returns null when everything is done', () => {
    const states = new Map(['a', 'b', 'c'].map((id) => [id, state('completed')] as const));
    expect(pickContinueLesson(course, states)).toBeNull();
  });
});
