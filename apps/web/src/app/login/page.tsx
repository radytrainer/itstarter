import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { AppShell } from '@/components/app-shell';
import { LoginForm } from '@/components/login-form';
import { Card } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/session';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect(user.mustChangePassword ? '/change-password' : '/');
  const t = await getTranslations('auth.login');
  const ta = await getTranslations('app');

  return (
    <AppShell signedIn={false}>
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 pt-4">
        <header className="flex flex-col items-center gap-2 text-center">
          <p className="text-6xl animate-pop" aria-hidden="true">
            🚀
          </p>
          <h1 className="text-3xl font-extrabold">{t('title')}</h1>
          <p className="text-lg text-muted">{t('subtitle')}</p>
        </header>
        <Card>
          <LoginForm />
        </Card>
        <p className="text-center text-sm text-muted">{t('forgot')}</p>
        <p className="text-center font-bold text-brand-700">{ta('tagline')}</p>
      </div>
    </AppShell>
  );
}
