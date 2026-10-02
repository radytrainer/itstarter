import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import type { PlayActivity, PlayQuestion } from '@itstarter/shared';
import { renderWithIntl as render } from './render';
import { QuestionActivity } from '../src/components/learning/question-activity';
import { matching } from '../src/components/learning/questions/matching';
import { parseNumber } from '../src/components/learning/questions/number';
import { ordering } from '../src/components/learning/questions/ordering';

const fetchMock = vi.fn();
beforeEach(() => vi.stubGlobal('fetch', fetchMock));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

const respond = (data: object) =>
  fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ success: true, data })));

const answerResult = (overrides: object = {}) => ({
  correct: false,
  partial: null,
  explanation: null,
  revealed: null,
  activityCompleted: false,
  xpAwarded: 0,
  totalXp: 0,
  ...overrides,
});

describe('parseNumber', () => {
  it.each([
    ['25', 25],
    [' 6.50 ', 6.5],
    ['6,5', 6.5],
    ['$3.00', 3],
    ['-4', -4],
    ['.5', 0.5],
  ])('reads %j as %d', (text, value) => expect(parseNumber(text)).toBe(value));

  it.each([[''], ['abc'], ['1.2.3'], ['12a']])('rejects %j', (text) =>
    expect(parseNumber(text)).toBeNull(),
  );
});

const opt = (id: string, en: string, groupKey: string | null = null) => ({
  id,
  label: { en },
  media: null,
  groupKey,
});

