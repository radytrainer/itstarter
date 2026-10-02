import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import { useState } from 'react';
import { commitmentScore, type PlayQuestion, type StudentPerformance } from '@itstarter/shared';
import { renderWithIntl as render } from './render';
import { PerformanceReport } from '../src/components/performance/performance-report';
import { QUESTION_KINDS } from '../src/components/learning/questions/registry';

let reducedMotion = false;
beforeEach(() => {
  reducedMotion = false;
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('reduce') && reducedMotion,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

const opt = (id: string, en: string, groupKey: string | null = null) => ({
  id,
  label: { en },
  media: null,
  groupKey,
});
const question = (kind: string, extra: Partial<PlayQuestion> = {}): PlayQuestion => ({
  id: 'q',
  kind,
  prompt: { en: 'Prompt' },
  media: null,
  hint: null,
  difficulty: 1,
  options: [],
  data: {},
  ...extra,
});

/** A game with real state; `submit` is what the runner would check. */
function renderGame(kind: string, q: PlayQuestion) {
  const def = QUESTION_KINDS[kind]!;
  const submit = vi.fn();
  const values: unknown[] = [];
  function Harness() {
    const [value, setValue] = useState(def.initial(q));
    return (
      <def.Input
        question={q}
        value={value}
        onChange={(v: unknown) => {
          values.push(v);
          setValue(v);
        }}
        disabled={false}
        locale="en"
        submit={submit}
      />
    );
  }
  render(<Harness />);
  return { def, submit, last: () => values.at(-1) };
}

describe('catch the answer', () => {
  const q = question('catch', {
    options: [opt('a', 'Keyboard'), opt('b', 'Printer'), opt('c', 'Mouse')],
    data: { speed: 'slow' },
  });

  it('submits itself and starts with a Start button', () => {
    const def = QUESTION_KINDS.catch!;
    expect(def.selfSubmit).toBe(true);
    expect(def.restartOnRetry).toBe(true);
    renderGame('catch', q);
    expect(screen.getByRole('button', { name: /Start/ })).toBeTruthy();
    expect(screen.getByText(/Your basket is empty/)).toBeTruthy();
  });

  it('has a still version (reduce motion): tap the right ones, then Done', () => {
    reducedMotion = true;
    const { def, submit } = renderGame('catch', q);
    fireEvent.click(screen.getByRole('radio', { name: 'Keyboard' }));
    fireEvent.click(screen.getByRole('radio', { name: 'Mouse' }));
    fireEvent.click(screen.getByRole('button', { name: /Done/ }));
    expect(submit).toHaveBeenCalledWith({ caught: ['a', 'c'], done: true });
    expect(def.toAnswer({ caught: ['a', 'c'], done: true }, q)).toEqual({ caught: ['a', 'c'] });
  });

  it('anyone can choose the still version', () => {
    renderGame('catch', q);
    fireEvent.click(screen.getByRole('button', { name: 'Play without moving items' }));
    expect(screen.getByRole('radio', { name: 'Printer' })).toBeTruthy();
  });
});

describe('memory cards', () => {
  const q = question('memory', {
    options: [
      opt('a', 'Ctrl + C', 'x1'),
      opt('b', 'Paste', 'x2'),
      opt('c', 'Copy', 'x1'),
      opt('d', 'Ctrl + V', 'x2'),
    ],
  });

  it('turns cards, keeps pairs, turns others back, and submits with the number of turns', () => {
    vi.useFakeTimers();
    const { submit, last } = renderGame('memory', q);
    expect(screen.getByRole('button', { name: 'Card 1, face down' })).toBeTruthy();

    // A wrong pair: both show, then turn back.
    fireEvent.click(screen.getByRole('button', { name: 'Card 1, face down' }));
    fireEvent.click(screen.getByRole('button', { name: 'Card 2, face down' }));
    expect(screen.getByRole('button', { name: 'Paste' })).toBeTruthy();
    act(() => vi.advanceTimersByTime(1100));
    expect(screen.getByRole('button', { name: 'Card 2, face down' })).toBeTruthy();
    expect(last()).toEqual({ pairs: [], moves: 1 });

    fireEvent.click(screen.getByRole('button', { name: 'Card 1, face down' }));
    fireEvent.click(screen.getByRole('button', { name: 'Card 3, face down' }));
    fireEvent.click(screen.getByRole('button', { name: 'Card 2, face down' }));
    fireEvent.click(screen.getByRole('button', { name: 'Card 4, face down' }));
    expect(screen.getByText(/Pairs: 2\/2/)).toBeTruthy();
    act(() => vi.advanceTimersByTime(800));
    expect(submit).toHaveBeenCalledWith({
      pairs: [
        { a: 'a', b: 'c' },
        { a: 'b', b: 'd' },
      ],
      moves: 3,
    });
  });
});

describe('robot path', () => {
  const q = question('robot', {
    data: {
      robot: {
        rows: 1,
        cols: 4,
        start: [0, 0],
        goal: [0, 3],
        walls: [],
        collect: [],
        maxBlocks: 2,
      },
    },
  });

  it('builds a program with arrows and repeat, runs it, then submits', () => {
    vi.useFakeTimers();
    const { submit, def, last } = renderGame('robot', q);
    expect(screen.getByText('Blocks: 0/2')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Repeat/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Repeat more times' }));
    fireEvent.click(screen.getByRole('button', { name: 'Move right' }));
    expect(screen.getByText('Blocks: 2/2')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Close repeat/ }));
    expect(def.toAnswer(last(), q)).toEqual({ program: [{ repeat: 3, do: ['right'] }] });

    fireEvent.click(screen.getByRole('button', { name: /Run/ }));
    act(() => vi.advanceTimersByTime(450 * 4));
    expect(screen.getByText('🎉 The robot made it!')).toBeTruthy();
    expect(submit).toHaveBeenCalledWith({
      program: [{ repeat: 3, do: ['right'] }],
      openRepeat: false,
    });
  });

  it('shows where it bumped', () => {
    vi.useFakeTimers();
    renderGame('robot', q);
    fireEvent.click(screen.getByRole('button', { name: 'Move left' }));
    fireEvent.click(screen.getByRole('button', { name: /Run/ }));
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText(/leave the board at move 1/)).toBeTruthy();
  });
});

