'use client';

import { useRef, useState, type UIEvent } from 'react';
import { useTranslations } from 'next-intl';
import type { PlayActivity } from '@itstarter/shared';
import { Button } from '../ui/button';
import { Feedback } from '../ui/feedback';
import { useDrag } from './use-drag';

type Task = 'tap' | 'double' | 'long' | 'drag' | 'scroll';

const DOUBLE_TAP_MS = 450;
const LONG_PRESS_MS = 600;

function TapTask({ onDone }: { onDone: () => void }) {
  return (
    <button
      type="button"
      onClick={onDone}
      className="mx-auto flex size-28 items-center justify-center rounded-full bg-amber-100 text-6xl shadow-card animate-pop"
      aria-label="⭐"
    >
      ⭐
    </button>
  );
}

function DoubleTask({ onDone }: { onDone: () => void }) {
  const last = useRef(0);
  // Two quick taps (phones) or a real double-click (computers).
  function tap() {
    const now = Date.now();
    if (now - last.current < DOUBLE_TAP_MS) onDone();
    last.current = now;
  }
  return (
    <button
      type="button"
      onClick={tap}
      onDoubleClick={onDone}
      style={{ touchAction: 'manipulation' }}
      className="mx-auto flex size-28 flex-col items-center justify-center rounded-2xl bg-sky-100 text-6xl shadow-card"
      aria-label="📁"
    >
      📁
    </button>
  );
}

function LongPressTask({ onDone }: { onDone: () => void }) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
  };
  return (
    <button
      type="button"
      onPointerDown={() => {
        cancel();
        timer.current = setTimeout(onDone, LONG_PRESS_MS);
      }}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onContextMenu={(e) => {
        e.preventDefault(); // a real right-click on a computer
        onDone();
      }}
      style={{ touchAction: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
      className="mx-auto flex size-28 items-center justify-center rounded-2xl bg-violet-100 text-6xl shadow-card active:scale-95"
      aria-label="📄"
    >
      📄
    </button>
  );
}

function DragTask({ onDone }: { onDone: () => void }) {
  const drag = useDrag((target) => {
    if (target === 'folder') onDone();
  });
  return (
    <div className="flex items-center justify-between gap-6 rounded-card bg-slate-50 p-6">
      <span
        {...drag.handlers}
        style={drag.style}
        className="cursor-grab select-none text-6xl"
        role="img"
        aria-label="📄"
      >
        📄
      </span>
      <span aria-hidden="true" className="text-3xl text-slate-400">
        ⇢
      </span>
      <span
        data-drop="folder"
        className="flex size-28 items-center justify-center rounded-2xl border-4 border-dashed border-sky-300 text-6xl"
        role="img"
        aria-label="📁"
      >
        📁
      </span>
    </div>
  );
}

function ScrollTask({ onDone }: { onDone: () => void }) {
  function onScroll(event: UIEvent<HTMLDivElement>) {
    const el = event.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) onDone();
  }
  return (
    <div
      onScroll={onScroll}
      tabIndex={0}
      className="h-48 overflow-y-auto rounded-card border border-line bg-surface p-4"
    >
      {['🌊', '🐟', '🐠', '🐙', '🐚', '🪸', '🐡', '🦀'].map((e) => (
        <p key={e} className="py-4 text-center text-4xl" aria-hidden="true">
          {e}
        </p>
      ))}
      <p className="py-4 text-center text-5xl">💎</p>
    </div>
  );
}

const TASKS: Record<Task, { Component: typeof TapTask; doneKey: string }> = {
  tap: { Component: TapTask, doneKey: 'great' },
  double: { Component: DoubleTask, doneKey: 'opened' },
  long: { Component: LongPressTask, doneKey: 'menu' },
  drag: { Component: DragTask, doneKey: 'moved' },
  scroll: { Component: ScrollTask, doneKey: 'found' },
};

/**
 * Mouse practice made for phones: tap, double-tap, press-and-hold (right-click), drag and scroll.
 * Each also works with a real mouse. Not scored: finishing it completes the activity.
 */
export function MouseTrainer({
  activity,
  onFinish,
  busy,
}: {
  activity: PlayActivity;
  onFinish: () => void;
  busy: boolean;
}) {
  const t = useTranslations('lesson.mouse');
  const tasks = ((activity.config.tasks ?? []) as Task[]).filter((task) => task in TASKS);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const task = tasks[index];
  const allDone = index >= tasks.length;

  function complete() {
    if (done) return;
    setDone(true);
    window.setTimeout(() => {
      setDone(false);
      setIndex((i) => i + 1);
    }, 900);
  }

  if (allDone || !task) {
    return (
      <div className="flex flex-col gap-4">
        <Feedback tone="success" title={t('allDone')} />
        <Button
          size="lg"
          variant="success"
          onClick={onFinish}
          loading={busy}
          className="sm:w-56 sm:self-end"
        >
          →
        </Button>
      </div>
    );
  }

  const { Component, doneKey } = TASKS[task];
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-bold text-muted">
        {t('taskOf', { current: index + 1, total: tasks.length })}
      </p>
      <h2 className="text-2xl font-extrabold">{t(task)}</h2>
      <div key={task} className="py-4">
        <Component onDone={complete} />
      </div>
      <div aria-live="polite">{done && <Feedback tone="success" title={t(doneKey)} />}</div>
      <button
        type="button"
        onClick={() => setIndex(tasks.length)}
        className="min-h-11 self-start text-sm font-semibold text-muted underline"
      >
        {t('skip')}
      </button>
    </div>
  );
}
