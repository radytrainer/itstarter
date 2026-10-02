'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  ACTIVITY_TYPES,
  LESSON_STEPS,
  type ContentStatus,
  type LessonStep,
  type LocalizedText,
} from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import { Button, ButtonLink } from '../ui/button';
import { Card } from '../ui/card';
import {
  ConfirmButton,
  ErrorBox,
  JsonInput,
  LocalizedInput,
  SelectInput,
  STATUS_OPTIONS,
  TextInput,
} from './fields';
import { emptyQuestion, QuestionEditor, type AdminQuestion } from './question-editor';
import { problemsOf, useAdminAction } from './use-admin-action';

interface AdminActivity {
  id: string;
  step: LessonStep;
  type: string;
  title: LocalizedText | null;
  config: Record<string, unknown>;
  isScored: boolean;
  passScore: number;
  xpReward: number;
  status: ContentStatus;
  updatedAt: string;
  questions: (AdminQuestion & { id: string; updatedAt: string })[];
}

export interface AdminLesson {
  id: string;
  worldId: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText | null;
  icon: string | null;
  estimatedMinutes: number;
  xpReward: number;
  status: ContentStatus;
  updatedAt: string;
  activities: AdminActivity[];
}

function LessonSettings({ lesson }: { lesson: AdminLesson }) {
  const t = useTranslations('admin.content');
  const tc = useTranslations('admin.common');
  const { run, busy, error } = useAdminAction();
  const [form, setForm] = useState({
    slug: lesson.slug,
    title: lesson.title,
    summary: lesson.summary,
    icon: lesson.icon ?? '',
    estimatedMinutes: String(lesson.estimatedMinutes),
    xpReward: String(lesson.xpReward),
    status: lesson.status,
  });
  const set = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  return (
    <Card className="flex flex-col gap-3">
      <h2 className="text-xl font-extrabold">{t('lessonSettings')}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextInput label={t('slug')} value={form.slug} onChange={(slug) => set({ slug })} />
        <SelectInput
          label={tc('status')}
          value={form.status}
          onChange={(status) => set({ status })}
          options={STATUS_OPTIONS.map((s) => ({ value: s, label: tc(s) }))}
        />
      </div>
      <LocalizedInput
        label={t('titleField')}
        value={form.title}
        onChange={(title) => set({ title: title ?? { en: '' } })}
      />
      <LocalizedInput
        label={t('summary')}
        value={form.summary}
        onChange={(summary) => set({ summary })}
        required={false}
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <TextInput
          label={t('icon')}
          value={form.icon}
          onChange={(icon) => set({ icon })}
          maxLength={16}
        />
        <TextInput
          label={t('minutes')}
          type="number"
          min={1}
          max={60}
          value={form.estimatedMinutes}
          onChange={(v) => set({ estimatedMinutes: v })}
        />
        <TextInput
          label={t('xpReward')}
          type="number"
          min={0}
          max={1000}
          value={form.xpReward}
          onChange={(v) => set({ xpReward: v })}
        />
      </div>
      {error && <ErrorBox message={error.message} problems={problemsOf(error)} />}
      <Button
        className="self-start"
        loading={busy}
        loadingText={tc('saving')}
        onClick={() =>
          run('PATCH', `/api/admin/lessons/${lesson.id}`, {
            ...form,
            icon: form.icon || null,
            estimatedMinutes: Number(form.estimatedMinutes),
            xpReward: Number(form.xpReward),
          })
        }
      >
        💾 {tc('save')}
      </Button>
    </Card>
  );
}

