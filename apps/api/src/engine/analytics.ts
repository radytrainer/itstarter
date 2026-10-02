import { PROGRESS_BUCKETS, type LessonStats, type ProgressBucket } from '@itstarter/shared';

/** Fewer students than this and an average says more about one child than about the lesson. */
export const MIN_SAMPLE = 3;
const HIGHLIGHTS = 5;

/** Whole-number percentage; 0 when there is nothing to divide by. */
export function percent(part: number, whole: number): number {
  return whole > 0 ? Math.round((part / whole) * 100) : 0;
}

/** Which progress group a student's course completion (0–100) falls into. */
export function progressBucket(completionPercent: number): ProgressBucket {
  if (completionPercent <= 0) return '0';
  if (completionPercent >= 100) return '100';
  if (completionPercent <= 25) return '1-25';
  if (completionPercent <= 50) return '26-50';
  if (completionPercent <= 75) return '51-75';
  return '76-99';
}

export function countBuckets(completionPercents: number[]) {
  const counts = new Map<ProgressBucket, number>(PROGRESS_BUCKETS.map((b) => [b, 0]));
  for (const p of completionPercents) {
    const bucket = progressBucket(p);
    counts.set(bucket, (counts.get(bucket) ?? 0) + 1);
  }
  return PROGRESS_BUCKETS.map((bucket) => ({ bucket, students: counts.get(bucket) ?? 0 }));
}

/**
 * The lesson lists teachers act on.
 * - most / least completed: by number of students who finished (course order breaks ties).
 * - hardest: lowest average score, only where at least MIN_SAMPLE students finished.
 */
export function lessonHighlights(lessons: LessonStats[]) {
  const ordered = lessons.map((lesson, order) => ({ lesson, order }));
  const byCompleted = [...ordered].sort(
    (a, b) => b.lesson.completed - a.lesson.completed || a.order - b.order,
  );
  const hardest = ordered
    .filter(({ lesson }) => lesson.completed >= MIN_SAMPLE && lesson.averageScore !== null)
    .sort((a, b) => a.lesson.averageScore! - b.lesson.averageScore! || a.order - b.order);

  return {
    mostCompleted: byCompleted
      .filter(({ lesson }) => lesson.completed > 0)
      .slice(0, HIGHLIGHTS)
      .map((x) => x.lesson),
    leastCompleted: [...ordered]
      .sort((a, b) => a.lesson.completed - b.lesson.completed || a.order - b.order)
      .slice(0, HIGHLIGHTS)
      .map((x) => x.lesson),
    hardest: hardest.slice(0, HIGHLIGHTS).map((x) => x.lesson),
  };
}
