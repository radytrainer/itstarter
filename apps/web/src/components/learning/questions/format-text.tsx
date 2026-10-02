'use client';

import { useTranslations } from 'next-intl';
import { TEXT_FORMAT_DEFAULT, type TextFormat } from '@itstarter/shared';
import type { QuestionInputProps, QuestionKindDef } from './types';

const SIZE_CLASS = { small: 'text-base', normal: 'text-2xl', large: 'text-4xl' } as const;
const ALIGN_CLASS = { left: 'text-left', center: 'text-center', right: 'text-right' } as const;

function ToolButton({
  pressed,
  onClick,
  disabled,
  label,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex size-11 items-center justify-center rounded-lg border text-lg ${
        pressed ? 'border-brand-600 bg-brand-100 text-brand-800' : 'border-line bg-surface'
      }`}
    >
      {children}
    </button>
  );
}

/** A mini word processor: one line of text and a toolbar (B, I, U, size, alignment). */
function FormatTextInput({ question, value, onChange, disabled }: QuestionInputProps<TextFormat>) {
  const t = useTranslations('lesson.format');
  const text = String(question.data.text ?? 'Text');
  const set = (patch: Partial<TextFormat>) => onChange({ ...value, ...patch });

  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
      <div
        role="toolbar"
        aria-label={t('toolbar')}
        className="flex flex-wrap items-center gap-1.5 border-b border-line bg-slate-50 p-2"
      >
        <ToolButton
          pressed={value.bold}
          onClick={() => set({ bold: !value.bold })}
          disabled={disabled}
          label={t('bold')}
        >
          <b>B</b>
        </ToolButton>
        <ToolButton
          pressed={value.italic}
          onClick={() => set({ italic: !value.italic })}
          disabled={disabled}
          label={t('italic')}
        >
          <i className="font-serif">I</i>
        </ToolButton>
        <ToolButton
          pressed={value.underline}
          onClick={() => set({ underline: !value.underline })}
          disabled={disabled}
          label={t('underline')}
        >
          <u>U</u>
        </ToolButton>
        <span className="mx-1 h-8 w-px bg-line" aria-hidden="true" />
        {(['small', 'normal', 'large'] as const).map((size, i) => (
          <ToolButton
            key={size}
            pressed={value.size === size}
            onClick={() => set({ size })}
            disabled={disabled}
            label={`${t('size')}: ${t(size)}`}
          >
            <span className={['text-xs', 'text-base', 'text-xl'][i]}>A</span>
          </ToolButton>
        ))}
        <span className="mx-1 h-8 w-px bg-line" aria-hidden="true" />
        {(['left', 'center', 'right'] as const).map((align) => (
          <ToolButton
            key={align}
            pressed={value.align === align}
            onClick={() => set({ align })}
            disabled={disabled}
            label={`${t('align')}: ${t(align)}`}
          >
            <span
              aria-hidden="true"
              className={`flex w-5 flex-col gap-0.5 ${align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start'}`}
            >
              <span className="h-0.5 w-5 bg-current" />
              <span className="h-0.5 w-3 bg-current" />
              <span className="h-0.5 w-4 bg-current" />
            </span>
          </ToolButton>
        ))}
      </div>
      <div className="min-h-28 p-5" aria-label={t('preview')}>
        <p
          className={`break-words ${SIZE_CLASS[value.size]} ${ALIGN_CLASS[value.align]} ${value.bold ? 'font-extrabold' : 'font-normal'} ${
            value.italic ? 'italic' : ''
          } ${value.underline ? 'underline' : ''}`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export const formatText: QuestionKindDef<TextFormat> = {
  Input: FormatTextInput,
  initial: () => ({ ...TEXT_FORMAT_DEFAULT }),
  isReady: () => true,
  toAnswer: (value) => ({ format: value }),
  fromRevealed: (revealed) => ('format' in revealed ? revealed.format : { ...TEXT_FORMAT_DEFAULT }),
  describe: (revealed, _q, t) => {
    if (!('format' in revealed)) return '';
    const f = revealed.format;
    return [
      f.bold && t('format.bold'),
      f.italic && t('format.italic'),
      f.underline && t('format.underline'),
      f.size !== 'normal' && t(`format.${f.size}`),
      f.align !== 'left' && t(`format.${f.align}`),
    ]
      .filter(Boolean)
      .join(' · ');
  },
};
