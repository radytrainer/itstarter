import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import type { PlayActivity, PlayQuestion } from '@itstarter/shared';
import { renderWithIntl as render } from './render';
import { CreationActivity } from '../src/components/learning/creation-activity';
import { MouseTrainer } from '../src/components/learning/mouse-trainer';
import { QuestionScene } from '../src/components/learning/question-scene';
import { QUESTION_KINDS } from '../src/components/learning/questions/registry';

const fetchMock = vi.fn();
beforeEach(() => vi.stubGlobal('fetch', fetchMock));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
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

/** Renders a question input with real state and reports every value change. */
function renderKind(kind: string, q: PlayQuestion) {
  const def = QUESTION_KINDS[kind]!;
  const onValue = vi.fn();
  function Harness() {
    const [value, setValue] = useState(def.initial(q));
    return (
      <def.Input
        question={q}
        value={value}
        onChange={(v: unknown) => {
          setValue(v);
          onValue(v);
        }}
        disabled={false}
        locale="en"
      />
    );
  }
  render(<Harness />);
  return { def, onValue, last: () => onValue.mock.calls.at(-1)?.[0] };
}

describe('key combo (on-screen keyboard)', () => {
  it('holds keys to build a shortcut, and can clear', () => {
    const q = question('key_combo', { data: { keys: ['Ctrl', 'C', 'V'] } });
    const { def, last } = renderKind('key_combo', q);
    fireEvent.click(screen.getByRole('button', { name: 'Ctrl' }));
    fireEvent.click(screen.getByRole('button', { name: 'C' }));
    expect(screen.getByText('You are pressing: Ctrl + C')).toBeTruthy();
    expect(def.toAnswer(last(), q)).toEqual({ keys: ['Ctrl', 'C'] });
    expect(screen.getByRole('button', { name: 'Ctrl' }).getAttribute('aria-pressed')).toBe('true');

    fireEvent.click(screen.getByRole('button', { name: 'C' })); // let go of C
    expect(last()).toEqual(['Ctrl']);
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(last()).toEqual([]);
  });
});

describe('categorize (sort into groups)', () => {
  const q = question('categorize', {
    options: [
      opt('b1', 'Photos', 'bucket'),
      opt('b2', 'Music', 'bucket'),
      opt('i1', 'beach.jpg', 'item'),
      opt('i2', 'song.mp3', 'item'),
    ],
  });

  it('works by tapping: item, then group; tap a sorted item to take it out', () => {
    const { def, last } = renderKind('categorize', q);
    expect((screen.getByRole('button', { name: 'Photos' }) as HTMLButtonElement).disabled).toBe(
      true,
    );

    fireEvent.click(screen.getByRole('button', { name: 'beach.jpg' }));
    fireEvent.click(screen.getByRole('button', { name: 'Photos' }));
    expect(last()).toEqual({ i1: 'b1' });
    expect(def.isReady(last(), q)).toBe(false);

    fireEvent.click(screen.getByRole('button', { name: 'song.mp3' }));
    fireEvent.click(screen.getByRole('button', { name: 'Music' }));
    expect(def.isReady(last(), q)).toBe(true);
    expect(screen.getByText('Everything is sorted. Press Check!')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Take “beach.jpg” out of Photos' }));
    expect(last()).toEqual({ i2: 'b2' });
  });
});

describe('cell select (spreadsheet)', () => {
  it('shows column letters and row numbers, and selects a cell', () => {
    const q = question('cell_select', {
      data: {
        grid: {
          rows: [
            ['Item', 'Cost'],
            ['Food', 2],
          ],
        },
      },
    });
    const { def, last } = renderKind('cell_select', q);
    expect(screen.getByRole('columnheader', { name: 'A' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'B2: 2' }));
    expect(screen.getByText('Selected cell: B2')).toBeTruthy();
    expect(def.toAnswer(last(), q)).toEqual({ cell: 'B2' });
    // An empty row is added below the data (where a total goes).
    expect(screen.getByRole('button', { name: 'B3' })).toBeTruthy();
  });
});

describe('format text (mini word processor)', () => {
  it('toggles bold, size and alignment and shows a live preview', () => {
    const q = question('format_text', { data: { text: 'My Profile' } });
    const { def, last } = renderKind('format_text', q);
    fireEvent.click(screen.getByRole('button', { name: 'Bold' }));
    fireEvent.click(screen.getByRole('button', { name: 'Size: Large' }));
    fireEvent.click(screen.getByRole('button', { name: 'Alignment: Centre' }));
    expect(def.toAnswer(last(), q)).toEqual({
      format: { bold: true, italic: false, underline: false, size: 'large', align: 'center' },
    });
    const preview = screen.getByText('My Profile');
    expect(preview.className).toContain('font-extrabold');
    expect(preview.className).toContain('text-center');
  });
});

describe('prompt builder', () => {
  it('builds the prompt from one piece per part', () => {
    const q = question('prompt_builder', {
      options: [
        opt('r1', 'You are a teacher.', 'role'),
        opt('r2', 'You are a cat.', 'role'),
        opt('t1', 'Explain RAM.', 'task'),
      ],
    });
    const { def, last } = renderKind('prompt_builder', q);
    fireEvent.click(screen.getByRole('radio', { name: 'You are a teacher.' }));
    expect(def.isReady(last(), q)).toBe(false);
    fireEvent.click(screen.getByRole('radio', { name: 'Explain RAM.' }));
    expect(def.isReady(last(), q)).toBe(true);
    expect(screen.getByText('You are a teacher. Explain RAM.')).toBeTruthy();
    expect(def.toAnswer(last(), q)).toEqual({ optionIds: ['r1', 't1'] });
  });
});

describe('question scenes', () => {
  it('shows a mock email without making anything clickable', () => {
    render(
      <QuestionScene
        kind="safe_or_dangerous"
        data={{
          mock: {
            type: 'email',
            from: 'prize@lucky.xyz',
            subject: 'You won!',
            body: 'Click here',
            attachment: 'claim.exe',
          },
        }}
      />,
    );
    expect(screen.getByText('prize@lucky.xyz')).toBeTruthy();
    expect(screen.getByText('claim.exe')).toBeTruthy();
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('warns on a non-https address', () => {
    render(
      <QuestionScene
        kind="safe_or_dangerous"
        data={{ mock: { type: 'url', url: 'http://faceb00k.xyz' } }}
      />,
    );
    expect(screen.getByText('⚠️')).toBeTruthy();
  });

  it('shows an AI chat', () => {
    render(
      <QuestionScene
        kind="true_false"
        data={{
          mock: {
            type: 'chat',
            messages: [
              { from: 'you', text: 'Hi' },
              { from: 'ai', text: 'Hello!' },
            ],
          },
        }}
      />,
    );
    expect(screen.getByText('Hello!')).toBeTruthy();
  });
});

const activity = (type: string, config: Record<string, unknown>): PlayActivity => ({
  id: 'act',
  step: 'challenge',
  type,
  title: { en: 'My Profile' },
  config,
  isScored: false,
  xpReward: 20,
  position: 5,
  questions: [],
});

describe('mouse trainer', () => {
  it('completes tap, double-tap and right-click practice', async () => {
    vi.useFakeTimers();
    const onFinish = vi.fn();
    render(
      <MouseTrainer
        activity={activity('mouse_trainer', { tasks: ['tap', 'double', 'long'] })}
        onFinish={onFinish}
        busy={false}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '⭐' }));
    await act(() => vi.advanceTimersByTimeAsync(1000));

    fireEvent.doubleClick(screen.getByRole('button', { name: '📁' }));
    expect(screen.getByText('The folder opened! 📂')).toBeTruthy();
    await act(() => vi.advanceTimersByTimeAsync(1000));

    fireEvent.contextMenu(screen.getByRole('button', { name: '📄' }));
    await act(() => vi.advanceTimersByTimeAsync(1000));

    expect(screen.getByText('All practice done!')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '→' }));
    expect(onFinish).toHaveBeenCalled();
  });

  it('can be skipped (accessibility)', () => {
    render(
      <MouseTrainer
        activity={activity('mouse_trainer', { tasks: ['drag'] })}
        onFinish={vi.fn()}
        busy={false}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /skip this practice/ }));
    expect(screen.getByText('All practice done!')).toBeTruthy();
  });
});

