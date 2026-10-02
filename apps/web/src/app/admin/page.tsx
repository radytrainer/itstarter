import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import type { CourseDetail } from '@itstarter/shared';
import { Card } from '@/components/ui/card';
import { apiGet, apiGetPage } from '@/lib/server-api';
import { requireStaff } from '@/lib/session';

interface AuditEntry {
  id: string;
  action: string;
  actorUsername: string | null;
  createdAt: string;
}

function Tile({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link href={href} className="block">
      <Card className="flex items-center gap-4 transition-transform hover:-translate-y-0.5">
        <span aria-hidden="true" className="text-4xl">
          {icon}
        </span>
        <span className="flex flex-col">
          <span className="text-3xl font-extrabold tabular-nums">{value}</span>
          <span className="text-sm font-semibold text-muted">{label}</span>
        </span>
      </Card>
    </Link>
  );
}

export default async function AdminHome() {
  const user = await requireStaff();
  const t = await getTranslations('admin');
  const locale = await getLocale();
  const isAdmin = user.role === 'ADMIN';

  const [students, cohorts, defaultCourse] = await Promise.all([
    apiGetPage<unknown[]>('/api/teacher/students?pageSize=1'),
    apiGet<unknown[]>('/api/teacher/cohorts'),
    apiGet<{ id: string }>('/api/courses/default'),
  ]);
  const course = await apiGet<CourseDetail>(`/api/courses/${defaultCourse.id}`);
  const lessons = course.worlds.reduce((n, w) => n + w.lessonsTotal, 0);
  const recent = isAdmin ? await apiGet<AuditEntry[]>('/api/admin/audit-logs?pageSize=6') : [];
  const dateFormat = new Intl.DateTimeFormat(locale === 'km' ? 'km-KH' : 'en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <>
      <h1 className="text-3xl font-extrabold">
        {t('overview.welcome', { name: user.displayName })}
      </h1>
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          icon="🎓"
          label={t('overview.students')}
          value={students.meta.total}
          href="/admin/students"
        />
        <Tile
          icon="🏫"
          label={t('overview.classes')}
          value={cohorts.length}
          href={isAdmin ? '/admin/staff' : '/admin/students'}
        />
        <Tile
          icon="📚"
          label={t('overview.lessons')}
          value={lessons}
          href={isAdmin ? '/admin/content' : '/'}
        />
      </div>
      {isAdmin && (
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-extrabold">{t('overview.recent')}</h2>
          <Card padded={false}>
            <ul className="divide-y divide-line">
              {recent.length === 0 && <li className="p-4 text-muted">{t('common.empty')}</li>}
              {recent.map((entry) => (
                <li key={entry.id} className="flex flex-wrap justify-between gap-2 px-4 py-3">
                  <span className="font-mono text-sm font-bold">{entry.action}</span>
                  <span className="text-sm text-muted">
                    {entry.actorUsername ?? '—'} · {dateFormat.format(new Date(entry.createdAt))}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}
    </>
  );
}
