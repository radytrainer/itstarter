import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = { title: 'Offline · IT Starter 2028' };

/**
 * Shown by the service worker when a page can't load without the Internet. It is saved on the
 * phone in advance, so it must work for anyone: no login, no API, both languages at once
 * (we can't know the reader's language setting while offline).
 */
export default async function OfflinePage() {
  const [en, km] = await Promise.all([
    getTranslations({ locale: 'en', namespace: 'offline' }),
    getTranslations({ locale: 'km', namespace: 'offline' }),
  ]);
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-6 px-4 py-10 text-center">
      <span aria-hidden="true" className="text-7xl">
        📶
      </span>
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold">{en('title')}</h1>
        <p className="text-muted">{en('body')}</p>
      </section>
      <section lang="km" className="flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold">{km('title')}</h2>
        <p className="text-muted">{km('body')}</p>
      </section>
      {/* A plain link on purpose: a full reload (not client navigation) brings the app back once
          the Internet returns, and it works without JavaScript. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        href="/"
        className="flex min-h-12 flex-wrap items-center justify-center gap-x-2 rounded-control bg-brand-600 px-6 font-bold text-white"
      >
        🔄 {en('retry')} · <span lang="km">{km('retry')}</span>
      </a>
    </main>
  );
}