describe('matching input (tap to match)', () => {
  const question: PlayQuestion = {
    id: 'q',
    kind: 'matching',
    prompt: { en: 'Match' },
    media: null,
    hint: null,
    difficulty: 1,
    data: {},
    options: [
      opt('L1', 'Monitor', 'left'),
      opt('L2', 'Mouse', 'left'),
      opt('R1', 'Clicks', 'right'),
      opt('R2', 'Shows', 'right'),
    ],
  };

  function Harness({ onValue }: { onValue: (v: Record<string, string>) => void }) {
    const [value, setValue] = useState(matching.initial(question));
    return (
      <matching.Input
        question={question}
        value={value}
        onChange={(v) => {
          setValue(v);
          onValue(v);
        }}
        disabled={false}
        locale="en"
      />
    );
  }

  it('pairs a left item with a right item, and can undo', () => {
    const onValue = vi.fn();
    render(<Harness onValue={onValue} />);

    // Right items do nothing until a left item is picked.
    expect((screen.getByRole('button', { name: 'Shows' }) as HTMLButtonElement).disabled).toBe(
      true,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Monitor' }));
    fireEvent.click(screen.getByRole('button', { name: /Shows/ }));
    expect(onValue).toHaveBeenLastCalledWith({ L1: 'R2' });
    expect(screen.getByRole('button', { name: 'Monitor, matched with Shows' })).toBeTruthy();

    expect(matching.isReady({ L1: 'R2' }, question)).toBe(false);
    expect(matching.isReady({ L1: 'R2', L2: 'R1' }, question)).toBe(true);
    expect(matching.toAnswer({ L1: 'R2', L2: 'R1' }, question)).toEqual({
      pairs: [
        { left: 'L1', right: 'R2' },
        { left: 'L2', right: 'R1' },
      ],
    });

    fireEvent.click(screen.getByRole('button', { name: /Monitor, matched/ }));
    expect(onValue).toHaveBeenLastCalledWith({});
  });
});

describe('ordering input', () => {
  const question: PlayQuestion = {
    id: 'q',
    kind: 'ordering',
    prompt: { en: 'Order' },
    media: null,
    hint: null,
    difficulty: 1,
    data: {},
    options: [opt('B', 'Second'), opt('A', 'First')],
  };

  it('moves items with accessible up/down buttons', () => {
    const onChange = vi.fn();
    render(
      <ordering.Input
        question={question}
        value={['B', 'A']}
        onChange={onChange}
        disabled={false}
        locale="en"
      />,
    );
    expect(
      (screen.getByRole('button', { name: 'Move “Second” up' }) as HTMLButtonElement).disabled,
    ).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Move “First” up' }));
    expect(onChange).toHaveBeenCalledWith(['A', 'B']);
  });
});

describe('QuestionActivity', () => {
  const activity: PlayActivity = {
    id: 'act',
    step: 'play',
    type: 'multiple_choice',
    title: null,
    config: {},
    isScored: true,
    xpReward: 10,
    position: 4,
    questions: [
      {
        id: 'q1',
        kind: 'single_choice',
        prompt: { en: '2 → 4 → 6 → 8 → ?' },
        media: null,
        hint: { en: 'Each number grows by 2.' },
        difficulty: 1,
        data: {},
        options: [opt('o9', '9'), opt('o10', '10'), opt('o12', '12')],
      },
    ],
  };

  function setup() {
    const onDone = vi.fn();
    const onXp = vi.fn();
    render(
      <QuestionActivity
        activity={activity}
        locale="en"
        preview={false}
        solvedQuestionIds={new Set()}
        onDone={onDone}
        onXp={onXp}
      />,
    );
    return { onDone, onXp };
  }

  it('encourages after a wrong answer, reveals after the second, then completes with XP', async () => {
    const { onDone, onXp } = setup();
    const check = () => screen.getByRole('button', { name: /^(Check|Try again)$/ });
    expect((check() as HTMLButtonElement).disabled).toBe(true);

    // 1st try: wrong → encouraging feedback + clue, no answer yet
    respond(answerResult());
    fireEvent.click(screen.getByRole('radio', { name: '9' }));
    fireEvent.click(check());
    expect(await screen.findByText('Each number grows by 2.')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeTruthy();
    expect(document.body.textContent).not.toMatch(/wrong|failed/i);

    // The request carried the CSRF header and the chosen option.
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('/api/activities/act/answer');
    expect(JSON.parse(init.body)).toMatchObject({ questionId: 'q1', answer: { optionId: 'o9' } });

    // 2nd try: wrong → the answer is revealed and pre-selected
    respond(answerResult({ revealed: { optionId: 'o10' }, explanation: { en: '8 + 2 = 10' } }));
    fireEvent.click(check());
    expect(await screen.findByText('The answer is: 10')).toBeTruthy();
    expect(screen.getByRole('radio', { name: '10' }).getAttribute('aria-checked')).toBe('true');

    // Check the revealed answer → correct → XP, then Next finishes the activity
    respond(
      answerResult({
        correct: true,
        explanation: { en: '8 + 2 = 10' },
        activityCompleted: true,
        xpAwarded: 10,
        totalXp: 10,
      }),
    );
    fireEvent.click(check());
    await waitFor(() => expect(onXp).toHaveBeenCalledWith(10));
    fireEvent.click(await screen.findByRole('button', { name: /Next/ }));
    expect(onDone).toHaveBeenCalled();
  });

  it('keyboard: 1–9 / A–I choose an option, Enter checks and then continues', async () => {
    const onDone = vi.fn();
    render(
      <QuestionActivity
        activity={{ ...activity, config: { feedback: 'reveal' } }}
        locale="en"
        preview={false}
        solvedQuestionIds={new Set()}
        onDone={onDone}
        onXp={vi.fn()}
      />,
    );
    fireEvent.keyDown(window, { key: '2' });
    expect(screen.getByRole('radio', { name: '10' }).getAttribute('aria-checked')).toBe('true');
    fireEvent.keyDown(window, { key: 'c' });
    expect(screen.getByRole('radio', { name: '12' }).getAttribute('aria-checked')).toBe('true');
    fireEvent.keyDown(window, { key: 'z' }); // not an option: nothing changes
    expect(screen.getByRole('radio', { name: '12' }).getAttribute('aria-checked')).toBe('true');

    respond(answerResult({ revealed: { optionId: 'o10' }, explanation: { en: '8 + 2 = 10' } }));
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(await screen.findByText('The answer is: 10')).toBeTruthy();
    // Locked after Check: keys no longer change the answer.
    fireEvent.keyDown(window, { key: '1' });
    expect(screen.getByRole('radio', { name: '12' }).getAttribute('aria-checked')).toBe('true');
    // The right option is marked for everyone, the student's own pick as "Your answer".
    expect(screen.getByRole('radio', { name: '10' }).getAttribute('aria-describedby')).toBeTruthy();
    expect(screen.getByText(/Correct answer/)).toBeTruthy();
    expect(screen.getByText('Your answer')).toBeTruthy();

    fireEvent.keyDown(document.body, { key: 'Enter' });
    expect(onDone).toHaveBeenCalled();
  });

  it('Math & Logic ("reveal"): the first Check shows the answer and explanation, then Next', async () => {
    const second: PlayActivity['questions'][number] = {
      ...activity.questions[0]!,
      id: 'q2',
      prompt: { en: '5 → 10 → 15 → ?' },
      options: [opt('o20', '20'), opt('o25', '25')],
    };
    const onDone = vi.fn();
    render(
      <QuestionActivity
        activity={{
          ...activity,
          config: { feedback: 'reveal' },
          questions: [activity.questions[0]!, second],
        }}
        locale="en"
        preview={false}
        solvedQuestionIds={new Set()}
        onDone={onDone}
        onXp={vi.fn()}
      />,
    );
    expect(screen.getByText('Question 1 of 2')).toBeTruthy();

    respond(answerResult({ revealed: { optionId: 'o10' }, explanation: { en: '8 + 2 = 10' } }));
    fireEvent.click(screen.getByRole('radio', { name: '9' }));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(await screen.findByText('The answer is: 10')).toBeTruthy();
    expect(screen.getByText('8 + 2 = 10')).toBeTruthy();
    // Their own answer stays on screen (locked); no "Try again" in this mode.
    expect(screen.getByRole('radio', { name: '9' }).getAttribute('aria-checked')).toBe('true');
    expect((screen.getByRole('radio', { name: '10' }) as HTMLButtonElement).disabled).toBe(true);
    expect(screen.queryByRole('button', { name: 'Try again' })).toBeNull();
    expect(document.body.textContent).not.toMatch(/wrong|failed/i);

    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    expect(screen.getByText('Question 2 of 2')).toBeTruthy();
    expect(screen.getByRole('heading', { name: '5 → 10 → 15 → ?' })).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // A right answer also moves on with Next.
    respond(answerResult({ correct: true, explanation: { en: '15 + 5 = 20' } }));
    fireEvent.click(screen.getByRole('radio', { name: '20' }));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    fireEvent.click(await screen.findByRole('button', { name: /Next/ }));
    expect(onDone).toHaveBeenCalled();
  });

  it('shows a friendly message if the network fails, and lets the student retry', async () => {
    setup();
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    fireEvent.click(screen.getByRole('radio', { name: '10' }));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect((await screen.findByRole('alert')).textContent).toMatch(/could not reach the server/);
    expect((screen.getByRole('button', { name: 'Check' }) as HTMLButtonElement).disabled).toBe(
      false,
    );
  });

  it('staff preview never sends answers', () => {
    const onDone = vi.fn();
    render(
      <QuestionActivity
        activity={activity}
        locale="en"
        preview
        solvedQuestionIds={new Set()}
        onDone={onDone}
        onXp={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(onDone).toHaveBeenCalled();
  });
});
