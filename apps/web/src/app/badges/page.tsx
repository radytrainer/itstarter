import { getLocale, getTranslations } from 'next-intl/server';
import type { AwardView } from '@itstarter/shared';
import { AppShell } from '@/components/app-shell';
import { BadgeIcon } from '@/components/ui/badge-icon';
import { Card } from '@/components/ui/card';
import { contentText } from '@/i18n/content';
import { apiGet } from '@/lib/server-api';
import { requireUser } from '@/lib/session';

export const dynamic = 'force-dynamic';

async function AwardGrid({ items }: { items: AwardView[] }) {
  const t = await getTranslations('badges');
  const locale = await getLocale();
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.code}>
          <Card className={`flex h-full items-center gap-4 ${item.earned ? '' : 'bg-slate-50'}`}>
            <BadgeIcon
              icon={item.icon}
              name={contentText(item.name, locale)}
              earned={item.earned}
              lockedLabel={t('locked')}
              size="lg"
            />
            <div className="min-w-0">
              <h3 className="text-lg font-extrabold leading-tight">
                {contentText(item.name, locale)}
              </h3>
              <p className="text-sm text-muted">{contentText(item.description, locale)}</p>
              <p
                className={`mt-1 text-sm font-bold ${item.earned ? 'text-emerald-700' : 'text-slate-500'}`}
              >
                {item.earned ? `✓ ${t('earned')}` : t('locked')}
              </p>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default async function BadgesPage() {
  await requireUser();
  const [badges, achievements] = await Promise.all([
    apiGet<AwardView[]>('/api/badges'),
    apiGet<AwardView[]>('/api/achievements'),
  ]);
  const t = await getTranslations('badges');
  const earned = badges.filter((b) => b.earned).length;

  return (
    <AppShell signedIn>
      <div>
        <h1 className="text-3xl font-extrabold">{t('title')}</h1>
        <p className="text-lg text-muted">{t('count', { earned, total: badges.length })}</p>
      </div>
      <AwardGrid items={badges} />
      <h2 className="text-xl font-extrabold">{t('achievements')}</h2>
      <AwardGrid items={achievements} />
    </AppShell>
  );
}
