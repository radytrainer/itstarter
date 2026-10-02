import { redirect } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import type { StudentPerformance } from '@itstarter/shared';
import { AppShell } from '@/components/app-shell';
import { PerformanceReport } from '@/components/performance/performance-report';
import { apiGet } from '@/lib/server-api';
import { requireUser } from '@/lib/session';

export const dynamic = 'force-dynamic';

/** "My progress": the student's learning habit, strengths and progress, in friendly words. */
export default async function MyProgressPage() {
  const user = await requireUser();
  if (user.role !== 'STUDENT') redirect('/admin/progress');
  const [performance, t, locale] = await Promise.all([
    apiGet<StudentPerformance>('/api/progress/performance'),
    getTranslations('performance'),
    getLocale(),
  ]);
  return (
    <AppShell signedIn>
      <div>
        <h1 className="text-3xl font-extrabold">{t('title')}</h1>
        <p className="text-lg text-muted">{t('intro')}</p>
      </div>
      <PerformanceReport performance={performance} audience="student" locale={locale} />
    </AppShell>
  );
}
