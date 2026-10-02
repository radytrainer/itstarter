'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ErrorBox, SelectInput, TemporaryPassword, TextInput } from './fields';
import { problemsOf, useAdminAction } from './use-admin-action';

export function AddStaffForm({ cohorts }: { cohorts: { id: string; name: string }[] }) {
  const t = useTranslations('admin');
  const tr = useTranslations('roles');
  const { run, busy, error } = useAdminAction();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<'TEACHER' | 'ADMIN'>('TEACHER');
  const [cohortIds, setCohortIds] = useState<string[]>([]);
  const [created, setCreated] = useState<{ username: string; temporaryPassword: string } | null>(
    null,
  );

  async function submit(event: FormEvent) {
    event.preventDefault();
    const result = await run<{ username: string; temporaryPassword: string }>(
      'POST',
      '/api/admin/staff',
      {
        username,
        displayName,
        role,
        cohortIds,
      },
    );
    if (result) {
      setCreated(result);
      setUsername('');
      setDisplayName('');
      setCohortIds([]);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {created && (
        <TemporaryPassword username={created.username} password={created.temporaryPassword} />
      )}
      <Card>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <h3 className="font-extrabold">{t('staff.addStaff')}</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <TextInput
              label={t('students.username')}
              value={username}
              onChange={setUsername}
              required
            />
            <TextInput
              label={t('students.displayName')}
              value={displayName}
              onChange={setDisplayName}
              required
            />
            <SelectInput
              label={t('staff.role')}
              value={role}
              onChange={setRole}
              options={[
                { value: 'TEACHER', label: tr('TEACHER') },
                { value: 'ADMIN', label: tr('ADMIN') },
              ]}
            />
          </div>
          <fieldset className="flex flex-wrap gap-3">
            <legend className="mb-1 text-sm font-bold">{t('staff.classes')}</legend>
            {cohorts.map((c) => (
              <label key={c.id} className="flex min-h-11 items-center gap-2">
                <input
                  type="checkbox"
                  className="size-5"
                  checked={cohortIds.includes(c.id)}
                  onChange={(e) =>
                    setCohortIds((ids) =>
                      e.target.checked ? [...ids, c.id] : ids.filter((x) => x !== c.id),
                    )
                  }
                />
                {c.name}
              </label>
            ))}
          </fieldset>
          {error && <ErrorBox message={error.message} problems={problemsOf(error)} />}
          <Button
            type="submit"
            className="self-start"
            loading={busy}
            disabled={!username || !displayName}
          >
            ➕ {t('staff.addStaff')}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export function AddClassForm() {
  const t = useTranslations('admin.staff');
  const { run, busy, error } = useAdminAction();
  const [name, setName] = useState('');
  const [year, setYear] = useState('2028');
  return (
    <Card>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (await run('POST', '/api/admin/cohorts', { name, year: Number(year) })) setName('');
        }}
        className="grid gap-3 sm:grid-cols-[2fr_1fr_auto] sm:items-end"
      >
        <TextInput
          label={t('className')}
          value={name}
          onChange={setName}
          required
          maxLength={100}
        />
        <TextInput
          label={t('year')}
          type="number"
          min={2000}
          max={2100}
          value={year}
          onChange={setYear}
        />
        <Button type="submit" loading={busy} disabled={!name}>
          ➕ {t('addClass')}
        </Button>
        {error && <ErrorBox message={error.message} problems={problemsOf(error)} />}
      </form>
    </Card>
  );
}
