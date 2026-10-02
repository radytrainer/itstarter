'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { checkNewPassword, PASSWORD_MIN_LENGTH, type AuthUser } from '@itstarter/shared';
import { apiRequest } from '@/lib/api-client';
import { useErrorMessage } from '@/lib/messages';
import { Button } from './ui/button';
import { Feedback } from './ui/feedback';
import { PasswordField } from './ui/text-field';

export function ChangePasswordForm({ username }: { username: string }) {
  const t = useTranslations('auth.changePassword');
  const tc = useTranslations('common');
  const errorMessage = useErrorMessage();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const problems = newPassword ? checkNewPassword(newPassword, { username, currentPassword }) : [];
  const problemText = problems
    .map((p) => t(`problems.${p}`, { min: PASSWORD_MIN_LENGTH }))
    .join(' ');

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (problems.length > 0) return;
    setBusy(true);
    setError(null);
    const res = await apiRequest<{ user: AuthUser }>('POST', '/api/auth/change-password', {
      currentPassword,
      newPassword,
    });
    if (!res.success) {
      setError(errorMessage(res.error));
      setBusy(false);
      return;
    }
    router.replace('/');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <PasswordField
        label={t('current')}
        showLabel={tc('show')}
        hideLabel={tc('hide')}
        name="currentPassword"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        autoComplete="current-password"
        required
      />
      <PasswordField
        label={t('new')}
        showLabel={tc('show')}
        hideLabel={tc('hide')}
        name="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        autoComplete="new-password"
        hint={t('tip')}
        error={problemText || undefined}
        required
      />

      {error && (
        <Feedback tone="warning" role="alert">
          {error}
        </Feedback>
      )}

      <Button
        type="submit"
        size="lg"
        fullWidth
        loading={busy}
        loadingText={t('submitting')}
        disabled={!currentPassword || !newPassword || problems.length > 0}
      >
        {t('submit')}
      </Button>
    </form>
  );
}
