'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { PlayOption } from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import { Button } from '../../ui/button';
import { useReducedMotion } from '../use-reduced-motion';
import { OptionButton, optionState } from './option';
import type { QuestionInputProps, QuestionKindDef } from './types';

interface CatchValue {
  caught: string[];
  /** Every item has fallen (or the calm version was finished). */
  done: boolean;
}

/** How long one item takes to fall, and the gap between new items (ms). */
const SPEEDS = {
  slow: { fall: 6500, gap: 1700 },
  normal: { fall: 5200, gap: 1400 },
  fast: { fall: 4000, gap: 1100 },
} as const;
const LANES = 3;
/** A paused tab (or a slow phone) never makes items jump far. */
const MAX_FRAME_MS = 50;

interface Drop {
  option: PlayOption;
  lane: number;
  /** Game clock (ms) when it started falling. */
  at: number;
}

/** Items fall from the top in random lanes, a few at a time; each falls once. */
function schedule(options: PlayOption[], gap: number): Drop[] {
  let lastLane = -1;
  return options.map((option, i) => {
    let lane = (i * 7 + option.id.charCodeAt(0)) % LANES;
    if (lane === lastLane) lane = (lane + 1) % LANES;
    lastLane = lane;
    return { option, lane, at: i * gap };
  });
}

function Label({ option, locale }: { option: PlayOption; locale: string }) {
  return (
    <>
      {option.media?.type === 'emoji' && (
        <span aria-hidden="true" className="text-2xl leading-none">
          {option.media.src}
        </span>
      )}
      <span className="break-words">{contentText(option.label, locale)}</span>
    </>
  );
}

/**
 * Catch the answer: items fall down the screen; tap the ones that fit the question to put them
 * in your basket. Right and wrong are only shown after the game (the phone doesn't know them).
 * Calm version (no movement) for keyboards, screen readers and "reduce motion".
 */
