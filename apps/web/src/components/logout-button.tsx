'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { apiRequest } from '@/lib/api-client';
import { Button } from './ui/button';

export function LogoutButton() {
  const t = useTranslations('common');
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await apiRequest('POST', '/api/auth/logout');
    router.replace('/login');
    router.refresh();
  }

  return (
    <Button
      variant="secondary"
      fullWidth
      onClick={logout}
      loading={busy}
      loadingText={t('loggingOut')}
    >
      <span aria-hidden="true">👋</span> {t('logOut')}
    </Button>
  );
}
