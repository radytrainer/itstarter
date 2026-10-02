import { getLocale, getTranslations } from 'next-intl/server';
import type { Dashboard } from '@itstarter/shared';
import { AppShell } from '@/components/app-shell';
import { LanguageSwitcher } from '@/components/language-switcher';
import { LogoutButton } from '@/components/logout-button';
import { InstallApp } from '@/components/pwa';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { contentText } from '@/i18n/content';
import { apiGet } from '@/lib/server-api';
import { requireUser } from '@/lib/session';

export const dynamic = 'force-dynamic';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line py-3 last:border-0">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-bold">{children}</dd>
    </div>
  );
}

export default async function ProfilePage() {
  const user = await requireUser();
  const t = await getTranslations('profile');
  const tr = await getTranslations('roles');
  const tl = await getTranslations('language');
  const tc = await getTranslations('common');
  const locale = await getLocale();
  const dashboard = user.role === 'STUDENT' ? await apiGet<Dashboard>('/api/progress') : null;

  return (
    <AppShell signedIn>
      <div className="mx-auto flex w-full max-w-md flex-col gap-5">
        <div className="flex flex-col items-center gap-2 text-center">
          <span
            aria-hidden="true"
            className="flex size-20 items-center justify-center rounded-full bg-brand-100 text-4xl"
          >
            {dashboard?.student.level.icon ?? '🙂'}
          </span>
          <h1 className="text-3xl font-extrabold">{user.displayName}</h1>
        </div>

        <Card>
          <dl>
            <Row label={t('username')}>{user.username}</Row>
            <Row label={t('role')}>{tr(user.role)}</Row>
            {dashboard && (
              <>
                <Row label={t('level')}>
                  {dashboard.student.level.icon} {contentText(dashboard.student.level.name, locale)}
                </Row>
                <Row label="XP">{tc('xp', { xp: dashboard.student.xpTotal })}</Row>
              </>
            )}
          </dl>
        </Card>

        <Card className="flex items-center justify-between gap-3">
          <span className="font-bold">{tl('label')}</span>
          <LanguageSwitcher signedIn />
        </Card>

        <InstallApp variant="panel" />

        <ButtonLink href="/change-password" variant="secondary" fullWidth>
          🔑 {t('changePassword')}
        </ButtonLink>
        <LogoutButton />
      </div>
    </AppShell>
  );
}
