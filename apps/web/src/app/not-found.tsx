import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button';

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-6xl" aria-hidden="true">
        🧭
      </p>
      <h1 className="text-2xl font-extrabold">404</h1>
      <ButtonLink href="/" fullWidth>
        {t('nav.home')}
      </ButtonLink>
    </main>
  );
}
