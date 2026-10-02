import { getTranslations } from 'next-intl/server';
import type { Role } from '@itstarter/shared';
import { AddClassForm, AddStaffForm } from '@/components/admin/staff-forms';
import { Card } from '@/components/ui/card';
import { apiGet } from '@/lib/server-api';
import { requireAdmin } from '@/lib/session';

interface StaffRow {
  id: string;
  username: string;
  displayName: string;
  role: Role;
  status: string;
  cohortCount: number;
}
interface CohortRow {
  id: string;
  name: string;
  year: number;
  students: number;
}

export default async function StaffPage() {
  await requireAdmin();
  const t = await getTranslations('admin.staff');
  const tr = await getTranslations('roles');
  const [staff, cohorts] = await Promise.all([
    apiGet<StaffRow[]>('/api/admin/staff'),
    apiGet<CohortRow[]>('/api/teacher/cohorts'),
  ]);

  return (
    <>
      <h1 className="text-3xl font-extrabold">{t('title')}</h1>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-extrabold">{t('classes')}</h2>
        <Card padded={false}>
          <ul className="divide-y divide-line">
            {cohorts.map((c) => (
              <li key={c.id} className="flex flex-wrap justify-between gap-2 px-4 py-3">
                <span className="font-bold">{c.name}</span>
                <span className="text-sm text-muted">
                  {c.year} · {t('studentsCount', { count: c.students })}
                </span>
              </li>
            ))}
          </ul>
        </Card>
        <AddClassForm />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-extrabold">{t('staff')}</h2>
        <Card padded={false}>
          <ul className="divide-y divide-line">
            {staff.map((s) => (
              <li key={s.id} className="flex flex-wrap justify-between gap-2 px-4 py-3">
                <span className="flex flex-col">
                  <span className="font-bold">{s.displayName}</span>
                  <span className="text-sm text-muted">@{s.username}</span>
                </span>
                <span className="text-sm font-semibold">
                  {tr(s.role)} · {t('classCount', { count: s.cohortCount })}
                </span>
              </li>
            ))}
          </ul>
        </Card>
        <AddStaffForm cohorts={cohorts} />
      </section>
    </>
  );
}
