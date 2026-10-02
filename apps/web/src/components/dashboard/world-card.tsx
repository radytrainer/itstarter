import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import type { WorldSummary } from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import { worldStyle } from '@/lib/worlds';
import { ProgressBar } from '../ui/progress-bar';

export async function WorldCard({
  world,
  showProgress = true,
}: {
  world: WorldSummary;
  showProgress?: boolean;
}) {
  const t = await getTranslations('dashboard');
  const locale = await getLocale();
  const style = worldStyle(world.color);
  const title = contentText(world.title, locale);

  return (
    <Link
      href={`/worlds/${world.id}`}
      className={`group flex h-full flex-col gap-3 rounded-card border p-4 shadow-card transition-transform hover:-translate-y-0.5 ${style.card}`}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-3xl ${style.icon}`}
        >
          {world.icon}
        </span>
        <div className="min-w-0">
          <h3 className={`text-lg font-extrabold leading-tight ${style.text}`}>{title}</h3>
          {world.description && (
            <p className="text-sm text-muted">{contentText(world.description, locale)}</p>
          )}
        </div>
      </div>
      {world.lessonsTotal === 0 ? (
        <p className="text-sm font-semibold text-muted">{t('comingSoon')}</p>
      ) : (
        showProgress && (
          <div className="mt-auto flex flex-col gap-1.5">
            <ProgressBar value={world.percent} label={title} barClassName={style.bar} size="sm" />
            <p className="text-sm font-semibold text-muted">
              {t('lessonsCount', { done: world.lessonsCompleted, total: world.lessonsTotal })}
            </p>
          </div>
        )
      )}
    </Link>
  );
}
