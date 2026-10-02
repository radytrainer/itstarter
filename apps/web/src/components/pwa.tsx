'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { promptInstall, startPwa, useInstallState } from '@/lib/pwa';
import { Button } from './ui/button';
import { Card } from './ui/card';

/** Mounted once in the root layout: registers the service worker and catches the install event. */
export function PwaSetup() {
  useEffect(() => startPwa(), []);
  return null;
}

const DISMISSED_KEY = 'its-install-dismissed';

function wasDismissed(): boolean {
  try {
    return typeof window !== 'undefined' && localStorage.getItem(DISMISSED_KEY) === '1';
  } catch {
    return false; // storage blocked (private mode): just show the card
  }
}

/**
 * Invites the student to install the app.
 * - Chrome/Edge/Samsung (Android, desktop): our button opens the browser's install dialog.
 * - iPhone/iPad: Safari has no install dialog, so we show the two taps to do it.
 * - Already installed, or a browser that can't install: nothing (or a short note on the profile).
 * "card" (dashboard) can be dismissed; "panel" (profile) always shows.
 */
export function InstallApp({ variant }: { variant: 'card' | 'panel' }) {
  const t = useTranslations('install');
  const state = useInstallState();
  const [dismissed, setDismissed] = useState(() => variant === 'card' && wasDismissed());

  if (state.standalone) {
    return variant === 'panel' ? (
      <Card className="text-center text-sm font-semibold text-emerald-800">
        ✅ {t('installed')}
      </Card>
    ) : null;
  }
  if (!state.canPrompt && !state.ios) return null;
  if (variant === 'card' && dismissed) return null;

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISSED_KEY, '1');
    } catch {
      // Not saved; it will show again next time.
    }
  }

  return (
    <Card as="section" aria-labelledby="install-title" className="flex items-start gap-3">
      <Image
        src="/icons/icon-192.png"
        alt=""
        width={48}
        height={48}
        className="size-12 rounded-xl"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h2 id="install-title" className="font-extrabold">
          {t('title')}
        </h2>
        <p className="text-sm text-muted">{t('body')}</p>
        {state.ios ? (
          <p className="text-sm font-semibold">{t('iosSteps', { share: '⬆️', add: '➕' })}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => void promptInstall()}>📲 {t('button')}</Button>
            {variant === 'card' && (
              <Button variant="ghost" onClick={dismiss}>
                {t('dismiss')}
              </Button>
            )}
          </div>
        )}
        {state.ios && variant === 'card' && (
          <Button variant="ghost" className="self-start" onClick={dismiss}>
            {t('dismiss')}
          </Button>
        )}
      </div>
    </Card>
  );
}
