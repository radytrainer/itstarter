import { describe, expect, it } from 'vitest';
import {
  compressProgram,
  countBlocks,
  expandProgram,
  normalizeWords,
  runRobot,
  solveRobot,
  type RobotBoard,
} from '@itstarter/shared';
import {
  checkAnswer,
  InvalidAnswerError,
  type QuestionWithAnswer,
} from '../../src/engine/checkers';
import { validateQuestion } from '../../src/engine/validate-question';

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

const board = (extra: Partial<RobotBoard> = {}): RobotBoard => ({
  rows: 3,
  cols: 3,
  start: [0, 0],
  goal: [2, 2],
  walls: [[1, 1]],
  collect: [],
  ...extra,
});

describe('robot rules (shared by the phone and the API)', () => {
  it('reaches the goal, bumps into walls and edges', () => {
    expect(runRobot(board(), ['right', 'right', 'down', 'down']).outcome).toBe('goal');
    const wall = runRobot(board(), ['right', 'down']);
    expect(wall).toMatchObject({ outcome: 'wall', steps: 1 });
    expect(wall.path).toEqual([
      [0, 0],
      [0, 1],
    ]);
    expect(runRobot(board(), ['up']).outcome).toBe('edge');
    expect(runRobot(board(), ['right']).outcome).toBe('short');
  });

  it('must collect everything before the goal counts', () => {
    const b = board({ collect: [[2, 0]] });
    expect(runRobot(b, ['right', 'right', 'down', 'down']).outcome).toBe('missing');
    expect(runRobot(b, ['down', 'down', 'right', 'right']).outcome).toBe('goal');
  });

  it('repeat blocks expand and count as 1 + inside', () => {
    const program = [{ repeat: 3, do: ['right' as const, 'down' as const] }, 'left' as const];
    expect(expandProgram(program)).toEqual([
      'right',
      'down',
      'right',
      'down',
      'right',
      'down',
      'left',
    ]);
    expect(countBlocks(program)).toBe(4);
  });

  it('refuses programs longer than the board allows', () => {
    const b = board({ maxBlocks: 2 });
    expect(runRobot(b, ['right', 'right', 'down', 'down']).outcome).toBe('too_long');
    expect(
      runRobot(b, [
        { repeat: 2, do: ['right'] },
        { repeat: 2, do: ['down'] },
      ]).outcome,
    ).toBe('too_long'); // 4 blocks
  });

  it('solves boards with the fewest blocks it can find, or says it cannot', () => {
    const stairs: RobotBoard = {
      rows: 4,
      cols: 4,
      start: [0, 0],
      goal: [3, 3],
      walls: [
        [0, 2],
        [0, 3],
        [1, 0],
        [1, 3],
        [2, 0],
        [2, 1],
        [3, 0],
        [3, 1],
        [3, 2],
      ],
      collect: [],
    };
    const solution = solveRobot(stairs)!;
    expect(solution).toEqual([{ repeat: 3, do: ['right', 'down'] }]);
    expect(runRobot(stairs, solution).outcome).toBe('goal');
    expect(
      solveRobot(
        board({
          walls: [
            [0, 1],
            [1, 0],
          ],
        }),
      ),
    ).toBeNull();
  });

  it('compresses runs of 3+ moves into repeats', () => {
    expect(compressProgram(['right', 'right', 'right', 'up'])).toEqual([
      { repeat: 3, do: ['right'] },
      'up',
    ]);
    expect(compressProgram(['up', 'up'])).toEqual(['up', 'up']);
  });
});

describe('word normalising', () => {
  it('ignores capitals, extra spaces and the final full stop', () => {
    expect(normalizeWords('  I  can type FAST. ')).toBe('i can type fast');
    expect(normalizeWords('Where are you from?')).toBe(normalizeWords('where are you from'));
    expect(normalizeWords('Dear teacher , here')).toBe('dear teacher, here');
  });
});

