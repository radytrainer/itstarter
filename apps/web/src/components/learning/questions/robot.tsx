'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  countBlocks,
  REPEAT_BODY_MAX,
  REPEAT_MAX,
  REPEAT_MIN,
  robotBoardSchema,
  runRobot,
  PROGRAM_MAX_BLOCKS,
  type Cell,
  type RobotBlock,
  type RobotBoard,
  type RobotDirection,
  type RobotRun,
} from '@itstarter/shared';
import { Button } from '../../ui/button';
import { useReducedMotion } from '../use-reduced-motion';
import type { QuestionInputProps, QuestionKindDef } from './types';

interface RobotValue {
  program: RobotBlock[];
  /** The last block is a repeat that new arrows go into. */
  openRepeat: boolean;
}

const ARROW: Record<RobotDirection, string> = { up: '⬆️', down: '⬇️', left: '⬅️', right: '➡️' };
const DIRECTIONS: RobotDirection[] = ['up', 'left', 'right', 'down'];

const key = (c: Cell) => `${c[0]},${c[1]}`;

function boardOf(data: Record<string, unknown>): RobotBoard | null {
  const parsed = robotBoardSchema.safeParse(data.robot);
  return parsed.success ? parsed.data : null;
}

function BlockChip({ block, active }: { block: RobotBlock; active?: boolean }) {
  if (typeof block === 'string') {
    return (
      <span className="flex size-10 items-center justify-center rounded-lg bg-surface text-xl shadow-sm ring-1 ring-line animate-pop">
        {ARROW[block]}
      </span>
    );
  }
  return (
    <span
      className={`flex items-center gap-1 rounded-xl border-2 px-1.5 py-1 animate-pop ${
        active ? 'border-dashed border-brand-500 bg-brand-50' : 'border-violet-300 bg-violet-50'
      }`}
    >
      <span className="px-1 text-sm font-extrabold text-violet-800">🔁 {block.repeat}×</span>
      {block.do.map((d, i) => (
        <span
          key={i}
          className="flex size-8 items-center justify-center rounded-md bg-surface text-lg shadow-sm"
        >
          {ARROW[d]}
        </span>
      ))}
      {active && block.do.length === 0 && (
        <span className="px-1 text-xs font-semibold text-brand-700">…</span>
      )}
    </span>
  );
}

/**
 * Robot path: build a program from arrow blocks (and repeat blocks), press Run, and watch the
 * robot walk the grid. Teaches sequences, loops and debugging: when it bumps into something,
 * fix the program and run it again.
 */