function ActivityCard({
  activity,
  index,
  ids,
  lessonId,
  open,
  onToggle,
}: {
  activity: AdminActivity;
  index: number;
  ids: string[];
  lessonId: string;
  open: boolean;
  onToggle: (open: boolean) => void;
}) {
  const t = useTranslations('admin.content');
  const tc = useTranslations('admin.common');
  const tl = useTranslations('lesson.steps');
  const locale = useLocale();
  const { run, busy, error } = useAdminAction();
  const [form, setForm] = useState({
    step: activity.step,
    type: activity.type,
    title: activity.title,
    isScored: activity.isScored,
    passScore: String(activity.passScore),
    xpReward: String(activity.xpReward),
    status: activity.status,
  });
  const [config, setConfig] = useState<Record<string, unknown> | null>(activity.config);
  const [adding, setAdding] = useState(false);
  const set = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  function move(delta: -1 | 1) {
    const next = [...ids];
    [next[index], next[index + delta]] = [next[index + delta]!, next[index]!];
    void run('POST', `/api/admin/lessons/${lessonId}/activities/reorder`, { ids: next });
  }

  return (
    <li>
      <details
        open={open}
        onToggle={(e) => onToggle(e.currentTarget.open)}
        className="group rounded-card border border-line bg-surface shadow-card"
      >
        <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-2">
          <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-extrabold uppercase text-brand-800">
            {tl(activity.step)}
          </span>
          <span className="min-w-0 flex-1 font-bold">
            {activity.title ? contentText(activity.title, locale) : activity.type}
            <span className="ml-2 text-sm font-normal text-muted">
              {activity.questions.length > 0 && `· ${activity.questions.length} ?`}
            </span>
          </span>
          {activity.status !== 'published' && (
            <span className="text-xs font-bold text-amber-800">{tc(activity.status)}</span>
          )}
          <span aria-hidden="true" className="transition-transform group-open:rotate-90">
            ▶
          </span>
        </summary>
        <div className="flex flex-col gap-3 border-t border-line p-4">
          <div className="flex gap-2">
            <Button variant="secondary" disabled={busy || index === 0} onClick={() => move(-1)}>
              ▲ {tc('moveUp')}
            </Button>
            <Button
              variant="secondary"
              disabled={busy || index === ids.length - 1}
              onClick={() => move(1)}
            >
              ▼ {tc('moveDown')}
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <SelectInput
              label={t('step')}
              value={form.step}
              onChange={(step) => set({ step })}
              options={LESSON_STEPS.map((s) => ({ value: s, label: tl(s) }))}
            />
            <SelectInput
              label={t('type')}
              value={form.type}
              onChange={(type) => set({ type })}
              options={ACTIVITY_TYPES.map((x) => ({ value: x, label: x }))}
            />
            <SelectInput
              label={tc('status')}
              value={form.status}
              onChange={(status) => set({ status })}
              options={STATUS_OPTIONS.map((s) => ({ value: s, label: tc(s) }))}
            />
          </div>
          <LocalizedInput
            label={t('titleField')}
            value={form.title}
            onChange={(title) => set({ title })}
            required={false}
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="flex min-h-11 items-center gap-2 font-semibold">
              <input
                type="checkbox"
                className="size-5"
                checked={form.isScored}
                onChange={(e) => set({ isScored: e.target.checked })}
              />
              {t('scored')}
            </label>
            <TextInput
              label={t('passScore')}
              type="number"
              min={0}
              max={100}
              value={form.passScore}
              onChange={(v) => set({ passScore: v })}
            />
            <TextInput
              label={t('xpReward')}
              type="number"
              min={0}
              max={1000}
              value={form.xpReward}
              onChange={(v) => set({ xpReward: v })}
            />
          </div>
          <JsonInput label={t('config')} value={activity.config} onChange={setConfig} />
          {error && <ErrorBox message={error.message} problems={problemsOf(error)} />}
          <div className="flex flex-wrap gap-2">
            <Button
              loading={busy}
              loadingText={tc('saving')}
              disabled={!config}
              onClick={() =>
                run('PATCH', `/api/admin/activities/${activity.id}`, {
                  ...form,
                  config,
                  passScore: Number(form.passScore),
                  xpReward: Number(form.xpReward),
                })
              }
            >
              💾 {tc('save')}
            </Button>
            <ConfirmButton
              label={tc('delete')}
              busy={busy}
              onConfirm={() => run('DELETE', `/api/admin/activities/${activity.id}`)}
            />
          </div>

          {(activity.isScored || activity.questions.length > 0) && (
            <section className="flex flex-col gap-3">
              <h3 className="font-extrabold">{t('questions')}</h3>
              {activity.questions.map((question) => (
                <QuestionEditor
                  key={`${question.id}-${question.updatedAt}`}
                  activityId={activity.id}
                  question={question}
                />
              ))}
              {adding ? (
                <QuestionEditor
                  activityId={activity.id}
                  question={emptyQuestion()}
                  onDone={() => setAdding(false)}
                />
              ) : (
                <Button variant="secondary" className="self-start" onClick={() => setAdding(true)}>
                  ➕ {t('addQuestion')}
                </Button>
              )}
            </section>
          )}
        </div>
      </details>
    </li>
  );
}

function AddActivity({ lessonId }: { lessonId: string }) {
  const t = useTranslations('admin.content');
  const tl = useTranslations('lesson.steps');
  const { run, busy, error } = useAdminAction();
  const [step, setStep] = useState<LessonStep>('play');
  const [type, setType] = useState<string>('multiple_choice');
  return (
    <Card className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <SelectInput
          label={t('step')}
          value={step}
          onChange={setStep}
          options={LESSON_STEPS.map((s) => ({ value: s, label: tl(s) }))}
        />
        <SelectInput
          label={t('type')}
          value={type}
          onChange={setType}
          options={ACTIVITY_TYPES.map((x) => ({ value: x, label: x }))}
        />
        <Button
          loading={busy}
          onClick={() =>
            run('POST', `/api/admin/lessons/${lessonId}/activities`, {
              step,
              type,
              isScored: step === 'play' || step === 'challenge',
              xpReward: step === 'challenge' ? 15 : 10,
            })
          }
        >
          ➕ {t('addActivity')}
        </Button>
      </div>
      {error && <ErrorBox message={error.message} problems={problemsOf(error)} />}
    </Card>
  );
}

/** After a save the page re-renders with fresh data: only the changed part re-mounts (keys use
 * updated_at), and open activities stay open. */
export function LessonEditor({ lesson }: { lesson: AdminLesson }) {
  const t = useTranslations('admin.content');
  const ids = lesson.activities.map((a) => a.id);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const toggle = (id: string, isOpen: boolean) =>
    setOpenIds((current) => {
      const next = new Set(current);
      if (isOpen) next.add(id);
      else next.delete(id);
      return next;
    });
  return (
    <div className="flex flex-col gap-5">
      <ButtonLink
        href={`/lessons/${lesson.id}`}
        variant="secondary"
        className="self-start"
        target="_blank"
      >
        👀 {t('previewLesson')}
      </ButtonLink>
      <LessonSettings key={lesson.updatedAt} lesson={lesson} />
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-extrabold">{t('activities')}</h2>
        <ol className="flex flex-col gap-3">
          {lesson.activities.map((activity, index) => (
            <ActivityCard
              key={[
                activity.id,
                activity.updatedAt,
                index,
                ...activity.questions.map((q) => q.updatedAt),
              ].join('|')}
              activity={activity}
              index={index}
              ids={ids}
              lessonId={lesson.id}
              open={openIds.has(activity.id)}
              onToggle={(isOpen) => toggle(activity.id, isOpen)}
            />
          ))}
        </ol>
        <AddActivity lessonId={lesson.id} />
      </section>
    </div>
  );
}
