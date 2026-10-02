'use client';

import { useTranslations } from 'next-intl';
import type { QuestionInputProps, QuestionKindDef } from './types';

const DEFAULT_KEYS = [
  'Esc',
  'Tab',
  'Ctrl',
  'Alt',
  'Shift',
  'Space',
  'Enter',
  'Backspace',
  'A',
  'C',
  'V',
  'X',
  'Z',
  'S',
];
const WIDE = new Set(['Space', 'Backspace', 'Enter', 'Shift']);
const SYMBOLS: Record<string, string> = {
  Enter: '⏎',
  Backspace: '⌫',
  Shift: '⇧',
  Tab: '⇥',
  Space: '␣',
};

/** An on-screen keyboard: tap keys to "hold" them, building a shortcut like Ctrl + C. */
function KeyComboInput({ question, value, onChange, disabled }: QuestionInputProps<string[]>) {
  const t = useTranslations('lesson');
  const keys = (question.data.keys as string[] | undefined) ?? DEFAULT_KEYS;

  function toggle(key: string) {
    onChange(value.includes(key) ? value.filter((k) => k !== key) : [...value, key].slice(-4));
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted">{t('keysHelp')}</p>
      <div
        aria-live="polite"
        className="flex min-h-14 items-center justify-between gap-2 rounded-control border-2 border-dashed border-line bg-slate-50 px-4"
      >
        <span className="font-mono text-lg font-bold">
          {value.length > 0 ? t('yourKeys', { keys: value.join(' + ') }) : t('noKeys')}
        </span>
        {value.length > 0 && !disabled && (
          <button
            type="button"
            onClick={() => onChange([])}
            className="min-h-10 rounded-lg px-3 text-sm font-bold text-brand-700"
          >
            {t('clear')}
          </button>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2 rounded-card bg-slate-800 p-3 sm:grid-cols-6">
        {keys.map((key) => {
          const down = value.includes(key);
          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              aria-pressed={down}
              onClick={() => toggle(key)}
              className={`flex min-h-14 flex-col items-center justify-center rounded-lg border-b-4 font-mono text-sm font-bold transition-transform ${
                WIDE.has(key) ? 'col-span-2' : ''
              } ${down ? 'translate-y-0.5 border-brand-800 bg-brand-500 text-white' : 'border-slate-400 bg-white text-slate-800'}`}
            >
              {SYMBOLS[key] && (
                <span aria-hidden="true" className="text-base leading-none">
                  {SYMBOLS[key]}
                </span>
              )}
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const keyCombo: QuestionKindDef<string[]> = {
  Input: KeyComboInput,
  initial: () => [],
  isReady: (value) => value.length > 0,
  toAnswer: (value) => ({ keys: value }),
  fromRevealed: (revealed) => ('keys' in revealed ? revealed.keys : []),
  describe: (revealed) => ('keys' in revealed ? revealed.keys.join(' + ') : ''),
};
