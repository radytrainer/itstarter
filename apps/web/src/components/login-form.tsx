'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import type { AuthUser } from '@itstarter/shared';
import { apiRequest } from '@/lib/api-client';
import { useErrorMessage } from '@/lib/messages';
import { Button } from './ui/button';
import { Feedback } from './ui/feedback';
import { PasswordField, TextField } from './ui/text-field';

export function LoginForm() {
  const t = useTranslations('auth.login');
  const tc = useTranslations('common');
  const locale = useLocale();
  const errorMessage = useErrorMessage();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const res = await apiRequest<{ user: AuthUser }>('POST', '/api/auth/login', {
      username,
      password,
    });
    if (!res.success) {
      setError(errorMessage(res.error));
      setBusy(false);
      return;
    }
    // "What you see stays": keep the language the student chose on this screen.
    if (res.data.user.locale !== locale) {
      await apiRequest('PATCH', '/api/me', { locale });
    }
    router.replace(res.data.user.mustChangePassword ? '/change-password' : '/');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <TextField
        label={t('username')}
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        required
      />
      <PasswordField
        label={t('password')}
        showLabel={tc('show')}
        hideLabel={tc('hide')}
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
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
        disabled={!username || !password}
      >
        {t('submit')}
      </Button>
    </form>
  );
}
