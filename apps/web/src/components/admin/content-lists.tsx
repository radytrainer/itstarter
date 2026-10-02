'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { ContentStatus, LocalizedText } from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ErrorBox, LocalizedInput, STATUS_OPTIONS, TextInput } from './fields';
import { problemsOf, useAdminAction } from './use-admin-action';

export interface ListItem {
  id: string;
  slug: string;
  title: LocalizedText;
  icon: string | null;
  status: ContentStatus;
  /** "3 lessons", "6 activities"… */
  count: string;
  href: string;
}

/**
 * A list of worlds or lessons with ▲▼ reordering and a status switch.
 * Reordering sends the full new order (the API checks every item is there exactly once).
 */
export function ReorderableList({
  items,
  reorderPath,
  patchBase,
}: {
  items: ListItem[];
  reorderPath: string;
  /** e.g. "/api/admin/worlds/" — the item id is appended. (A plain string: server pages can't pass functions.) */
  patchBase: string;
}) {
  const t = useTranslations('admin.common');
  const locale = useLocale();
  const { run, busy, error } = useAdminAction();

  function move(index: number, delta: -1 | 1) {
    const ids = items.map((i) => i.id);
    const target = index + delta;
    [ids[index], ids[target]] = [ids[target]!, ids[index]!];
    void run('POST', reorderPath, { ids });
  }

  return (
    <>
      {error && <ErrorBox message={error.message} />}
      <Card padded={false}>
        <ol className="divide-y divide-line">
          {items.length === 0 && <li className="p-4 text-muted">{t('empty')}</li>}
          {items.map((item, index) => {
            const title = contentText(item.title, locale);
            return (
              <li key={item.id} className="flex flex-wrap items-center gap-2 px-3 py-2">
                <span className="flex flex-col gap-1">
                  <button
                    type="button"
                    disabled={busy || index === 0}
                    onClick={() => move(index, -1)}
                    aria-label={`${t('moveUp')}: ${title}`}
                    className="flex size-9 items-center justify-center rounded-lg border border-line disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    disabled={busy || index === items.length - 1}
                    onClick={() => move(index, 1)}
                    aria-label={`${t('moveDown')}: ${title}`}
                    className="flex size-9 items-center justify-center rounded-lg border border-line disabled:opacity-30"
                  >
                    ▼
                  </button>
                </span>
                <Link
                  href={item.href}
                  className="flex min-w-0 flex-1 items-center gap-3 rounded-lg p-2 hover:bg-slate-50"
                >
                  <span aria-hidden="true" className="text-2xl">
                    {item.icon ?? '📄'}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="font-bold">{title}</span>
                    <span className="text-sm text-muted">
                      /{item.slug} · {item.count}
                    </span>
                  </span>
                </Link>
                <StatusSelect
                  key={item.status}
                  id={item.id}
                  initial={item.status}
                  url={`${patchBase}${item.id}`}
                />
              </li>
            );
          })}
        </ol>
      </Card>
    </>
  );
}

/**
 * Publish switch. Shows the new value straight away and goes back if saving fails
 * (a plain controlled <select> would snap back to the old value until the page refreshed).
 */
function StatusSelect({ id, initial, url }: { id: string; initial: ContentStatus; url: string }) {
  const t = useTranslations('admin.common');
  const { run, busy, error } = useAdminAction();
  const [value, setValue] = useState<ContentStatus>(initial);
  return (
    <span className="flex flex-col items-end gap-1">
      <label className="sr-only" htmlFor={`status-${id}`}>
        {t('status')}
      </label>
      <select
        id={`status-${id}`}
        value={value}
        disabled={busy}
        aria-busy={busy || undefined}
        onChange={async (e) => {
          const next = e.target.value as ContentStatus;
          setValue(next);
          if (!(await run('PATCH', url, { status: next }))) setValue(initial);
        }}
        className={`min-h-11 rounded-control border px-2 font-semibold ${
          value === 'published'
            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
            : 'border-line bg-slate-50'
        }`}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {t(s)}
          </option>
        ))}
      </select>
      {error && <span className="text-xs font-semibold text-amber-800">{error.message}</span>}
    </span>
  );
}

/** "Add world" / "Add lesson": slug + title, plus world icon/colour or lesson minutes. */
export function AddContentForm({ kind, path }: { kind: 'world' | 'lesson'; path: string }) {
  const t = useTranslations('admin.content');
  const tc = useTranslations('admin.common');
  const { run, busy, error } = useAdminAction();
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState<LocalizedText | null>(null);
  const [icon, setIcon] = useState(kind === 'world' ? '🌟' : '📘');
  const [color, setColor] = useState('violet');
  const [minutes, setMinutes] = useState('5');

  async function submit(event: FormEvent) {
    event.preventDefault();
    const body =
      kind === 'world'
        ? { slug, title, icon, color }
        : { slug, title, icon, estimatedMinutes: Number(minutes) };
    if (await run('POST', path, body)) {
      setOpen(false);
      setSlug('');
      setTitle(null);
    }
  }

  if (!open) {
    return (
      <Button variant="secondary" onClick={() => setOpen(true)} className="self-start">
        ➕ {kind === 'world' ? t('addWorld') : t('addLesson')}
      </Button>
    );
  }
  return (
    <Card>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <TextInput
          label={t('slug')}
          value={slug}
          onChange={setSlug}
          required
          placeholder={kind === 'world' ? 'my-world' : 'my-lesson'}
        />
        <LocalizedInput label={t('titleField')} value={title} onChange={setTitle} />
        <div className="grid gap-3 sm:grid-cols-2">
          <TextInput label={t('icon')} value={icon} onChange={setIcon} maxLength={16} />
          {kind === 'world' ? (
            <TextInput
              label={t('color')}
              value={color}
              onChange={setColor}
              placeholder="violet, sky, emerald, amber, rose"
            />
          ) : (
            <TextInput
              label={t('minutes')}
              type="number"
              min={1}
              max={60}
              value={minutes}
              onChange={setMinutes}
            />
          )}
        </div>
        {error && <ErrorBox message={error.message} problems={problemsOf(error)} />}
        <div className="flex gap-2">
          <Button type="submit" loading={busy} disabled={!slug || !title?.en}>
            {tc('save')}
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            {tc('cancel')}
          </Button>
        </div>
      </form>
    </Card>
  );
}