describe('creative work', () => {
  const profile = activity('creation', {
    template: 'document',
    fields: [
      { key: 'name', label: { en: 'My name' }, maxLength: 60, multiline: false },
      { key: 'dream', label: { en: 'My dream' }, maxLength: 160, multiline: true },
    ],
  });

  it('shows a live preview and saves when every field is filled', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: true,
          data: { activityCompleted: true, xpAwarded: 20, totalXp: 20 },
        }),
      ),
    );
    const onDone = vi.fn();
    render(
      <CreationActivity
        activity={profile}
        locale="en"
        preview={false}
        saved={undefined}
        onDone={onDone}
      />,
    );
    const save = screen.getByRole('button', { name: /Save my work/ }) as HTMLButtonElement;
    expect(save.disabled).toBe(true);

    fireEvent.change(screen.getByLabelText('My name'), { target: { value: 'Sokha' } });
    fireEvent.change(screen.getByLabelText('My dream'), { target: { value: 'Build apps' } });
    expect(screen.getAllByText('Sokha').length).toBeGreaterThan(0); // preview
    fireEvent.click(save);

    await waitFor(() => expect(onDone).toHaveBeenCalledWith(20));
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('/api/activities/act/creation');
    expect(init.method).toBe('PUT');
    expect(JSON.parse(init.body)).toEqual({ content: { name: 'Sokha', dream: 'Build apps' } });
  });

  it('shows saved work again', () => {
    render(
      <CreationActivity
        activity={profile}
        locale="en"
        preview={false}
        saved={{ name: 'Dara', dream: 'Teach IT' }}
        onDone={vi.fn()}
      />,
    );
    expect((screen.getByLabelText('My name') as HTMLInputElement).value).toBe('Dara');
  });

  it('budget template adds up a weekly total', () => {
    const budget = activity('creation', {
      template: 'budget',
      fields: [
        { key: 'food', label: { en: 'Food ($)' }, maxLength: 6, multiline: false },
        { key: 'transport', label: { en: 'Transport ($)' }, maxLength: 6, multiline: false },
      ],
    });
    render(
      <CreationActivity
        activity={budget}
        locale="en"
        preview={false}
        saved={{ food: '2.5', transport: '1,5' }}
        onDone={vi.fn()}
      />,
    );
    expect(screen.getByText(/\$4 per week/)).toBeTruthy();
  });
});
