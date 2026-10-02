'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  checkNewPassword,
  isReservedUsername,
  PASSWORD_MIN_LENGTH,
  USERNAME_PATTERN,
  type AuthUser,
} from '@itstarter/shared';
import { apiRequest } from '@/lib/api-client';
import { useErrorMessage } from '@/lib/messages';
import { Button } from './ui/button';
import { Feedback } from './ui/feedback';
import { PasswordField, TextField } from './ui/text-field';

/** Lowercase, no spaces: usernames are easy to type on a phone and to tell a teacher. */
const cleanUsername = (raw: string) => raw.toLowerCase().replace(/\s+/g, '');

/**
 * A student creates their own account and is signed in straight away. Rules are checked as they
 * type (same rules as the API), so mistakes are explained before they press the button.
 */
export function RegisterForm() {
  const t = useTranslations('auth.register');
  const tp = useTranslations('auth.changePassword');
  const tc = useTranslations('common');
  const locale = useLocale();
  const errorMessage = useErrorMessage();
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [website, setWebsite] = useState(''); // trap for bots: people never see it
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const usernameProblem =
    username && !USERNAME_PATTERN.test(username)
      ? t('usernameInvalid')
      : username && isReservedUsername(username)
        ? t('usernameReserved')
        : null;
  const passwordProblems = password ? checkNewPassword(password, { username }) : [];
  const passwordText = passwordProblems
    .map((p) => tp(`problems.${p}`, { min: PASSWORD_MIN_LENGTH }))
    .join(' ');
  const ready =
    displayName.trim() && username && password && !usernameProblem && !passwordProblems.length;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!ready) return;
    setBusy(true);
    setError(null);
    const res = await apiRequest<{ user: AuthUser }>('POST', '/api/auth/register', {
      displayName: displayName.trim(),
      username,
      password,
      locale,
      ...(website ? { website } : {}),
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
      <TextField
        label={t('name')}
        name="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        autoComplete="name"
        hint={t('nameHint')}
        maxLength={80}
        required
      />
      <TextField
        label={t('username')}
        name="username"
        value={username}
        onChange={(e) => setUsername(cleanUsername(e.target.value))}
        autoComplete="username"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        hint={t('usernameHint')}
        error={usernameProblem ?? undefined}
        maxLength={50}
        required
      />
      <PasswordField
        label={t('password')}
        showLabel={tc('show')}
        hideLabel={tc('hide')}
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        hint={tp('tip')}
        error={passwordText || undefined}
        required
      />
      {/* Bots fill in every field; people never see this one. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

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
        disabled={!ready}
      >
        {t('submit')}
      </Button>
      <p className="text-center text-sm">
        {t('haveAccount')}{' '}
        <Link href="/login" className="font-bold text-brand-700 underline underline-offset-4">
          {t('logIn')}
        </Link>
      </p>
    </form>
  );
}