function RobotInput({
  question,
  value,
  onChange,
  disabled,
  review,
  submit,
}: QuestionInputProps<RobotValue>) {
  const t = useTranslations('lesson.games');
  const reducedMotion = useReducedMotion();
  const board = boardOf(question.data);
  const [step, setStep] = useState(0);
  const [run, setRun] = useState<RobotRun | null>(null);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);
  useEffect(() => () => clearInterval(timer.current), []);

  if (!board) return <p className="text-sm text-muted">{t('robotMissing')}</p>;

  const blocks = countBlocks(value.program);
  const limit = board.maxBlocks ?? PROGRAM_MAX_BLOCKS;
  const full = blocks >= limit;
  const last = value.program.at(-1);
  const openBlock = value.openRepeat && last && typeof last !== 'string' ? last : null;
  const editable = !disabled && !running && !review;

  function edit(program: RobotBlock[], openRepeat = value.openRepeat) {
    setRun(null);
    setStep(0);
    onChange({ program, openRepeat });
  }

  function addArrow(dir: RobotDirection) {
    if (openBlock) {
      if (openBlock.do.length >= REPEAT_BODY_MAX) return;
      edit([...value.program.slice(0, -1), { ...openBlock, do: [...openBlock.do, dir] }]);
    } else {
      edit([...value.program, dir]);
    }
  }

  function setRepeatCount(delta: number) {
    if (!openBlock) return;
    const repeat = Math.min(REPEAT_MAX, Math.max(REPEAT_MIN, openBlock.repeat + delta));
    edit([...value.program.slice(0, -1), { ...openBlock, repeat }]);
  }

  function undo() {
    if (openBlock && openBlock.do.length > 0) {
      edit([...value.program.slice(0, -1), { ...openBlock, do: openBlock.do.slice(0, -1) }]);
    } else if (openBlock) {
      edit(value.program.slice(0, -1), false);
    } else {
      edit(value.program.slice(0, -1), false);
    }
  }

  function play() {
    const result = runRobot(board!, value.program);
    clearInterval(timer.current);
    setRun(result);
    setStep(0);
    setRunning(true);
    let at = 0;
    timer.current = setInterval(
      () => {
        at += 1;
        if (at >= result.path.length) {
          clearInterval(timer.current);
          setRunning(false);
          if (!review && !disabled) submit?.(value);
          return;
        }
        setStep(at);
      },
      reducedMotion ? 150 : 450,
    );
  }

  const robotAt = run ? run.path[Math.min(step, run.path.length - 1)]! : board.start;
  const visited = new Set(run ? run.path.slice(0, step + 1).map(key) : []);
  const walls = new Set(board.walls.map(key));
  const items = new Set(board.collect.map(key));
  const finished = run && !running;
  const outcome = finished ? run.outcome : null;

  return (
    <div className="flex flex-col gap-4">
      {/* The board */}
      <div
        className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border-2 border-slate-300 bg-emerald-50"
        style={{ aspectRatio: `${board.cols} / ${board.rows}` }}
        role="img"
        aria-label={t('robotBoard', {
          rows: board.rows,
          cols: board.cols,
          row: robotAt[0] + 1,
          col: robotAt[1] + 1,
        })}
      >
        <div
          className="grid size-full"
          style={{
            gridTemplateColumns: `repeat(${board.cols}, 1fr)`,
            gridTemplateRows: `repeat(${board.rows}, 1fr)`,
          }}
        >
          {Array.from({ length: board.rows * board.cols }, (_, i) => {
            const cell: Cell = [Math.floor(i / board.cols), i % board.cols];
            const k = key(cell);
            const isGoal = k === key(board.goal);
            const picked = items.has(k) && visited.has(k);
            return (
              <span
                key={k}
                className={`flex items-center justify-center border border-emerald-100 text-xl sm:text-2xl ${
                  walls.has(k)
                    ? 'bg-slate-500'
                    : visited.has(k)
                      ? 'bg-amber-100'
                      : (cell[0] + cell[1]) % 2
                        ? 'bg-emerald-50'
                        : 'bg-white'
                }`}
              >
                {walls.has(k) ? (
                  <span aria-hidden="true">🧱</span>
                ) : isGoal ? (
                  <span aria-hidden="true" className={outcome === 'goal' ? 'animate-pop' : ''}>
                    {board.goalIcon ?? '🏁'}
                  </span>
                ) : items.has(k) && !picked ? (
                  <span aria-hidden="true">{board.collectIcon ?? '⭐'}</span>
                ) : null}
              </span>
            );
          })}
        </div>
        {/* The robot glides from cell to cell */}
        <span
          aria-hidden="true"
          className={`absolute flex items-center justify-center text-2xl transition-[left,top] ease-in-out sm:text-3xl ${
            reducedMotion ? 'duration-100' : 'duration-[400ms]'
          } ${outcome && outcome !== 'goal' ? 'animate-[wobble_400ms_ease-in-out_2]' : ''}`}
          style={{
            width: `${100 / board.cols}%`,
            height: `${100 / board.rows}%`,
            left: `${(robotAt[1] / board.cols) * 100}%`,
            top: `${(robotAt[0] / board.rows) * 100}%`,
          }}
        >
          {outcome === 'goal' ? '🥳' : outcome ? '😵' : '🤖'}
        </span>
      </div>

      {outcome && (
        <p
          aria-live="polite"
          className={`rounded-xl px-3 py-2 text-sm font-bold ${
            outcome === 'goal' ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-950'
          }`}
        >
          {t(`robotOutcome.${outcome}`, { step: run!.steps + 1, max: limit })}
        </p>
      )}

      {/* The program */}
      <section aria-label={t('program')} className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm font-bold text-muted">
          <span>{t('program')}</span>
          <span className={`tabular-nums ${full ? 'text-amber-700' : ''}`}>
            {t('blocks', { count: blocks, max: limit })}
          </span>
        </div>
        <div className="flex min-h-14 flex-wrap items-center gap-1.5 rounded-xl border-2 border-dashed border-line bg-slate-50 p-2">
          {value.program.length === 0 ? (
            <span className="px-1 text-sm text-muted">{t('programEmpty')}</span>
          ) : (
            value.program.map((block, i) => (
              <BlockChip
                key={i}
                block={block}
                active={value.openRepeat && i === value.program.length - 1}
              />
            ))
          )}
        </div>
      </section>

      {editable && (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-4 gap-2">
            {DIRECTIONS.map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => addArrow(dir)}
                disabled={full || (openBlock !== null && openBlock.do.length >= REPEAT_BODY_MAX)}
                aria-label={t(`dir.${dir}`)}
                className="flex min-h-14 items-center justify-center rounded-xl border-2 border-line bg-surface text-2xl shadow-sm transition-transform enabled:hover:border-brand-300 enabled:active:scale-95 disabled:opacity-40"
              >
                {ARROW[dir]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {openBlock ? (
              <>
                <span className="flex items-center gap-1 rounded-xl bg-violet-50 px-2 py-1 text-sm font-bold text-violet-900">
                  🔁
                  <button
                    type="button"
                    onClick={() => setRepeatCount(-1)}
                    aria-label={t('fewerTimes')}
                    className="flex size-9 items-center justify-center rounded-lg bg-surface text-lg shadow-sm"
                  >
                    −
                  </button>
                  <span className="w-8 text-center tabular-nums">{openBlock.repeat}×</span>
                  <button
                    type="button"
                    onClick={() => setRepeatCount(1)}
                    aria-label={t('moreTimes')}
                    className="flex size-9 items-center justify-center rounded-lg bg-surface text-lg shadow-sm"
                  >
                    +
                  </button>
                </span>
                <Button
                  variant="secondary"
                  disabled={openBlock.do.length === 0}
                  onClick={() => edit(value.program, false)}
                >
                  ✓ {t('closeRepeat')}
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                disabled={blocks + 2 > limit}
                onClick={() => edit([...value.program, { repeat: 2, do: [] }], true)}
              >
                🔁 {t('addRepeat')}
              </Button>
            )}
            <Button variant="ghost" disabled={value.program.length === 0} onClick={undo}>
              ⌫ {t('undo')}
            </Button>
            <Button
              variant="ghost"
              disabled={value.program.length === 0}
              onClick={() => edit([], false)}
            >
              {t('clearAll')}
            </Button>
          </div>
        </div>
      )}

      <Button
        size="lg"
        variant={review ? 'secondary' : 'primary'}
        disabled={
          running ||
          (disabled && !review) ||
          value.program.length === 0 ||
          (openBlock !== null && openBlock.do.length === 0)
        }
        onClick={play}
      >
        ▶ {review ? t('watchAgain') : t('run')}
      </Button>
    </div>
  );
}

export const robotGame: QuestionKindDef<RobotValue> = {
  Input: RobotInput,
  selfSubmit: true,
  initial: () => ({ program: [], openRepeat: false }),
  isReady: (value) => {
    const last = value.program.at(-1);
    return (
      value.program.length > 0 &&
      !(value.openRepeat && last && typeof last !== 'string' && last.do.length === 0)
    );
  },
  toAnswer: (value) => ({
    // An empty repeat (still being built) is left out.
    program: value.program.filter((b) => typeof b === 'string' || b.do.length > 0),
  }),
  fromRevealed: (revealed) => ({
    program: 'program' in revealed ? revealed.program : [],
    openRepeat: false,
  }),
  describe: (revealed) =>
    'program' in revealed
      ? revealed.program
          .map((b) =>
            typeof b === 'string'
              ? ARROW[b]
              : `🔁${b.repeat}×(${b.do.map((d) => ARROW[d]).join('')})`,
          )
          .join(' ')
      : '',
};
