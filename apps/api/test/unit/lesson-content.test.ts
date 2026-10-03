import { describe, expect, it } from 'vitest';
import { feedbackMode, questionInputSchema } from '@itstarter/shared';
import { validateQuestion } from '../../src/engine/validate-question';
import { WORLD_SEEDS } from '../../src/db/seed/data/foundation';
import { ALL_LESSONS } from '../../src/db/seed/data/lessons';
import type { LessonSeed } from '../../src/db/seed/types';

const inWorld = (slug: string) => ALL_LESSONS.filter((l) => l.worldSlug === slug);
/** Rounds that are games (replayable), not quizzes: the 🎮 game and 📖 "Words to know". */
const isGameRound = (a: LessonSeed['activities'][number]) =>
  a.type === 'game' || a.type === 'vocabulary';

/** Quiz questions (the game and vocabulary rounds come on top). */
const questionCount = (lesson: LessonSeed) =>
  lesson.activities
    .filter((a) => !isGameRound(a))
    .reduce((n, a) => n + (a.questions?.length ?? 0), 0);

/** Every world, with the size the school asked for. */
const WORLDS = [
  ['math-playground', { lessons: [15, 15], questions: [15, 20] }],
  ['logic-playground', { lessons: [15, 20], questions: [20, 25] }],
  ['computer-explorer', { lessons: [15, 15], questions: [15, 20] }],
  ['office-creator', { lessons: [15, 15], questions: [15, 20] }],
  ['internet-explorer', { lessons: [15, 15], questions: [15, 20] }],
  ['ai-playground', { lessons: [15, 15], questions: [15, 20] }],
  ['english-starter', { lessons: [15, 20], questions: [15, 20] }],
  ['it-vocabulary', { lessons: [15, 15], questions: [15, 20] }],
  ['coding-basics', { lessons: [15, 15], questions: [15, 20] }],
  ['web-design', { lessons: [15, 15], questions: [15, 20] }],
  ['networks-hardware', { lessons: [15, 15], questions: [15, 20] }],
  ['cyber-security', { lessons: [15, 15], questions: [15, 20] }],
] as const;
const ALL_WORLD_LESSONS = () => WORLDS.flatMap(([slug]) => inWorld(slug));

describe('lesson size and answer mode (the size the school asked for)', () => {
  it.each(WORLDS)('%s', (slug, size) => {
    const lessons = inWorld(slug);
    expect(lessons.length).toBeGreaterThanOrEqual(size.lessons[0]);
    expect(lessons.length).toBeLessThanOrEqual(size.lessons[1]);
    for (const lesson of lessons) {
      const n = questionCount(lesson);
      expect(n, `${lesson.slug} has ${n} questions`).toBeGreaterThanOrEqual(size.questions[0]);
      expect(n, `${lesson.slug} has ${n} questions`).toBeLessThanOrEqual(size.questions[1]);
    }
  });

  it('every question set shows the answer after each Check (games can be replayed)', () => {
    for (const lesson of ALL_WORLD_LESSONS()) {
      for (const activity of lesson.activities.filter((a) => a.isScored && !isGameRound(a))) {
        expect(feedbackMode(activity.config), `${lesson.slug}/${activity.step}`).toBe('reveal');
      }
    }
  });

  it('Math & Logic: most questions also explain WHY (a reveal always shows the answer)', () => {
    // In the other worlds many questions are self-explanatory once the answer is shown
    // (about a third carry a written explanation); Math and Logic need the working.
    const all = [...inWorld('math-playground'), ...inWorld('logic-playground')].flatMap((l) =>
      l.activities.filter((a) => !isGameRound(a)).flatMap((a) => a.questions ?? []),
    );
    const explained = all.filter((q) => q.kind === 'generated' || q.explanation).length;
    expect(explained / all.length).toBeGreaterThan(0.6);
  });

  it('every new question has Khmer text (draft)', () => {
    for (const lesson of ALL_WORLD_LESSONS()) {
      expect(lesson.title.km, lesson.slug).toBeTruthy();
      for (const q of lesson.activities.flatMap((a) => a.questions ?? [])) {
        if (q.kind === 'generated') continue; // generators write their own Khmer
        // Pure numbers/symbols ("2 → 4 → ?") and logic code ("true AND false") read the same
        // in both languages.
        if (!/[a-z]{3}/i.test(q.prompt.en.replace(/\b(true|false|AND|OR|NOT)\b/g, ''))) continue;
        expect(q.prompt.km, `${lesson.slug}: ${q.prompt.en}`).toBeTruthy();
      }
    }
  });

  it('every lesson has one game round (1–3 games) just before the reward', () => {
    const gameKinds = new Set(['catch', 'memory', 'robot', 'word_builder']);
    for (const lesson of ALL_WORLD_LESSONS()) {
      const games = lesson.activities.filter((a) => a.type === 'game');
      expect(games.length, lesson.slug).toBe(1);
      const round = games[0]!;
      expect(round.questions!.length, lesson.slug).toBeGreaterThanOrEqual(1);
      expect(round.questions!.length, lesson.slug).toBeLessThanOrEqual(3);
      expect(
        round.questions!.every((q) => gameKinds.has(q.kind)),
        lesson.slug,
      ).toBe(true);
      const at = lesson.activities.indexOf(round);
      expect(lesson.activities[at + 1]?.step, lesson.slug).toBe('reward');
    }
  });

  it('every lesson has one "Words to know" round: Khmer meanings, then listen and spell', () => {
    for (const lesson of ALL_WORLD_LESSONS()) {
      const rounds = lesson.activities.filter((a) => a.type === 'vocabulary');
      expect(rounds.length, lesson.slug).toBe(1);
      const [cards, spelling] = rounds[0]!.questions!;
      expect(cards!.kind, lesson.slug).toBe('memory');
      expect(cards!.options!.length, lesson.slug).toBeGreaterThanOrEqual(6); // 3+ word pairs
      // Every Khmer card really is Khmer.
      const khmer = cards!.options!.filter((_, i) => i % 2 === 1);
      expect(
        khmer.every((o) => /[\u1780-\u17FF]/.test(o.label.en)),
        lesson.slug,
      ).toBe(true);
      expect(spelling!.kind, lesson.slug).toBe('word_builder');
      expect(spelling!.publicConfig?.speak, lesson.slug).toBeTruthy();
      // It comes early, right after the example (before the quizzes).
      const at = lesson.activities.indexOf(rounds[0]!);
      expect(lesson.activities[at - 1]?.step, lesson.slug).toMatch(/see|learn/);
    }
  });

  it('every built-in question can be answered (same check as the admin editor)', () => {
    const problems: string[] = [];
    for (const lesson of ALL_LESSONS) {
      for (const q of lesson.activities.flatMap((a) => a.questions ?? [])) {
        const input = questionInputSchema.parse({
          ...q,
          hint: q.hint ?? null,
          explanation: q.explanation ?? null,
        });
        for (const p of validateQuestion(input))
          problems.push(`${lesson.slug}: ${q.prompt.en} → ${p}`);
      }
    }
    expect(problems).toEqual([]);
  });

  it('every lesson belongs to a world in the seed, and slugs are unique per world', () => {
    const worlds = new Set(WORLD_SEEDS.map((w) => w.slug));
    const seen = new Set<string>();
    for (const lesson of ALL_LESSONS) {
      expect(worlds.has(lesson.worldSlug), lesson.slug).toBe(true);
      const key = `${lesson.worldSlug}/${lesson.slug}`;
      expect(seen.has(key), key).toBe(false);
      seen.add(key);
    }
  });
});
