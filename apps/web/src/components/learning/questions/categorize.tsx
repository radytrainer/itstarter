'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { PlayOption } from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import { useDrag } from '../use-drag';
import type { QuestionInputProps, QuestionKindDef } from './types';

type Placements = Record<string, string>; // itemId → bucketId

function ItemChip({
  item,
  locale,
  selected,
  disabled,
  onTap,
  onDrop,
}: {
  item: PlayOption;
  locale: string;
  selected: boolean;
  disabled: boolean;
  onTap: () => void;
  onDrop: (bucketId: string | null) => void;
}) {
  const drag = useDrag(onDrop);
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={() => {
        if (!drag.wasDragged()) onTap();
      }}
      {...(disabled ? {} : drag.handlers)}
      style={drag.style}
      className={`min-h-12 rounded-control border-2 px-3 py-2 text-left font-semibold shadow-sm ${
        selected ? 'border-brand-600 bg-brand-100 ring-2 ring-brand-300' : 'border-line bg-surface'
      } ${drag.dragging ? 'cursor-grabbing shadow-lg' : 'cursor-grab'}`}
    >
      {contentText(item.label, locale)}
    </button>
  );
}

/**
 * Sort items into groups (files into folders, safe vs unsafe…). Drag an item onto a group,
 * or tap an item then tap a group. Tap a sorted item to take it back out.
 */
function CategorizeInput({
  question,
  value,
  onChange,
  disabled,
  locale,
}: QuestionInputProps<Placements>) {
  const t = useTranslations('lesson');
  const [selected, setSelected] = useState<string | null>(null);
  const buckets = question.options.filter((o) => o.groupKey === 'bucket');
  const items = question.options.filter((o) => o.groupKey === 'item');
  const unsorted = items.filter((i) => !value[i.id]);

  function place(itemId: string, bucketId: string | null) {
    if (!bucketId) return;
    onChange({ ...value, [itemId]: bucketId });
    setSelected(null);
  }

  function remove(itemId: string) {
    const next = { ...value };
    delete next[itemId];
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted">{t('categorizeHelp')}</p>

      <section
        aria-label={t('toSort')}
        className="flex min-h-16 flex-wrap gap-2 rounded-card border-2 border-dashed border-line bg-slate-50 p-3"
      >
        {unsorted.length === 0 ? (
          <p className="self-center text-sm font-semibold text-emerald-700">{t('allSorted')}</p>
        ) : (
          unsorted.map((item) => (
            <ItemChip
              key={item.id}
              item={item}
              locale={locale}
              selected={selected === item.id}
              disabled={disabled}
              onTap={() => setSelected(selected === item.id ? null : item.id)}
              onDrop={(bucketId) => place(item.id, bucketId)}
            />
          ))
        )}
      </section>

      {/* Groups stay side by side, even on a 320px phone, so every drop target is on screen. */}
      <div
        className={`grid gap-2 sm:gap-3 ${buckets.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}
      >
        {buckets.map((bucket) => {
          const label = contentText(bucket.label, locale);
          const inside = items.filter((i) => value[i.id] === bucket.id);
          return (
            <div
              key={bucket.id}
              data-drop={bucket.id}
              className={`flex min-h-28 min-w-0 flex-col gap-1.5 rounded-card border-2 p-2 transition-colors sm:p-3 ${
                selected ? 'border-brand-400 bg-brand-50' : 'border-line bg-surface'
              }`}
            >
              <button
                type="button"
                disabled={disabled || !selected}
                onClick={() => selected && place(selected, bucket.id)}
                className="flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg text-center text-sm font-extrabold break-words disabled:cursor-default sm:flex-row sm:gap-2 sm:text-left sm:text-base"
              >
                {bucket.media?.type === 'emoji' && (
                  <span aria-hidden="true" className="text-2xl">
                    {bucket.media.src}
                  </span>
                )}
                {label}
              </button>
              <ul className="flex flex-col gap-1.5">
                {inside.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => remove(item.id)}
                      aria-label={t('takeOut', {
                        item: contentText(item.label, locale),
                        group: label,
                      })}
                      className="w-full rounded-lg bg-slate-100 px-2 py-1.5 text-left text-xs font-semibold break-all sm:text-sm"
                    >
                      {contentText(item.label, locale)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const categorize: QuestionKindDef<Placements> = {
  Input: CategorizeInput,
  initial: () => ({}),
  isReady: (value, question) =>
    question.options.filter((o) => o.groupKey === 'item').every((i) => value[i.id]),
  toAnswer: (value) => ({
    placements: Object.entries(value).map(([item, bucket]) => ({ item, bucket })),
  }),
  fromRevealed: (revealed) =>
    'placements' in revealed
      ? Object.fromEntries(revealed.placements.map((p) => [p.item, p.bucket]))
      : {},
  describe: (revealed, question, _t, locale) => {
    if (!('placements' in revealed)) return '';
    const label = (id: string) =>
      contentText(question.options.find((o) => o.id === id)?.label, locale);
    return revealed.placements.map((p) => `${label(p.item)} → ${label(p.bucket)}`).join(' · ');
  },
};
