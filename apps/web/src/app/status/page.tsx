import { getTranslations } from 'next-intl/server';
import { AppShell } from '@/components/app-shell';
import { StatusList } from '@/components/status-list';
import { apiInternalUrl } from '@/lib/server-config';
import { getSystemStatus } from '@/lib/system-status';

// Public system check: proves Next.js → API → PostgreSQL/Redis works.
export const dynamic = 'force-dynamic';

export default async function StatusPage() {
  const status = await getSystemStatus(apiInternalUrl);
  const t = await getTranslations('status');

  return (
    <AppShell signedIn={false}>
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <h1 className="text-3xl font-extrabold">{t('title')}</h1>
        <StatusList status={status} />
      </div>
    </AppShell>
  );
}
