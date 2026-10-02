import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, renderHook, screen } from '@testing-library/react';
import {
  commitmentScore,
  type LessonPlay,
  type PlayActivity,
  type ProgressReport,
} from '@itstarter/shared';
import { renderWithIntl as render } from './render';
import { ProgressTable } from '../src/components/admin/progress-table';
import { QuestionActivity } from '../src/components/learning/question-activity';
import { trueFalse } from '../src/components/learning/questions/binary';
import { RewardStep } from '../src/components/learning/reward-step';
import { SpeakButton } from '../src/components/learning/speak-button';
import { useActiveTime } from '../src/components/learning/use-active-time';

// Phase 17: the question runner with self-checking games, active-time tracking, the listen button,
// the reward step's time report and the progress list's commitment column.

const fetchMock = vi.fn();
let visibility: DocumentVisibilityState = 'visible';
beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
  visibility = 'visible';
  Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => visibility });
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
  vi.useRealTimers();
});

const respond = (data: object) =>
  fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ success: true, data })));
const answer = (overrides: object = {}) => ({
  correct: false,
  partial: null,
  explanation: null,
  revealed: null,
  activityCompleted: false,
  xpAwarded: 0,
  totalXp: 0,
  ...overrides,
});
const sentBodies = () =>
  fetchMock.mock.calls.map(([url, init]) => ({
    url,
    body: JSON.parse((init as RequestInit).body as string),
  }));

describe('question runner with a game', () => {
  const activity: PlayActivity = {
    id: 'act',
    step: 'challenge',
    type: 'game',
    title: { en: 'Game time' },
    config: {},
    isScored: true,
    xpReward: 15,
    position: 6,
    questions: [
      {
        id: 'q1',
        kind: 'catch',
        prompt: { en: 'Catch the input devices!' },
        media: null,
        hint: null,
        difficulty: 1,
        data: { speed: 'slow' },
        options: [
          { id: 'a', label: { en: 'Keyboard' }, media: null, groupKey: null },
          { id: 'b', label: { en: 'Printer' }, media: null, groupKey: null },
        ],
      },
    ],
  };

  const playStill = (pick: string[]) => {
    fireEvent.click(screen.getByRole('button', { name: 'Play without moving items' }));
    for (const name of pick) fireEvent.click(screen.getByRole('radio', { name }));
    fireEvent.click(screen.getByRole('button', { name: /Done/ }));
  };

  it('has no Check button while playing; a wrong try restarts the game; then the answer is shown', async () => {
    const onDone = vi.fn();
    render(
      <QuestionActivity
        activity={activity}
        locale="en"
        preview={false}
        solvedQuestionIds={new Set()}
        onDone={onDone}
        onXp={vi.fn()}
      />,
    );
    expect(screen.getByText(/Play the game above/)).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Check' })).toBeNull();

    // 1st try (caught the printer too): encouraging message, and the game starts again.
    respond(answer({ partial: { correct: 1, total: 2 } }));
    playStill(['Keyboard', 'Printer']);
    expect(await screen.findByText('1 of 2 are right. Keep going!')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Start/ })).toBeTruthy();
    expect(screen.getByText(/Your basket is empty/)).toBeTruthy();
    expect(screen.queryByRole('button', { name: /^(Check|Try again)$/ })).toBeNull();
    expect(document.body.textContent).not.toMatch(/wrong|failed/i);

    // 2nd try: the right answer is shown; Check sends it.
    respond(answer({ revealed: { caught: ['a'] } }));
    playStill([]);
    expect(await screen.findByText('The answer is: Keyboard')).toBeTruthy();
    respond(answer({ correct: true, activityCompleted: true, xpAwarded: 15 }));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    fireEvent.click(await screen.findByRole('button', { name: /Next/ }));
    expect(onDone).toHaveBeenCalled();

    expect(sentBodies().map((r) => r.body.answer)).toEqual([
      { caught: ['a', 'b'] },
      { caught: [] },
      { caught: ['a'] },
    ]);
  });
});