function CatchInput({
  question,
  value,
  onChange,
  disabled,
  locale,
  review,
  submit,
}: QuestionInputProps<CatchValue>) {
  const t = useTranslations('lesson.games');
  const reducedMotion = useReducedMotion();
  const [calm, setCalm] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [clock, setClock] = useState(0);
  const caughtRef = useRef<string[]>([]);
  const speed = SPEEDS[(question.data.speed as keyof typeof SPEEDS) ?? 'normal'] ?? SPEEDS.normal;
  const drops = schedule(question.options, speed.gap);
  const endsAt = (drops.at(-1)?.at ?? 0) + speed.fall;

  // Called when everything has fallen (kept fresh in a ref for the game loop).
  const finish = useRef<() => void>(() => {});
  useEffect(() => {
    finish.current = () => {
      setPlaying(false);
      const final = { caught: caughtRef.current, done: true };
      onChange(final);
      submit?.(final);
    };
  });

  // Game loop: a clock that only moves while the game is on screen and running.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();
    let elapsed = 0;
    const tick = (now: number) => {
      elapsed += Math.min(now - last, MAX_FRAME_MS);
      last = now;
      if (elapsed >= endsAt) return finish.current(); // the game ends and is checked
      setClock(elapsed);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, endsAt]);

  function start() {
    caughtRef.current = [];
    onChange({ caught: [], done: false });
    setClock(0);
    setPlaying(true);
  }

  function grab(id: string) {
    if (!playing || caughtRef.current.includes(id)) return;
    caughtRef.current = [...caughtRef.current, id];
    onChange({ caught: caughtRef.current, done: false });
  }

  const basket = question.options.filter((o) => value.caught.includes(o.id));
  const still = calm || reducedMotion;

  // After the game (or in the calm version): every item as a big button.
  if (value.done || review || (still && !playing)) {
    const right = new Set(
      review?.revealed && 'caught' in review.revealed
        ? review.revealed.caught
        : review?.correct
          ? value.caught
          : [],
    );
    const editable = !value.done && !review && !disabled;
    return (
      <div className="flex flex-col gap-3">
        {editable && <p className="text-sm text-muted">{t('catchCalmHelp')}</p>}
        <div
          role="group"
          aria-label={t('basket')}
          className="grid grid-cols-2 gap-2 sm:grid-cols-3"
        >
          {question.options.map((o) => {
            const selected = value.caught.includes(o.id);
            return (
              <OptionButton
                key={o.id}
                state={optionState(selected, right.has(o.id), review)}
                selected={selected}
                disabled={!editable}
                onSelect={() =>
                  onChange({
                    caught: selected
                      ? value.caught.filter((id) => id !== o.id)
                      : [...value.caught, o.id],
                    done: false,
                  })
                }
              >
                <span className="flex items-center gap-2">
                  <Label option={o} locale={locale} />
                </span>
              </OptionButton>
            );
          })}
        </div>
        {editable && (
          <Button
            variant="secondary"
            onClick={() => {
              const final = { caught: value.caught, done: true };
              onChange(final);
              submit?.(final);
            }}
          >
            ✓ {t('catchDone')}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative h-80 overflow-hidden rounded-2xl border-2 border-sky-200 bg-gradient-to-b from-sky-50 to-white select-none sm:h-96"
        style={{ touchAction: 'manipulation' }}
      >
        {playing ? (
          drops.map((drop) => {
            const progress = (clock - drop.at) / speed.fall;
            if (progress < 0 || progress > 1) return null;
            const caught = value.caught.includes(drop.option.id);
            return (
              <button
                key={drop.option.id}
                type="button"
                disabled={caught}
                onPointerDown={(e) => {
                  e.preventDefault();
                  grab(drop.option.id);
                }}
                onClick={(e) => {
                  if (e.detail === 0) grab(drop.option.id); // keyboard
                }}
                aria-label={contentText(drop.option.label, locale)}
                className={`absolute flex min-h-14 items-center justify-center gap-1.5 rounded-2xl border-2 px-2 py-2 text-center text-sm font-extrabold shadow-md transition-[opacity,transform] duration-300 sm:text-base ${
                  caught
                    ? 'scale-75 border-brand-500 bg-brand-100 text-brand-900 opacity-0'
                    : 'border-white bg-white text-ink hover:border-brand-300'
                }`}
                style={{
                  top: `calc(${progress} * (100% - 3.5rem))`,
                  left: `calc(${drop.lane} * 100% / ${LANES} + 0.25rem)`,
                  width: `calc(100% / ${LANES} - 0.5rem)`,
                }}
              >
                <Label option={drop.option} locale={locale} />
              </button>
            );
          })
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <span aria-hidden="true" className="text-5xl animate-pop">
              🧺
            </span>
            <p className="font-semibold text-ink">{t('catchHelp')}</p>
            <Button size="lg" onClick={start} disabled={disabled}>
              ▶ {t('start')}
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2" aria-live="polite">
        <span className="text-sm font-bold text-muted">
          🧺 {t('basketCount', { count: basket.length })}
        </span>
        {basket.map((o) => (
          <span
            key={o.id}
            className="rounded-full bg-brand-100 px-2.5 py-1 text-xs font-bold text-brand-900 animate-pop"
          >
            {o.media?.type === 'emoji' ? `${o.media.src} ` : ''}
            {contentText(o.label, locale)}
          </span>
        ))}
      </div>

      {!playing && !reducedMotion && (
        <button
          type="button"
          onClick={() => setCalm(true)}
          className="self-start text-sm font-semibold text-brand-700 underline underline-offset-4"
        >
          {t('playStill')}
        </button>
      )}
    </div>
  );
}

export const catchGame: QuestionKindDef<CatchValue> = {
  Input: CatchInput,
  selfSubmit: true,
  restartOnRetry: true,
  initial: () => ({ caught: [], done: false }),
  isReady: (value) => value.done,
  toAnswer: (value) => ({ caught: value.caught }),
  fromRevealed: (revealed) => ({
    caught: 'caught' in revealed ? revealed.caught : [],
    done: true,
  }),
  describe: (revealed, question, _t, locale) =>
    'caught' in revealed
      ? revealed.caught
          .map((id) => contentText(question.options.find((o) => o.id === id)?.label, locale))
          .join(', ')
      : '',
};
