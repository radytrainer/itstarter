'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { LOCALES, type Locale } from '@itstarter/shared';
import { apiRequest } from '@/lib/api-client';
import { rememberLocale } from '@/i18n/locale';

/**
 * EN | ខ្មែរ toggle. Always remembered in a cookie; for signed-in users also saved to their
 * profile so it follows them to another phone.
 */
export function LanguageSwitcher({ signedIn }: { signedIn: boolean }) {
  const t = useTranslations('language');
  const current = useLocale();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function choose(locale: Locale) {
    if (locale === current) return;
    rememberLocale(locale);
    startTransition(async () => {
      if (signedIn) await apiRequest('PATCH', '/api/me', { locale });
      router.refresh();
    });
  }

  return (
    <div
      role="group"
      aria-label={t('label')}
      className="inline-flex rounded-full border border-line bg-surface p-1"
      aria-busy={pending || undefined}
    >
      {LOCALES.map((locale) => (
        <button
          key={locale}
          type="button"
          lang={locale}
          onClick={() => choose(locale)}
          aria-pressed={locale === current}
          className={`min-h-10 min-w-12 rounded-full px-3 text-sm font-bold transition-colors ${
            locale === current ? 'bg-brand-600 text-white' : 'text-muted hover:bg-slate-100'
          }`}
        >
          {t(locale)}
        </button>
      ))}
    </div>
  );
}
