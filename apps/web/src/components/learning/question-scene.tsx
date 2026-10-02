'use client';

import { useTranslations } from 'next-intl';
import { SheetGrid } from './sheet-grid';

/**
 * Realistic "scenes" shown above a question from its PUBLIC data: an email, a web address,
 * a search box, an AI chat or a spreadsheet. They are pictures to look at, never real links.
 */
interface Mock {
  type: 'email' | 'url' | 'search' | 'chat';
  from?: string;
  subject?: string;
  body?: string;
  attachment?: string;
  url?: string;
  note?: string;
  query?: string;
  messages?: { from: 'you' | 'ai'; text: string }[];
}

export function QuestionScene({ data, kind }: { data: Record<string, unknown>; kind: string }) {
  const t = useTranslations('lesson');
  const mock = data.mock as Mock | undefined;
  const grid = data.grid as { rows: (string | number)[][] } | undefined;

  return (
    <>
      {mock?.type === 'email' && (
        <figure className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
          <div className="flex flex-col gap-1 border-b border-line bg-slate-50 px-4 py-3 text-sm">
            <p>
              <span className="font-bold text-muted">{t('mock.from')}: </span>
              <span className="break-all font-semibold">{mock.from}</span>
            </p>
            <p>
              <span className="font-bold text-muted">{t('mock.subject')}: </span>
              <span className="font-semibold">{mock.subject}</span>
            </p>
          </div>
          <p className="px-4 py-3 whitespace-pre-line">{mock.body}</p>
          {mock.attachment && (
            <p className="mx-4 mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-slate-50 px-3 py-1 text-sm font-semibold">
              <span aria-hidden="true">📎</span>
              <span className="sr-only">{t('mock.attachment')}: </span>
              {mock.attachment}
            </p>
          )}
        </figure>
      )}

      {mock?.type === 'url' && (
        <figure className="flex flex-col gap-1">
          <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 shadow-card">
            <span aria-hidden="true">{mock.url?.startsWith('https://') ? '🔒' : '⚠️'}</span>
            <span className="min-w-0 break-all font-mono text-sm">{mock.url}</span>
          </div>
          {mock.note && <figcaption className="px-4 text-sm text-muted">{mock.note}</figcaption>}
        </figure>
      )}

      {mock?.type === 'search' && mock.query !== undefined && mock.query !== '' && (
        <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 shadow-card">
          <span aria-hidden="true">🔍</span>
          <span className="sr-only">{t('mock.search')}: </span>
          <span className="font-semibold">{mock.query}</span>
        </div>
      )}

      {mock?.type === 'chat' && (
        <ol className="flex flex-col gap-2 rounded-card border border-line bg-slate-50 p-3">
          {mock.messages?.map((m, i) => (
            <li
              key={i}
              className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                m.from === 'you'
                  ? 'self-end bg-brand-600 text-white'
                  : 'self-start border border-line bg-surface'
              }`}
            >
              <span className="block text-xs font-bold opacity-80">
                {m.from === 'you' ? t('mock.you') : `🤖 ${t('mock.ai')}`}
              </span>
              {m.text}
            </li>
          ))}
        </ol>
      )}

      {/* A cell-select question draws its own interactive sheet. */}
      {grid && kind !== 'cell_select' && <SheetGrid rows={grid.rows} label={t('cellHelp')} />}
    </>
  );
}
