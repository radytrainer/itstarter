import { getTranslations } from 'next-intl/server';
import type { CourseDetail, Dashboard } from '@itstarter/shared';
import { AppShell } from '@/components/app-shell';
import { StudentDashboard } from '@/components/dashboard/student-dashboard';
import { WorldCard } from '@/components/dashboard/world-card';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { apiGet } from '@/lib/server-api';
import { requireUser } from '@/lib/session';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const user = await requireUser();

  if (user.role === 'STUDENT') {
    const data = await apiGet<Dashboard>('/api/progress');
    return (
      <AppShell signedIn>
        <StudentDashboard data={data} />
      </AppShell>
    );
  }

  // Teachers and admins: a way into /admin, plus a preview of the course as students see it.
  const t = await getTranslations('staff');
  const ta = await getTranslations('admin');
  const { id } = await apiGet<{ id: string }>('/api/courses/default');
  const course = await apiGet<CourseDetail>(`/api/courses/${id}`);
  return (
    <AppShell signedIn>
      <h1 className="text-3xl font-extrabold">{t('title', { name: user.displayName })}</h1>
      <Card>
        <p className="text-lg">{t('body')}</p>
        <ButtonLink href="/admin" size="lg" className="mt-3">
          🛠️ {ta('title')} →
        </ButtonLink>
      </Card>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {course.worlds.map((world) => (
          <li key={world.id}>
            <WorldCard world={world} showProgress={false} />
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
