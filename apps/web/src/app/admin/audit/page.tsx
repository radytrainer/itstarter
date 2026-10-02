import { getLocale, getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { apiGetPage } from '@/lib/server-api';
import { requireAdmin } from '@/lib/session';

interface AuditEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  actorUsername: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export default async function AuditPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await requireAdmin();
  const t = await getTranslations('admin');
  const locale = await getLocale();
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const { data, meta } = await apiGetPage<AuditEntry[]>(
    `/api/admin/audit-logs?page=${page}&pageSize=30`,
  );
  const pages = Math.max(1, Math.ceil(meta.total / meta.pageSize));
  const when = new Intl.DateTimeFormat(locale === 'km' ? 'km-KH' : 'en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <>
      <h1 className="text-3xl font-extrabold">{t('audit.title')}</h1>
      <Card padded={false}>
        <ul className="divide-y divide-line">
          {data.length === 0 && <li className="p-4 text-muted">{t('common.empty')}</li>}
          {data.map((entry) => (
            <li key={entry.id} className="flex flex-col gap-1 px-4 py-3">
              <span className="flex flex-wrap justify-between gap-2">
                <span className="font-mono text-sm font-bold">{entry.action}</span>
                <span className="text-sm text-muted">{when.format(new Date(entry.createdAt))}</span>
              </span>
              <span className="text-sm text-muted">
                {t('audit.who')}: {entry.actorUsername ?? '—'} · {entry.entityType}
                {Object.keys(entry.metadata).length > 0 && (
                  <span className="font-mono break-all"> · {JSON.stringify(entry.metadata)}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </Card>
      {pages > 1 && (
        <nav className="flex items-center justify-between gap-2">
          {page > 1 ? (
            <ButtonLink href={`/admin/audit?page=${page - 1}`} variant="secondary">
              ← {t('common.previous')}
            </ButtonLink>
          ) : (
            <span />
          )}
          <span className="text-sm text-muted">{t('common.pageOf', { page, pages })}</span>
          {page < pages ? (
            <ButtonLink href={`/admin/audit?page=${page + 1}`} variant="secondary">
              {t('common.next')} →
            </ButtonLink>
          ) : (
            <span />
          )}
        </nav>
      )}
    </>
  );
}
