'use client';

import { useCallback, useEffect, useRef } from 'react';
import { learningApi } from './learning-api';

/** No touch, key or scroll for this long = the student stepped away; the clock pauses. */
export const IDLE_AFTER_MS = 2 * 60 * 1000;
/** Report time about once a minute (the server also caps each report at 10 minutes). */
export const REPORT_EVERY_SECONDS = 60;
const MAX_REPORT_SECONDS = 600;

/**
 * Counts ACTIVE learning time in a lesson: only while the page is visible and the student has
 * touched, typed or scrolled in the last 2 minutes. Reports it every minute and when the student
 * leaves (tab hidden, page closed), so time counts even if the lesson is never finished.
 * `take()` returns the seconds not yet reported (sent with "lesson complete").
 */
export function useActiveTime(lessonId: string, enabled: boolean) {
  const pending = useRef(0);
  const lastInput = useRef(0);

  const flush = useCallback(() => {
    const seconds = Math.min(Math.floor(pending.current), MAX_REPORT_SECONDS);
    if (!enabled || seconds < 1) return;
    pending.current -= seconds;
    void learningApi.reportTime(lessonId, seconds);
  }, [enabled, lessonId]);

  useEffect(() => {
    if (!enabled) return;
    lastInput.current = Date.now();
    const onInput = () => {
      lastInput.current = Date.now();
    };
    const onHide = () => {
      if (document.visibilityState === 'hidden') flush();
    };
    const tick = setInterval(() => {
      const visible = document.visibilityState === 'visible';
      if (visible && Date.now() - lastInput.current < IDLE_AFTER_MS) pending.current += 1;
      if (pending.current >= REPORT_EVERY_SECONDS) flush();
    }, 1000);

    const inputs = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const;
    for (const name of inputs) window.addEventListener(name, onInput, { passive: true });
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', flush);
    return () => {
      clearInterval(tick);
      for (const name of inputs) window.removeEventListener(name, onInput);
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', flush);
      flush(); // leaving the lesson (Exit, next lesson…)
    };
  }, [enabled, flush]);

  /** Seconds not reported yet; they are now the caller's to send. */
  const take = useCallback(() => {
    const seconds = Math.floor(pending.current);
    pending.current -= seconds;
    return seconds;
  }, []);

  return { take };
}
