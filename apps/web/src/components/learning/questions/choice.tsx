'use client';

import { contentText } from '@/i18n/content';
import { LETTERS, OptionButton, optionState } from './option';
import type { QuestionInputProps, QuestionKindDef } from './types';

function ChoiceInput({
  question,
  value,
  onChange,
  disabled,
  locale,
  review,
}: QuestionInputProps<string | null>) {
  const rightId =
    review?.revealed && 'optionId' in review.revealed ? review.revealed.optionId : null;
  return (
    <div
      role="radiogroup"
      aria-label={contentText(question.prompt, locale)}
      className="flex flex-col gap-2.5"
    >
      {question.options.map((option, i) => {
        const selected = value === option.id;
        return (
          <OptionButton
            key={option.id}
            state={optionState(selected, option.id === rightId, review)}
            selected={selected}
            letter={LETTERS[i]}
            emoji={option.media?.type === 'emoji' ? option.media.src : undefined}
            disabled={disabled}
            onSelect={() => onChange(option.id)}
          >
            {contentText(option.label, locale)}
          </OptionButton>
        );
      })}
    </div>
  );
}

export const singleChoice: QuestionKindDef<string | null> = {
  Input: ChoiceInput,
  initial: () => null,
  isReady: (value) => value !== null,
  toAnswer: (value) => ({ optionId: value! }),
  shortcut: (index, question) => question.options[index]?.id ?? null,
  fromRevealed: (revealed) => ('optionId' in revealed ? revealed.optionId : null),
  describe: (revealed, question, _t, locale) => {
    const option =
      'optionId' in revealed ? question.options.find((o) => o.id === revealed.optionId) : undefined;
    return option ? contentText(option.label, locale) : '';
  },
};
