import { describe, expect, it } from 'vitest';
import {
  checkAnswer,
  InvalidAnswerError,
  UnsupportedQuestionError,
  type QuestionWithAnswer,
} from '../../src/engine/checkers';
import { seededShuffle } from '../../src/engine/shuffle';

const A = '00000000-0000-7000-8000-00000000000a';
const B = '00000000-0000-7000-8000-00000000000b';
const C = '00000000-0000-7000-8000-00000000000c';
const D = '00000000-0000-7000-8000-00000000000d';

const opt = (id: string, extra: Partial<QuestionWithAnswer['options'][number]> = {}) => ({
  id,
  isCorrect: false,
  matchKey: null,
  groupKey: null,
  correctOrder: null,
  ...extra,
});

describe('single choice', () => {
  const q: QuestionWithAnswer = {
    kind: 'single_choice',
    config: {},
    options: [opt(A), opt(B, { isCorrect: true }), opt(C)],
  };
  it('accepts the right option and reports it', () => {
    expect(checkAnswer(q, { optionId: B })).toEqual({
      correct: true,
      partial: null,
      correctAnswer: { optionId: B },
    });
    expect(checkAnswer(q, { optionId: A }).correct).toBe(false);
  });
  it('rejects malformed answers', () => {
    expect(() => checkAnswer(q, { optionId: 'nope' })).toThrow(InvalidAnswerError);
    expect(() => checkAnswer(q, 'B')).toThrow(InvalidAnswerError);
  });
});

describe('number', () => {
  const q: QuestionWithAnswer = { kind: 'number', config: { answer: 6.5 }, options: [] };
  it('compares numbers, tolerant of floating point', () => {
    expect(checkAnswer(q, { value: 6.5 }).correct).toBe(true);
    expect(checkAnswer(q, { value: 0.1 + 0.2 + 6.2 }).correct).toBe(true);
    expect(checkAnswer(q, { value: 6 }).correct).toBe(false);
  });
  it('refuses strings and infinity', () => {
    expect(() => checkAnswer(q, { value: '6.5' })).toThrow(InvalidAnswerError);
    expect(() => checkAnswer(q, { value: Infinity })).toThrow(InvalidAnswerError);
  });
  it('needs an expected answer in the database', () => {
    expect(() => checkAnswer({ ...q, config: {} }, { value: 1 })).toThrow(UnsupportedQuestionError);
  });
});

describe('true/false and safe/dangerous', () => {
  it('checks booleans', () => {
    const q: QuestionWithAnswer = { kind: 'true_false', config: { answer: false }, options: [] };
    expect(checkAnswer(q, { value: false }).correct).toBe(true);
    expect(checkAnswer(q, { value: true })).toMatchObject({
      correct: false,
      correctAnswer: { value: false },
    });
  });
  it('checks safe/dangerous', () => {
    const q: QuestionWithAnswer = {
      kind: 'safe_or_dangerous',
      config: { answer: 'dangerous' },
      options: [],
    };
    expect(checkAnswer(q, { value: 'dangerous' }).correct).toBe(true);
    expect(checkAnswer(q, { value: 'safe' }).correct).toBe(false);
    expect(() => checkAnswer(q, { value: 'maybe' })).toThrow(InvalidAnswerError);
  });
});

describe('matching', () => {
  const q: QuestionWithAnswer = {
    kind: 'matching',
    config: {},
    options: [
      opt(A, { groupKey: 'left', matchKey: 'monitor' }),
      opt(B, { groupKey: 'left', matchKey: 'mouse' }),
      opt(C, { groupKey: 'right', matchKey: 'mouse' }),
      opt(D, { groupKey: 'right', matchKey: 'monitor' }),
    ],
  };
  it('needs every pair right, and reports partial progress', () => {
    expect(
      checkAnswer(q, {
        pairs: [
          { left: A, right: D },
          { left: B, right: C },
        ],
      }),
    ).toMatchObject({
      correct: true,
      partial: { correct: 2, total: 2 },
    });
    expect(
      checkAnswer(q, {
        pairs: [
          { left: A, right: C },
          { left: B, right: D },
        ],
      }),
    ).toMatchObject({
      correct: false,
      partial: { correct: 0, total: 2 },
    });
    expect(checkAnswer(q, { pairs: [{ left: A, right: D }] })).toMatchObject({
      correct: false,
      partial: { correct: 1, total: 2 },
    });
  });
  it('reveals the correct pairs', () => {
    expect(checkAnswer(q, { pairs: [{ left: A, right: C }] }).correctAnswer).toEqual({
      pairs: [
        { left: A, right: D },
        { left: B, right: C },
      ],
    });
  });
  it('rejects pairs that use the wrong sides', () => {
    expect(() => checkAnswer(q, { pairs: [{ left: C, right: A }] })).toThrow(InvalidAnswerError);
  });
});

describe('ordering', () => {
  const q: QuestionWithAnswer = {
    kind: 'ordering',
    config: {},
    options: [
      opt(C, { correctOrder: 3 }),
      opt(A, { correctOrder: 1 }),
      opt(B, { correctOrder: 2 }),
    ],
  };
  it('checks the order and counts items in the right place', () => {
    expect(checkAnswer(q, { order: [A, B, C] }).correct).toBe(true);
    expect(checkAnswer(q, { order: [A, C, B] })).toMatchObject({
      correct: false,
      partial: { correct: 1, total: 3 },
    });
    expect(checkAnswer(q, { order: [C, A, B] }).correctAnswer).toEqual({ order: [A, B, C] });
  });
  it('needs every item exactly once', () => {
    expect(() => checkAnswer(q, { order: [A, A, B] })).toThrow(InvalidAnswerError);
    expect(() => checkAnswer(q, { order: [A, B] })).toThrow(InvalidAnswerError);
    expect(() => checkAnswer(q, { order: [A, B, D] })).toThrow(InvalidAnswerError);
  });
});

it('refuses kinds the engine does not know', () => {
  expect(() => checkAnswer({ kind: 'telepathy', config: {}, options: [] }, {})).toThrow(
    UnsupportedQuestionError,
  );
});

describe('seededShuffle', () => {
  const items = Array.from({ length: 10 }, (_, i) => i);
  it('is stable for the same seed and keeps every item', () => {
    expect(seededShuffle(items, 's1')).toEqual(seededShuffle(items, 's1'));
    expect([...seededShuffle(items, 's1')].sort((a, b) => a - b)).toEqual(items);
  });
  it('differs between seeds (different students see different orders)', () => {
    const orders = new Set(['a', 'b', 'c', 'd', 'e'].map((s) => seededShuffle(items, s).join()));
    expect(orders.size).toBeGreaterThan(1);
  });
  it('does not mutate the input', () => {
    const copy = [...items];
    seededShuffle(items, 'x');
    expect(items).toEqual(copy);
  });
});
