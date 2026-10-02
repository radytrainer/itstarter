import { describe, expect, it } from 'vitest';
import {
  checkAnswer,
  InvalidAnswerError,
  type QuestionWithAnswer,
} from '../../src/engine/checkers';
import { meetsCriteria, type StudentFacts } from '../../src/modules/gamification/awards';

const id = (n: number) => `00000000-0000-7000-8000-${String(n).padStart(12, '0')}`;
const opt = (n: number, extra: Partial<QuestionWithAnswer['options'][number]> = {}) => ({
  id: id(n),
  isCorrect: false,
  matchKey: null,
  groupKey: null,
  correctOrder: null,
  ...extra,
});

describe('key_combo', () => {
  const q: QuestionWithAnswer = {
    kind: 'key_combo',
    config: { answer: ['Ctrl', 'C'] },
    options: [],
  };
  it('ignores order and letter case, and knows common aliases', () => {
    expect(checkAnswer(q, { keys: ['Ctrl', 'C'] }).correct).toBe(true);
    expect(checkAnswer(q, { keys: ['c', 'ctrl'] }).correct).toBe(true);
    expect(checkAnswer(q, { keys: ['Control', 'C'] }).correct).toBe(true);
  });
  it('needs exactly the right keys', () => {
    expect(checkAnswer(q, { keys: ['Ctrl', 'V'] }).correct).toBe(false);
    expect(checkAnswer(q, { keys: ['Ctrl', 'C', 'Shift'] }).correct).toBe(false);
    expect(checkAnswer(q, { keys: ['C'] }).correct).toBe(false);
  });
});

describe('categorize', () => {
  const q: QuestionWithAnswer = {
    kind: 'categorize',
    config: {},
    options: [
      opt(1, { groupKey: 'bucket', matchKey: 'photos' }),
      opt(2, { groupKey: 'bucket', matchKey: 'music' }),
      opt(3, { groupKey: 'item', matchKey: 'photos' }),
      opt(4, { groupKey: 'item', matchKey: 'music' }),
      opt(5, { groupKey: 'item', matchKey: 'photos' }),
    ],
  };
  it('needs every item in its bucket and reports partial progress', () => {
    const all = [
      { item: id(3), bucket: id(1) },
      { item: id(4), bucket: id(2) },
      { item: id(5), bucket: id(1) },
    ];
    expect(checkAnswer(q, { placements: all })).toMatchObject({
      correct: true,
      partial: { correct: 3, total: 3 },
    });
    expect(
      checkAnswer(q, { placements: [{ item: id(3), bucket: id(2) }, ...all.slice(1)] }),
    ).toMatchObject({
      correct: false,
      partial: { correct: 2, total: 3 },
    });
    expect(checkAnswer(q, { placements: all.slice(0, 2) }).correct).toBe(false);
  });
  it('reveals where each item goes', () => {
    expect(checkAnswer(q, { placements: [{ item: id(3), bucket: id(2) }] }).correctAnswer).toEqual({
      placements: [
        { item: id(3), bucket: id(1) },
        { item: id(4), bucket: id(2) },
        { item: id(5), bucket: id(1) },
      ],
    });
  });
  it('rejects buckets used as items', () => {
    expect(() => checkAnswer(q, { placements: [{ item: id(1), bucket: id(2) }] })).toThrow(
      InvalidAnswerError,
    );
  });
});

describe('cell_select', () => {
  const q: QuestionWithAnswer = { kind: 'cell_select', config: { answer: 'b3' }, options: [] };
  it('compares cell addresses', () => {
    expect(checkAnswer(q, { cell: 'B3' }).correct).toBe(true);
    expect(checkAnswer(q, { cell: 'C3' }).correct).toBe(false);
    expect(() => checkAnswer(q, { cell: 'b3' })).toThrow(InvalidAnswerError);
    expect(() => checkAnswer(q, { cell: 'B0' })).toThrow(InvalidAnswerError);
  });
});

describe('format_text', () => {
  const q: QuestionWithAnswer = {
    kind: 'format_text',
    config: { answer: { bold: true, align: 'center' } },
    options: [],
  };
  const fmt = (over: object) => ({
    format: {
      bold: false,
      italic: false,
      underline: false,
      align: 'left',
      size: 'normal',
      ...over,
    },
  });
  it('checks only what the task asks for', () => {
    expect(checkAnswer(q, fmt({ bold: true, align: 'center' })).correct).toBe(true);
    expect(checkAnswer(q, fmt({ bold: true, align: 'center', italic: true })).correct).toBe(true);
    expect(checkAnswer(q, fmt({ bold: true }))).toMatchObject({
      correct: false,
      partial: { correct: 1, total: 2 },
    });
  });
  it('rejects unknown values', () => {
    expect(() => checkAnswer(q, fmt({ align: 'justify' }))).toThrow(InvalidAnswerError);
  });
});

describe('prompt_builder', () => {
  const q: QuestionWithAnswer = {
    kind: 'prompt_builder',
    config: {},
    options: [
      opt(1, { groupKey: 'role', isCorrect: true }),
      opt(2, { groupKey: 'role' }),
      opt(3, { groupKey: 'task', isCorrect: true }),
      opt(4, { groupKey: 'task' }),
    ],
  };
  it('needs the best piece in every part', () => {
    expect(checkAnswer(q, { optionIds: [id(1), id(3)] }).correct).toBe(true);
    expect(checkAnswer(q, { optionIds: [id(1), id(4)] })).toMatchObject({
      correct: false,
      partial: { correct: 1, total: 2 },
    });
  });
  it('picking two pieces for one part does not count', () => {
    expect(checkAnswer(q, { optionIds: [id(1), id(2), id(3)] }).correct).toBe(false);
  });
});

describe('award rules', () => {
  const facts: StudentFacts = {
    xpTotal: 520,
    currentStreak: 3,
    lessonsCompleted: 12,
    worlds: new Map([
      ['brain-playground', { done: 10, total: 10 }],
      ['ai-playground', { done: 2, total: 8 }],
      ['empty-world', { done: 0, total: 0 }],
    ]),
    courses: new Map([['it-starter-2028', { done: 12, total: 44 }]]),
    activityTypes: new Map([['mouse_trainer', 3]]),
  };

  it.each([
    [{ type: 'world_completed', worldSlug: 'brain-playground' }, true],
    [{ type: 'world_completed', worldSlug: 'ai-playground' }, false],
    [{ type: 'world_completed', worldSlug: 'empty-world' }, false],
    [{ type: 'world_completed', worldSlug: 'unknown' }, false],
    [{ type: 'course_completed', courseSlug: 'it-starter-2028' }, false],
    [{ type: 'lessons_completed', count: 5 }, true],
    [{ type: 'lessons_completed', count: 13 }, false],
    [{ type: 'xp_reached', xp: 500 }, true],
    [{ type: 'xp_reached', xp: 1000 }, false],
    [{ type: 'streak_days', days: 3 }, true],
    [{ type: 'streak_days', days: 7 }, false],
    [{ type: 'activity_type_completed', activityType: 'mouse_trainer', count: 3 }, true],
    [{ type: 'activity_type_completed', activityType: 'keyboard_challenge', count: 3 }, false],
  ] as const)('%j → %s', (criteria, expected) => {
    expect(meetsCriteria(criteria, facts)).toBe(expected);
  });
});
