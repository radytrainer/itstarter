'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { AwardCriteria, ContentStatus, LocalizedText } from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import { Button } from '../ui/button';
import { BadgeIcon } from '../ui/badge-icon';
import {
  ErrorBox,
  JsonInput,
  LocalizedInput,
  SelectInput,
  STATUS_OPTIONS,
  TextInput,
} from './fields';
import { problemsOf, useAdminAction } from './use-admin-action';

export interface AdminBadge {
  id: string;
  code: string;
  name: LocalizedText;
  description: LocalizedText;
  icon: string;
  criteria: AwardCriteria;
  status: ContentStatus;
  updatedAt: string;
}

/** Badge name, picture and rule. The rule is checked by the API (e.g. world_completed + worldSlug). */
export function BadgeEditor({ badge }: { badge: AdminBadge }) {
  const t = useTranslations('admin.badges');
  const tc = useTranslations('admin.common');
  const locale = useLocale();
  const { run, busy, error } = useAdminAction();
  const [form, setForm] = useState({
    name: badge.name,
    description: badge.description,
    icon: badge.icon,
    status: badge.status,
  });
  const [criteria, setCriteria] = useState<Record<string, unknown> | null>(badge.criteria);
  const set = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  return (
    <details className="rounded-card border border-line bg-surface shadow-card">
      <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 px-4 py-2">
        <BadgeIcon
          icon={badge.icon}
          name={contentText(badge.name, locale)}
          earned={badge.status === 'published'}
          lockedLabel={tc(badge.status)}
        />
        <span className="flex flex-col">
          <span className="font-bold">{contentText(badge.name, locale)}</span>
          <span className="font-mono text-xs text-muted">
            {badge.code} · {badge.criteria.type}
          </span>
        </span>
      </summary>
      <div className="flex flex-col gap-3 border-t border-line p-4">
        <LocalizedInput
          label={t('name')}
          value={form.name}
          onChange={(name) => set({ name: name ?? { en: '' } })}
        />
        <LocalizedInput
          label={t('description')}
          value={form.description}
          onChange={(d) => set({ description: d ?? { en: '' } })}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <TextInput
            label={t('icon')}
            value={form.icon}
            onChange={(icon) => set({ icon })}
            maxLength={16}
          />
          <SelectInput
            label={tc('status')}
            value={form.status}
            onChange={(status) => set({ status })}
            options={STATUS_OPTIONS.map((s) => ({ value: s, label: tc(s) }))}
          />
        </div>
        <JsonInput
          label={t('criteria')}
          value={badge.criteria}
          onChange={setCriteria}
          hint='{"type":"world_completed","worldSlug":"brain-playground"} · {"type":"activity_type_completed","activityType":"mouse_trainer","count":3}'
        />
        {error && <ErrorBox message={error.message} problems={problemsOf(error)} />}
        <Button
          className="self-start"
          loading={busy}
          disabled={!criteria}
          onClick={() => run('PATCH', `/api/admin/badges/${badge.id}`, { ...form, criteria })}
        >
          💾 {tc('save')}
        </Button>
      </div>
    </details>
  );
}
