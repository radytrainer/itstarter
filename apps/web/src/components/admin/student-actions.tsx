'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { Role } from '@itstarter/shared';
import { Button } from '../ui/button';
import { ConfirmButton, ErrorBox, SelectInput, TemporaryPassword } from './fields';
import { useAdminAction } from './use-admin-action';

interface Props {
  role: Role;
  student: { id: string; username: string; status: 'active' | 'disabled'; cohortId: string | null };
  cohorts: { id: string; name: string }[];
}

/** Teachers can reset passwords; admins can also change the class, pause and delete. */
export function StudentActions({ role, student, cohorts }: Props) {
  const t = useTranslations('admin');
  const router = useRouter();
  const { run, busy, error } = useAdminAction();
  const [password, setPassword] = useState<string | null>(null);
  const [cohortId, setCohortId] = useState(student.cohortId ?? '');
  const isAdmin = role === 'ADMIN';

  return (
    <div className="flex flex-col gap-3">
      {password && <TemporaryPassword username={student.username} password={password} />}
      {error && <ErrorBox message={error.message} />}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          loading={busy}
          onClick={async () => {
            const res = await run<{ temporaryPassword: string }>(
              'POST',
              `/api/teacher/students/${student.id}/reset-password`,
            );
            if (res) setPassword(res.temporaryPassword);
          }}
        >
          🔑 {t('students.resetPassword')}
        </Button>
        {isAdmin && (
          <Button
            variant="secondary"
            loading={busy}
            onClick={() =>
              run('PATCH', `/api/admin/students/${student.id}`, {
                status: student.status === 'active' ? 'disabled' : 'active',
              })
            }
          >
            {student.status === 'active'
              ? `⏸️ ${t('students.pause')}`
              : `▶️ ${t('students.resume')}`}
          </Button>
        )}
        {isAdmin && (
          <ConfirmButton
            label={t('students.deleteStudent')}
            busy={busy}
            onConfirm={async () => {
              if (await run('DELETE', `/api/admin/students/${student.id}`, undefined, false))
                router.replace('/admin/students');
            }}
          />
        )}
      </div>
      {isAdmin && (
        <div className="flex flex-wrap items-end gap-2">
          <div className="min-w-56">
            <SelectInput
              label={t('students.changeClass')}
              value={cohortId}
              onChange={setCohortId}
              options={[
                { value: '', label: t('students.noClass') },
                ...cohorts.map((c) => ({ value: c.id, label: c.name })),
              ]}
            />
          </div>
          <Button
            variant="secondary"
            disabled={cohortId === (student.cohortId ?? '')}
            loading={busy}
            onClick={() =>
              run('PATCH', `/api/admin/students/${student.id}`, { cohortId: cohortId || null })
            }
          >
            {t('common.save')}
          </Button>
        </div>
      )}
    </div>
  );
}
