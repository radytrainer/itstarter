'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { parseCsv, type ImportRowResult } from '@itstarter/shared';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Feedback } from '../ui/feedback';
import { ErrorBox } from './fields';
import { useAdminAction } from './use-admin-action';

/** Byte-order mark: makes Excel open the file as UTF-8 (Khmer names stay readable). */
const BOM = String.fromCharCode(0xfeff);
const EXAMPLE =
  'username,display name,class\nsokha.chan,Sokha Chan,Generation 2028 – Class A\ndara.kim,Dara Kim,';

/** Turns the results into a CSV the teacher can keep (or print) to hand out passwords. */
function passwordsCsv(rows: ImportRowResult[]) {
  const quote = (v: string) => `"${v.replaceAll('"', '""')}"`;
  return [
    'username,display name,temporary password',
    ...rows.map((r) => [r.username, r.displayName, r.temporaryPassword ?? ''].map(quote).join(',')),
  ].join('\n');
}

export function ImportStudents() {
  const t = useTranslations('admin.import');
  const { run, busy, error } = useAdminAction();
  const [csv, setCsv] = useState('');
  const [result, setResult] = useState<{
    created: number;
    rows: ImportRowResult[];
    dryRun: boolean;
  } | null>(null);

  const lineCount = Math.max(0, parseCsv(csv).length - (/^\s*username/i.test(csv) ? 1 : 0));
  const hasProblems = result?.rows.some((r) => r.problems.length > 0) ?? false;
  const checkedOk = result?.dryRun && !hasProblems;
  const finished = result && !result.dryRun && result.created > 0;

  async function send(dryRun: boolean) {
    const data = await run<{ created: number; rows: ImportRowResult[] }>(
      'POST',
      '/api/admin/students/import',
      { csv, dryRun },
      !dryRun,
    );
    if (data) setResult({ ...data, dryRun });
  }

  function download() {
    const blob = new Blob([BOM + passwordsCsv(result!.rows)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student-passwords.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  if (finished) {
    return (
      <div className="flex flex-col gap-4">
        <Feedback tone="success" title={t('done', { count: result.created })}>
          {t('passwordsOnce')}
        </Feedback>
        <div className="flex flex-wrap gap-2 print:hidden">
          <Button onClick={download}>⬇️ {t('download')}</Button>
          <Button variant="secondary" onClick={() => window.print()}>
            🖨️ {t('print')}
          </Button>
        </div>
        <Card padded={false}>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm">
              <tr>
                <th className="px-3 py-2">@</th>
                <th className="px-3 py-2">{t('password')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {result.rows.map((r) => (
                <tr key={r.username}>
                  <td className="px-3 py-2">
                    <span className="font-bold">{r.username}</span>
                    <span className="block text-sm text-muted">{r.displayName}</span>
                  </td>
                  <td className="px-3 py-2 font-mono text-lg font-bold">{r.temporaryPassword}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-col gap-3">
        <p>{t('help')}</p>
        <pre className="overflow-x-auto rounded-control bg-slate-900 p-3 text-sm text-white">
          {EXAMPLE}
        </pre>
        <label className="flex flex-col gap-1 font-bold">
          {t('file')}
          <input
            type="file"
            accept=".csv,text/csv"
            className="font-normal"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                setCsv(await file.text());
                setResult(null);
              }
            }}
          />
        </label>
        <label className="flex flex-col gap-1 font-bold">
          {t('paste')}
          <textarea
            value={csv}
            rows={8}
            spellCheck={false}
            onChange={(e) => {
              setCsv(e.target.value);
              setResult(null);
            }}
            className="rounded-control border border-line p-3 font-mono text-sm font-normal"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() => send(true)}
            loading={busy && !checkedOk}
            disabled={!csv.trim()}
          >
            🔎 {t('check')}
          </Button>
          <Button onClick={() => send(false)} loading={busy && !!checkedOk} disabled={!checkedOk}>
            📥 {t('import', { count: lineCount })}
          </Button>
        </div>
      </Card>

      {error && <ErrorBox message={error.message} />}
      {result && hasProblems && <Feedback tone="warning" role="alert" title={t('fixFirst')} />}
      {checkedOk && <Feedback tone="success" title={t('ready')} />}

      {result && (
        <Card padded={false}>
          <ul className="divide-y divide-line">
            {result.rows.map((r) => (
              <li
                key={r.line}
                className="flex flex-wrap items-start justify-between gap-2 px-4 py-2"
              >
                <span>
                  <span className="text-sm text-muted">
                    {t('line')} {r.line} ·{' '}
                  </span>
                  <span className="font-bold">{r.username || '—'}</span> {r.displayName}{' '}
                  {r.cohort && <span className="text-muted">({r.cohort})</span>}
                </span>
                {r.problems.length > 0 ? (
                  <span className="text-sm font-semibold text-amber-800">
                    ⚠️ {r.problems.join(' · ')}
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-emerald-700">✓ {t('ok')}</span>
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
