import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { RegistrationStatus } from '@itstarter/shared';
import { AppShell } from '@/components/app-shell';
import { RegisterForm } from '@/components/register-form';
import { Card } from '@/components/ui/card';
import { apiGet } from '@/lib/server-api';
import { getCurrentUser } from '@/lib/session';

export const dynamic = 'force-dynamic';

/** Students create their own account (when the school has sign-up open). */
export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) redirect('/');
  const [status, t] = await Promise.all([
    apiGet<RegistrationStatus>('/api/auth/registration'),
    getTranslations('auth.register'),
  ]);

  return (
    <AppShell signedIn={false}>
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 pt-4">
        <header className="flex flex-col items-center gap-2 text-center">
          <p className="text-6xl animate-pop" aria-hidden="true">
            🎒
          </p>
          <h1 className="text-3xl font-extrabold">{t('title')}</h1>
          <p className="text-lg text-muted">{t('subtitle')}</p>
        </header>
        <Card>
          {status.open ? (
            <RegisterForm />
          ) : (
            <div className="flex flex-col gap-4 text-center">
              <p>{t('closed')}</p>
              <Link href="/login" className="font-bold text-brand-700 underline underline-offset-4">
                {t('logIn')}
              </Link>
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
}