describe('word builder', () => {
  it('spells with tiles; a placed tile goes back when tapped', () => {
    const q = question('word_builder', {
      options: [opt('t', 't'), opt('c', 'c'), opt('x', 'x'), opt('a', 'a')],
    });
    const { def, last } = renderGame('word_builder', q);
    for (const letter of ['c', 'x', 'a', 't'])
      fireEvent.click(screen.getByRole('button', { name: letter }));
    fireEvent.click(screen.getByRole('button', { name: 'Remove “x” (position 2)' }));
    expect(def.toAnswer(last(), q)).toEqual({ word: 'cat' });
    expect(def.fromRevealed({ word: 'cat' }, q)).toEqual({ picked: ['c', 'a', 't'], typed: '' });
  });

  it('builds sentences from word tiles', () => {
    const q = question('word_builder', {
      options: [opt('2', 'am'), opt('1', 'I'), opt('3', 'happy')],
      data: { join: ' ' },
    });
    const { def, last } = renderGame('word_builder', q);
    for (const word of ['I', 'am', 'happy'])
      fireEvent.click(screen.getByRole('button', { name: word }));
    expect(def.toAnswer(last(), q)).toEqual({ word: 'I am happy' });
  });

  it('is a typing box without tiles', () => {
    const q = question('word_builder');
    const { def, last } = renderGame('word_builder', q);
    fireEvent.change(screen.getByLabelText('Type your answer'), { target: { value: 'computer' } });
    expect(def.toAnswer(last(), q)).toEqual({ word: 'computer' });
  });
});

describe('performance report', () => {
  const performance: StudentPerformance = {
    commitment: commitmentScore({ activeDays: 6, minutes: 60, lessons: 4 }),
    currentStreak: 2,
    longestStreak: 5,
    lastActiveDate: '2026-10-02',
    totals: { lessonsCompleted: 4, answered: 70, accuracy: 81, minutes: 95, gamesWon: 6 },
    days: Array.from({ length: 28 }, (_, i) => ({
      day: `2026-09-${String(i + 1).padStart(2, '0')}`,
      minutes: i % 4 === 0 ? 15 : 0,
      xp: 0,
    })),
    weeks: Array.from({ length: 8 }, (_, i) => ({
      weekStart: `2026-08-${String(i + 3).padStart(2, '0')}`,
      activeDays: 1,
      minutes: 10 * i,
      lessons: 1,
      answered: 9,
      accuracy: 80,
    })),
    worlds: [
      {
        id: 'w1',
        title: { en: 'Math Playground' },
        icon: '🔢',
        color: 'violet',
        lessonsCompleted: 3,
        lessonsTotal: 15,
        answered: 50,
        accuracy: 90,
        minutes: 60,
      },
    ],
    skills: [
      { skill: 'numbers', answered: 50, accuracy: 90 },
      { skill: 'coding', answered: 8, accuracy: 50 },
    ],
  };

  it('staff see the commitment score and how it is worked out', () => {
    render(<PerformanceReport performance={performance} audience="staff" locale="en" />);
    expect(screen.getByRole('img', { name: 'Commitment: 50/100' })).toBeTruthy();
    expect(screen.getByText(/Steady learner/)).toBeTruthy();
    expect(screen.getByText(/targets: 12 days, 120 minutes, 8 lessons/)).toBeTruthy();
    expect(screen.getByText('Learned on 7 of the last 28 days.')).toBeTruthy();
    expect(screen.queryByText(/You are great at/)).toBeNull();
  });

  it('students see their habit, strengths and what to practise — kindly', () => {
    render(<PerformanceReport performance={performance} audience="student" locale="en" />);
    expect(screen.getByRole('img', { name: 'My learning habit: 50/100' })).toBeTruthy();
    expect(screen.getByText(/You are great at/)).toBeTruthy();
    expect(screen.getByText(/Practise a little more/)).toBeTruthy();
    expect(screen.getByText('Coding (robot)', { selector: 'li' })).toBeTruthy();
    expect(screen.queryByText(/targets:/)).toBeNull();
  });
});
