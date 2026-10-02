import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ImportStudents } from '@/components/admin/import-students';
import { requireAdmin } from '@/lib/session';

export default async function ImportPage() {
  await requireAdmin();
  const t = await getTranslations('admin');
  return (
    <>
      <Link href="/admin/students" className="w-fit font-bold text-brand-700 print:hidden">
        ← {t('students.title')}
      </Link>
      <h1 className="text-3xl font-extrabold">{t('import.title')}</h1>
      <ImportStudents />
    </>
  );
}
