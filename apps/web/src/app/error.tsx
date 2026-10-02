'use client';

import { useTranslations } from 'next-intl';
import { Button, ButtonLink } from '@/components/ui/button';

// Friendly fallback for unexpected errors. Never shows technical details.
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations();
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-6xl" aria-hidden="true">
        🛠️
      </p>
      <h1 className="text-2xl font-extrabold">{t('errors.generic')}</h1>
      <div className="flex w-full flex-col gap-3">
        <Button onClick={reset} fullWidth>
          {t('lesson.tryAgain')}
        </Button>
        <ButtonLink href="/" variant="secondary" fullWidth>
          {t('nav.home')}
        </ButtonLink>
      </div>
    </main>
  );
}
