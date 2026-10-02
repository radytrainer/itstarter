'use client';

import { useTranslations } from 'next-intl';
import { SheetGrid } from '../sheet-grid';
import type { QuestionInputProps, QuestionKindDef } from './types';

function CellSelectInput({
  question,
  value,
  onChange,
  disabled,
}: QuestionInputProps<string | null>) {
  const t = useTranslations('lesson');
  const rows = (question.data.grid as { rows: (string | number)[][] } | undefined)?.rows ?? [[]];
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted">{t('cellHelp')}</p>
      <SheetGrid
        rows={rows}
        selected={value}
        onSelect={onChange}
        disabled={disabled}
        label={t('cellHelp')}
      />
      <p aria-live="polite" className="font-mono text-lg font-bold">
        {value ? t('selectedCell', { cell: value }) : t('noCell')}
      </p>
    </div>
  );
}

export const cellSelect: QuestionKindDef<string | null> = {
  Input: CellSelectInput,
  initial: () => null,
  isReady: (value) => value !== null,
  toAnswer: (value) => ({ cell: value! }),
  fromRevealed: (revealed) => ('cell' in revealed ? revealed.cell : null),
  describe: (revealed) => ('cell' in revealed ? revealed.cell : ''),
};
