import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { NewStudentForm } from '@/components/admin/new-student-form';
import { apiGet } from '@/lib/server-api';
import { requireAdmin } from '@/lib/session';

export default async function NewStudentPage() {
  await requireAdmin();
  const t = await getTranslations('admin');
  const cohorts = await apiGet<{ id: string; name: string }[]>('/api/teacher/cohorts');
  return (
    <>
      <Link href="/admin/students" className="w-fit font-bold text-brand-700">
        ← {t('students.title')}
      </Link>
      <h1 className="text-3xl font-extrabold">{t('students.add')}</h1>
      <NewStudentForm cohorts={cohorts} />
    </>
  );
}
