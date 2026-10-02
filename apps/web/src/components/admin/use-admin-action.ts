'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ApiErrorBody } from '@itstarter/shared';
import { apiRequest } from '@/lib/api-client';
import { useErrorMessage } from '@/lib/messages';

type Method = 'POST' | 'PATCH' | 'PUT' | 'DELETE';

/**
 * Runs one admin change against the API, tracks busy/error state, and refreshes the
 * server-rendered page afterwards so lists show the new data.
 */
export function useAdminAction() {
  const router = useRouter();
  const errorMessage = useErrorMessage();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<{ message: string; body: ApiErrorBody } | null>(null);

  async function run<T>(
    method: Method,
    path: string,
    body?: unknown,
    refresh = true,
  ): Promise<T | null> {
    setBusy(true);
    setError(null);
    const res = await apiRequest<T>(method, path, body);
    setBusy(false);
    if (!res.success) {
      // Validation problems carry details; show the API's message for those, friendly text otherwise.
      const message =
        res.error.code === 'VALIDATION_ERROR' || res.error.code === 'CONFLICT'
          ? res.error.message
          : errorMessage(res.error);
      setError({ message, body: res.error });
      return null;
    }
    if (refresh) router.refresh();
    return res.data;
  }

  return { run, busy, error, clearError: () => setError(null) };
}

/** Problems listed by the API (question validation, CSV import, field errors). */
export function problemsOf(error: { body: ApiErrorBody } | null): string[] {
  const details = error?.body.details as
    { problems?: string[] } | { path: string; message: string }[] | undefined;
  if (!details) return [];
  if (Array.isArray(details)) return details.map((d) => `${d.path}: ${d.message}`);
  return details.problems ?? [];
}
