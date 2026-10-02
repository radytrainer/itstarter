'use client';

import { useTranslations } from 'next-intl';
import { OptionButton, optionState } from './option';
import type { QuestionInputProps, QuestionKindDef } from './types';

interface Choice<V> {
  value: V;
  labelKey: string;
  icon: string;
}

/** Two big tiles: True/False, or Safe/Dangerous. Keys 1 and 2 (or A and B) choose. */
function makeBinaryInput<V extends boolean | string>(choices: [Choice<V>, Choice<V>]) {
  return function BinaryInput({ value, onChange, disabled, review }: QuestionInputProps<V | null>) {
    const t = useTranslations('lesson');
    const right =
      review?.revealed && 'value' in review.revealed ? (review.revealed.value as unknown) : null;
    return (
      <div role="radiogroup" className="grid grid-cols-2 gap-3">
        {choices.map((choice) => {
          const selected = value === choice.value;
          return (
            <OptionButton
              key={String(choice.value)}
              layout="tile"
              state={optionState(selected, right === choice.value, review)}
              selected={selected}
              emoji={choice.icon}
              disabled={disabled}
              onSelect={() => onChange(choice.value)}
            >
              {t(choice.labelKey)}
            </OptionButton>
          );
        })}
      </div>
    );
  };
}

const TRUE_FALSE: [Choice<boolean>, Choice<boolean>] = [
  { value: true, labelKey: 'true', icon: '👍' },
  { value: false, labelKey: 'false', icon: '👎' },
];

const SAFE_DANGEROUS: [Choice<'safe' | 'dangerous'>, Choice<'safe' | 'dangerous'>] = [
  { value: 'safe', labelKey: 'safe', icon: '🛡️' },
  { value: 'dangerous', labelKey: 'dangerous', icon: '⚠️' },
];

export const trueFalse: QuestionKindDef<boolean | null> = {
  Input: makeBinaryInput<boolean>(TRUE_FALSE),
  initial: () => null,
  isReady: (value) => value !== null,
  toAnswer: (value) => ({ value: value! }),
  shortcut: (index) => TRUE_FALSE[index]?.value ?? null,
  fromRevealed: (revealed) =>
    'value' in revealed && typeof revealed.value === 'boolean' ? revealed.value : null,
  describe: (revealed, _q, t) => ('value' in revealed ? t(revealed.value ? 'true' : 'false') : ''),
};

export const safeOrDangerous: QuestionKindDef<'safe' | 'dangerous' | null> = {
  Input: makeBinaryInput<'safe' | 'dangerous'>(SAFE_DANGEROUS),
  initial: () => null,
  isReady: (value) => value !== null,
  toAnswer: (value) => ({ value: value! }),
  shortcut: (index) => SAFE_DANGEROUS[index]?.value ?? null,
  fromRevealed: (revealed) =>
    'value' in revealed && (revealed.value === 'safe' || revealed.value === 'dangerous')
      ? revealed.value
      : null,
  describe: (revealed, _q, t) => ('value' in revealed ? t(String(revealed.value)) : ''),
};