describe('active learning time', () => {
  it('counts only visible, active time; reports every minute and when hidden', () => {
    vi.useFakeTimers();
    for (let i = 0; i < 3; i += 1) respond({ recorded: true });
    const { result, unmount } = renderHook(() => useActiveTime('L1', true));

    act(() => vi.advanceTimersByTime(60_000));
    expect(sentBodies()).toEqual([{ url: '/api/lessons/L1/time', body: { seconds: 60 } }]);
    expect((fetchMock.mock.calls[0]![1] as RequestInit).keepalive).toBe(true);

    // No touch for 3 minutes: counting stops 2 minutes after the last touch (59 s more here,
    // not yet a full minute, so nothing is sent).
    act(() => vi.advanceTimersByTime(180_000));
    expect(sentBodies().map((r) => r.body.seconds)).toEqual([60]);

    // Back for 10 s (the saved 59 s reach a full minute and are sent), then the tab is hidden:
    // the rest goes at once. In total 60 + 59 + 10 = 129 active seconds.
    act(() => {
      window.dispatchEvent(new Event('pointerdown'));
      vi.advanceTimersByTime(10_000);
      visibility = 'hidden';
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(sentBodies().map((r) => r.body.seconds)).toEqual([60, 60, 9]);

    // While hidden nothing counts; take() hands over what is left (nothing).
    act(() => vi.advanceTimersByTime(30_000));
    expect(result.current.take()).toBe(0);
    unmount();
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('does nothing in staff preview', () => {
    vi.useFakeTimers();
    renderHook(() => useActiveTime('L1', false));
    act(() => vi.advanceTimersByTime(120_000));
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('reward step', () => {
  it('sends the time not reported yet with "lesson complete" and shows the XP', async () => {
    respond({
      firstCompletion: true,
      xpAwarded: 50,
      lessonXpTotal: 90,
      totalXp: 110,
      level: {
        number: 1,
        icon: '🌱',
        name: { en: 'Curious Beginner' },
        minXp: 0,
        next: null,
        xpToNext: null,
        percentToNext: 100,
      },
      levelUp: false,
      streak: 1,
      worldPercent: 7,
      nextLessonId: null,
      newAwards: [],
    });
    const lesson = {
      id: 'L1',
      world: { id: 'w', title: { en: 'Math' }, icon: '🔢', color: 'violet' },
      activities: [{ config: { message: { en: 'Well done!' } } }],
      nextLessonId: null,
    } as unknown as LessonPlay;
    render(
      <RewardStep
        lesson={lesson}
        locale="en"
        preview={false}
        elapsedSeconds={() => 42}
        onIncomplete={vi.fn()}
      />,
    );
    expect(await screen.findByText(/\+90 XP/)).toBeTruthy();
    expect(sentBodies()).toEqual([
      { url: '/api/lessons/L1/complete', body: { timeSpentSeconds: 42 } },
    ]);
  });
});

describe('listen button', () => {
  it('reads the English aloud (slowly too), and hides where the browser cannot speak', () => {
    const speak = vi.fn();
    vi.stubGlobal('speechSynthesis', { speak, cancel: vi.fn(), getVoices: () => [] });
    vi.stubGlobal(
      'SpeechSynthesisUtterance',
      class {
        lang = '';
        rate = 1;
        constructor(public text: string) {}
      },
    );
    render(<SpeakButton text="Nice to meet you." />);
    fireEvent.click(screen.getByRole('button', { name: 'Listen' }));
    fireEvent.click(screen.getByRole('button', { name: 'Listen slowly' }));
    expect(speak.mock.calls.map(([u]) => [u.text, u.lang, u.rate])).toEqual([
      ['Nice to meet you.', 'en-US', 0.9],
      ['Nice to meet you.', 'en-US', 0.6],
    ]);
    cleanup();

    vi.unstubAllGlobals();
    render(<SpeakButton text="Hello" />);
    expect(screen.queryByRole('button', { name: 'Listen' })).toBeNull();
  });
});

describe('true / false', () => {
  it('keys 1 and 2 choose; the revealed answer is named', () => {
    expect(trueFalse.shortcut!(0, {} as never)).toBe(true);
    expect(trueFalse.shortcut!(1, {} as never)).toBe(false);
    expect(trueFalse.shortcut!(2, {} as never)).toBeNull();
    expect(trueFalse.fromRevealed({ value: false }, {} as never)).toBe(false);
    expect(trueFalse.describe({ value: true }, {} as never, (k) => k.toUpperCase(), 'en')).toBe(
      'TRUE',
    );
  });
});

describe('progress list', () => {
  const report: ProgressReport = {
    worlds: [
      {
        id: 'w1',
        slug: 'math',
        title: { en: 'Math Playground' },
        icon: '🔢',
        color: 'violet',
        lessonsTotal: 15,
      },
    ],
    summary: { students: 1, averagePercent: 7, activeThisWeek: 1, notStarted: 0, inactive: 0 },
    rows: [
      {
        id: 's1',
        username: 'dara',
        displayName: 'Dara',
        cohortName: 'Class A',
        status: 'active',
        xpTotal: 110,
        level: 1,
        currentStreak: 3,
        lastActiveDate: '2026-10-02',
        lessonsCompleted: 1,
        lessonsTotal: 15,
        percent: 7,
        averageScore: 90,
        worlds: { w1: 1 },
        currentLesson: null,
        commitment: commitmentScore({ activeDays: 12, minutes: 150, lessons: 9 }),
      },
    ],
  };

  it('shows each student’s commitment and lets staff sort by it', () => {
    render(
      <ProgressTable
        report={report}
        today="2026-10-02"
        locale="en"
        sort="commitment"
        dir="desc"
        sortHref={(key) => `/admin/progress?sort=${key}`}
      />,
    );
    expect(screen.getAllByText(/Strong habit/).length).toBeGreaterThan(0);
    const header = screen.getByRole('columnheader', { name: /Commitment/ });
    expect(header.getAttribute('aria-sort')).toBe('descending');
    expect(screen.getByRole('link', { name: /Commitment/ }).getAttribute('href')).toBe(
      '/admin/progress?sort=commitment',
    );
  });
});