describe('game answer checkers', () => {
  it('catch: right only when every target and nothing else is caught', () => {
    const q: QuestionWithAnswer = {
      kind: 'catch',
      config: {},
      options: [opt(A, { isCorrect: true }), opt(B, { isCorrect: true }), opt(C), opt(D)],
    };
    expect(checkAnswer(q, { caught: [B, A] }).correct).toBe(true);
    const extra = checkAnswer(q, { caught: [A, B, C] });
    expect(extra).toMatchObject({ correct: false, partial: { correct: 3, total: 4 } });
    expect(extra.correctAnswer).toEqual({ caught: [A, B] });
    expect(checkAnswer(q, { caught: [] }).partial).toEqual({ correct: 2, total: 4 });
    expect(() => checkAnswer(q, { caught: [A, A] })).toThrow(InvalidAnswerError);
  });

  it('memory: checks the pairs; fewer turns give a better score', () => {
    const q: QuestionWithAnswer = {
      kind: 'memory',
      config: {},
      options: [
        opt(A, { matchKey: 'p0' }),
        opt(B, { matchKey: 'p0' }),
        opt(C, { matchKey: 'p1' }),
        opt(D, { matchKey: 'p1' }),
      ],
    };
    const quick = checkAnswer(q, {
      pairs: [
        { a: A, b: B },
        { a: D, b: C },
      ],
      moves: 3,
    });
    expect(quick).toMatchObject({ correct: true, score: 100 });
    expect(
      checkAnswer(q, {
        pairs: [
          { a: A, b: B },
          { a: D, b: C },
        ],
        moves: 8,
      }).score,
    ).toBe(50);
    expect(
      checkAnswer(q, {
        pairs: [
          { a: A, b: C },
          { a: B, b: D },
        ],
        moves: 2,
      }).correct,
    ).toBe(false);
    expect(() => checkAnswer(q, { pairs: [{ a: A, b: A }], moves: 1 })).toThrow(InvalidAnswerError);
  });

  it('robot: the API runs the program on the stored board', () => {
    const q: QuestionWithAnswer = {
      kind: 'robot',
      config: {},
      publicConfig: { robot: board() },
      options: [],
    };
    expect(
      checkAnswer(q, { program: [{ repeat: 2, do: ['down'] }, 'right', 'right'] }).correct,
    ).toBe(true);
    const bump = checkAnswer(q, { program: ['right', 'down'] });
    expect(bump.correct).toBe(false);
    // The revealed answer is a shortest working program.
    const shown = (bump.correctAnswer as { program: Parameters<typeof runRobot>[1] }).program;
    expect(runRobot(board(), shown)).toMatchObject({ outcome: 'goal', steps: 4 });
    expect(() => checkAnswer(q, { program: ['jump'] })).toThrow(InvalidAnswerError);
  });

  it('word builder: accepts the answer and listed alternatives', () => {
    const q: QuestionWithAnswer = {
      kind: 'word_builder',
      config: { answer: 'Thank you.', accept: ['thanks'] },
      options: [],
    };
    expect(checkAnswer(q, { word: 'thank you' }).correct).toBe(true);
    expect(checkAnswer(q, { word: 'Thanks' }).correct).toBe(true);
    expect(checkAnswer(q, { word: 'thank' })).toMatchObject({
      correct: false,
      correctAnswer: { word: 'Thank you.' },
    });
  });
});

describe('the admin editor rejects broken games', () => {
  const base = { prompt: { en: 'x' }, hint: null, explanation: null, difficulty: 1, config: {} };
  it('unsolvable robot boards and too-small block limits', () => {
    const blocked = validateQuestion({
      ...base,
      kind: 'robot',
      publicConfig: {
        robot: board({
          walls: [
            [0, 1],
            [1, 0],
          ],
        }),
      },
      options: [],
    });
    expect(blocked.join()).toMatch(/cannot reach/);
    const tight = validateQuestion({
      ...base,
      kind: 'robot',
      publicConfig: { robot: board({ maxBlocks: 1 }) },
      options: [],
    });
    expect(tight.join()).toMatch(/raise maxBlocks/);
  });

  it('tiles that cannot spell the answer; memory cards without partners', () => {
    const tiles = validateQuestion({
      ...base,
      kind: 'word_builder',
      config: { answer: 'cat' },
      publicConfig: {},
      options: [{ label: { en: 'c' } }, { label: { en: 'a' } }].map((o) => ({
        ...o,
        isCorrect: false,
      })),
    });
    expect(tiles.join()).toMatch(/missing “t”/);
    const cards = validateQuestion({
      ...base,
      kind: 'memory',
      publicConfig: {},
      options: ['p0', 'p0', 'p1'].map((matchKey) => ({
        label: { en: matchKey },
        isCorrect: false,
        matchKey,
      })),
    });
    expect(cards.join()).toMatch(/exactly 2 cards/);
  });
});
