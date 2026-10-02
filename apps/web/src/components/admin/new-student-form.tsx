'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ErrorBox, SelectInput, TemporaryPassword, TextInput } from './fields';
import { problemsOf, useAdminAction } from './use-admin-action';

export function NewStudentForm({ cohorts }: { cohorts: { id: string; name: string }[] }) {
  const t = useTranslations('admin');
  const { run, busy, error } = useAdminAction();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [cohortId, setCohortId] = useState(cohorts[0]?.id ?? '');
  const [created, setCreated] = useState<{ username: string; temporaryPassword: string } | null>(
    null,
  );

  async function submit(event: FormEvent) {
    event.preventDefault();
    const result = await run<{ username: string; temporaryPassword: string }>(
      'POST',
      '/api/admin/students',
      {
        username,
        displayName,
        cohortId: cohortId || null,
      },
    );
    if (result) {
      setCreated(result);
      setUsername('');
      setDisplayName('');
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {created && (
        <TemporaryPassword username={created.username} password={created.temporaryPassword} />
      )}
      <Card>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <TextInput
            label={t('students.username')}
            value={username}
            onChange={setUsername}
            required
            maxLength={50}
            placeholder="sokha.chan"
          />
          <TextInput
            label={t('students.displayName')}
            value={displayName}
            onChange={setDisplayName}
            required
            maxLength={80}
            placeholder="Sokha Chan"
          />
          <SelectInput
            label={t('students.class')}
            value={cohortId}
            onChange={setCohortId}
            options={[
              { value: '', label: t('students.noClass') },
              ...cohorts.map((c) => ({ value: c.id, label: c.name })),
            ]}
          />
          {error && <ErrorBox message={error.message} problems={problemsOf(error)} />}
          <Button
            type="submit"
            loading={busy}
            loadingText={t('common.saving')}
            disabled={!username || !displayName}
            className="sm:self-start"
          >
            ➕ {t('students.add')}
          </Button>
        </form>
      </Card>
    </div>
  );
}
