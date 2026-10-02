import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { AppShell } from '@/components/app-shell';
import { ChangePasswordForm } from '@/components/change-password-form';
import { Card } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/session';

export const dynamic = 'force-dynamic';

export default async function ChangePasswordPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  const t = await getTranslations('auth.changePassword');

  return (
    // A user who must change their password gets no navigation: this is the only thing to do.
    <AppShell signedIn={!user.mustChangePassword}>
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 pt-4">
        <header className="flex flex-col items-center gap-2 text-center">
          <p className="text-6xl" aria-hidden="true">
            🔑
          </p>
          <h1 className="text-3xl font-extrabold">{t('title')}</h1>
          <p className="text-lg text-muted">
            {user.mustChangePassword ? t('forced') : t('normal')}
          </p>
        </header>
        <Card>
          <ChangePasswordForm username={user.username} />
        </Card>
      </div>
    </AppShell>
  );
}
