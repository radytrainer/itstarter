import { describe, expect, it } from 'vitest';
import type { LessonStats } from '@itstarter/shared';
import {
  countBuckets,
  lessonHighlights,
  percent,
  progressBucket,
} from '../../src/engine/analytics';

const lesson = (slug: string, completed: number, averageScore: number | null): LessonStats => ({
  lessonId: slug,
  slug,
  title: { en: slug },
  worldTitle: { en: 'World' },
  started: completed,
  completed,
  finishRate: completed > 0 ? 100 : null,
  averageScore,
  averageMinutes: null,
});

describe('percent', () => {
  it('rounds and never divides by zero', () => {
    expect(percent(1, 3)).toBe(33);
    expect(percent(2, 3)).toBe(67);
    expect(percent(5, 0)).toBe(0);
  });
});

describe('progress buckets', () => {
  it('puts each completion into the right group', () => {
    expect([0, 1, 25, 26, 50, 51, 75, 76, 99, 100].map(progressBucket)).toEqual([
      '0',
      '1-25',
      '1-25',
      '26-50',
      '26-50',
      '51-75',
      '51-75',
      '76-99',
      '76-99',
      '100',
    ]);
  });

  it('always returns every group, in order, even when empty', () => {
    expect(countBuckets([0, 0, 100])).toEqual([
      { bucket: '0', students: 2 },
      { bucket: '1-25', students: 0 },
      { bucket: '26-50', students: 0 },
      { bucket: '51-75', students: 0 },
      { bucket: '76-99', students: 0 },
      { bucket: '100', students: 1 },
    ]);
  });
});

describe('lesson highlights', () => {
  const lessons = [
    lesson('a', 10, 90),
    lesson('b', 0, null),
    lesson('c', 4, 55),
    lesson('d', 2, 20), // lowest score, but only 2 students: not enough to call it hard
    lesson('e', 10, 70),
    lesson('f', 0, null),
  ];
  const { mostCompleted, leastCompleted, hardest } = lessonHighlights(lessons);
  const slugs = (list: LessonStats[]) => list.map((l) => l.slug);

  it('most completed: by students finished, course order breaks ties, never-finished left out', () => {
    expect(slugs(mostCompleted)).toEqual(['a', 'e', 'c', 'd']);
  });

  it('least completed: fewest first, course order breaks ties', () => {
    expect(slugs(leastCompleted)).toEqual(['b', 'f', 'd', 'c', 'a']);
  });

  it('hardest: lowest average score among lessons at least 3 students finished', () => {
    expect(slugs(hardest)).toEqual(['c', 'e', 'a']);
  });
});
