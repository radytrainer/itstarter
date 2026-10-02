'use client';

import { useSyncExternalStore } from 'react';

/** Chrome/Edge/Samsung Internet event that lets us show our own "Install app" button. */
interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export interface InstallState {
  /** Opened from the home screen (installed). */
  standalone: boolean;
  /** iPhone/iPad Safari: no install event — we show "Share → Add to Home Screen" instead. */
  ios: boolean;
  /** The browser offered installation and we can ask now. */
  canPrompt: boolean;
}

let deferred: InstallPromptEvent | null = null;
let installedNow = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

const SERVER_STATE: InstallState = { standalone: false, ios: false, canPrompt: false };
let snapshot: InstallState = SERVER_STATE;

function compute(): InstallState {
  const standalone =
    installedNow ||
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  const ua = navigator.userAgent;
  // iPadOS reports itself as a Mac; touch points tell them apart.
  const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const next = { standalone, ios: ios && !standalone, canPrompt: deferred !== null && !standalone };
  const same =
    next.standalone === snapshot.standalone &&
    next.ios === snapshot.ios &&
    next.canPrompt === snapshot.canPrompt;
  if (!same) snapshot = next;
  return snapshot;
}

let started = false;

/**
 * Registers the service worker and starts listening for the install event. Called once, as early
 * as possible (root layout), because Chrome may fire the event before any install button exists.
 */
export function startPwa() {
  if (started || typeof window === 'undefined') return;
  started = true;
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault(); // we show our own friendly button instead of the browser's banner
    deferred = event as InstallPromptEvent;
    notify();
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    installedNow = true;
    notify();
  });
  // Only in production builds: in `npm run dev` cached files would hide code changes.
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
      // No service worker (old browser, private mode…): the app still works, just not offline.
    });
  }
}

/** Shows the browser's install dialog. Returns true if the student installed the app. */
export async function promptInstall(): Promise<boolean> {
  if (!deferred) return false;
  const event = deferred;
  deferred = null;
  await event.prompt();
  const { outcome } = await event.userChoice;
  if (outcome === 'accepted') installedNow = true;
  notify();
  return outcome === 'accepted';
}

export function useInstallState(): InstallState {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    compute,
    () => SERVER_STATE,
  );
}
