'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { feedbackMode, type AnswerResult, type PlayActivity } from '@itstarter/shared';
import { contentText } from '@/i18n/content';
import { pickPhrase, useErrorMessage } from '@/lib/messages';
import { Button } from '../ui/button';
import { ActionBar, BarMessage, type BarTone } from './action-bar';
import { learningApi } from './learning-api';
import { QuestionScene } from './question-scene';
import { SpeakButton } from './speak-button';
import { LETTERS } from './questions/option';
import { QUESTION_KINDS } from './questions/registry';
import type { Review } from './questions/types';

interface Props {
  activity: PlayActivity;
  locale: string;
  /** Staff preview: no answers are sent, "Next" just moves on. */
  preview: boolean;
  /** Questions already done earlier (resuming a lesson). */
  solvedQuestionIds: Set<string>;
  onDone: () => void;
  onXp: (xp: number) => void;
}

type Phase = 'answering' | 'checking' | 'correct' | 'retry' | 'revealed';

/**
 * Runs the questions of a scored activity: answer → Check → feedback → next question.
 * Layout: one question card, and an action bar (message + main button) that stays at the bottom
 * of the screen on phones. "retry" activities let the student try again; "reveal" activities show
 * the right answer and the explanation after the first Check, then move on.
 * Keyboard: 1–9 or A–I choose an option, Enter checks / continues.
 */
export function QuestionActivity({
  activity,
  locale,
  preview,
  solvedQuestionIds,
  onDone,
  onXp,
}: Props) {
  const t = useTranslations('lesson');
  const tf = useTranslations('feedback');
  const errorMessage = useErrorMessage();
  const revealAtOnce = feedbackMode(activity.config) === 'reveal';

  const questions = useMemo(() => {
    const open = activity.questions.filter((q) => !solvedQuestionIds.has(q.id));
    return open.length > 0 ? open : activity.questions; // replaying a finished activity
  }, [activity.questions, solvedQuestionIds]);

  const [index, setIndex] = useState(0);
  const question = questions[index]!;
  const kind = QUESTION_KINDS[question.kind];
  const [value, setValue] = useState<unknown>(() => kind?.initial(question));
  const [phase, setPhase] = useState<Phase>('answering');
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  /** Bumped on every new try of a game, so it starts fresh. */
  const [tryKey, setTryKey] = useState(0);
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const finished = phase === 'correct' || (revealAtOnce && phase === 'revealed');
  const locked = phase === 'checking' || finished;
  const ready = preview || (kind?.isReady(value, question) ?? false);
  // Games end by themselves (and submit): no Check button while they are being played.
  const playingGame = Boolean(kind?.selfSubmit) && !preview && !finished && phase !== 'revealed';
  const review: Review | null = finished
    ? { correct: phase === 'correct', revealed: result?.revealed ?? null }
    : null;

  function goToQuestion(next: number) {
    const q = questions[next]!;
    setIndex(next);
    setValue(QUESTION_KINDS[q.kind]?.initial(q));
    setPhase('answering');
    setResult(null);
    setShowHint(false);
    setError(null);
    startedAt.current = Date.now();
  }

  function next() {
    if (index + 1 < questions.length) goToQuestion(index + 1);
    else onDone();
  }

  async function check(answerValue: unknown = value) {
    if (!kind) return;
    if (preview) return next();
    setPhase('checking');
    setError(null);
    const res = await learningApi.answer(
      activity.id,
      question.id,
      kind.toAnswer(answerValue, question),
      Date.now() - startedAt.current,
    );
    if (!res.success) {
      setError(errorMessage(res.error));
      setPhase('answering');
      return;
    }
    setAttempts((n) => n + 1);
    setResult(res.data);
    if (res.data.xpAwarded > 0) onXp(res.data.xpAwarded);
    if (res.data.correct) {
      setPhase('correct');
    } else if (res.data.revealed) {
      // Retry mode: put the answer in so they can check it themselves. Reveal mode: keep their
      // own answer on screen next to the right one.
      if (!revealAtOnce) setValue(kind.fromRevealed(res.data.revealed, question));
      setPhase('revealed');
    } else {
      setPhase('retry');
      setShowHint(true);
      if (kind.selfSubmit) {
        setTryKey((k) => k + 1);
        if (kind.restartOnRetry) setValue(kind.initial(question));
      }
    }
  }

  // Keyboard shortcuts (computers): choose with 1–9 / A–I, Enter = the main button.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
      const target = event.target as HTMLElement;
      const typing =
        target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
      if (event.key === 'Enter') {
        // A focused button or link handles Enter itself (except option buttons: Enter = Check).
        const nativeButton =
          (target.tagName === 'BUTTON' && target.getAttribute('role') !== 'radio') ||
          target.tagName === 'A';
        if (nativeButton) return;
        if (finished) {
          event.preventDefault();
          next();
        } else if (phase !== 'checking' && ready && !playingGame) {
          event.preventDefault();
          void check();
        }
        return;
      }
      if (typing || locked || !kind?.shortcut || event.key.length !== 1) return;
      const key = event.key.toUpperCase();
      const choice = /^[1-9]$/.test(key) ? Number(key) - 1 : LETTERS.indexOf(key);
      if (choice < 0) return;
      const picked = kind.shortcut(choice, question);
      if (picked !== null) setValue(picked);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!kind) {
    return (
      <ActionBar tone="learn">
        <BarMessage tone="learn" icon="i" title={t('unsupported')} />
        <Button onClick={next}>{t('skip')}</Button>
      </ActionBar>
    );
  }

  const Input = kind.Input;
  const hint = question.hint ? contentText(question.hint, locale) : null;
  const explanation = result?.explanation ? contentText(result.explanation, locale) : null;
  const optionCount =
    question.kind === 'single_choice' ? question.options.length : kind.shortcut ? 2 : 0;
  const tone: BarTone = error
    ? 'warning'
    : phase === 'correct'
      ? 'success'
      : phase === 'revealed'
        ? 'learn'
        : phase === 'retry'
          ? 'retry'
          : 'neutral';

  return (
    <div className="flex flex-1 flex-col gap-4">
      <article className="flex flex-col gap-5 rounded-card border border-line bg-surface p-5 shadow-card sm:p-7">
        {questions.length > 1 && (
          <div className="flex items-center gap-3">
            <p className="shrink-0 text-sm font-bold text-muted">
              {t('questionOf', { current: index + 1, total: questions.length })}
            </p>
            <div
              role="progressbar"
              aria-label={t('questionProgress')}
              aria-valuemin={0}
              aria-valuemax={questions.length}
              aria-valuenow={index + (finished ? 1 : 0)}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100"
            >
              <div
                className="h-full rounded-full bg-brand-500 transition-[width] duration-500"
                style={{ width: `${((index + (finished ? 1 : 0)) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        <h2 className="text-xl font-bold leading-snug text-ink sm:text-2xl">
          {contentText(question.prompt, locale)}
        </h2>

        {typeof question.data.speak === 'string' && <SpeakButton text={question.data.speak} />}

        <QuestionScene data={question.data} kind={question.kind} />

        <Input
          key={`${question.id}:${tryKey}`}
          question={question}
          value={value}
          onChange={(v: unknown) => {
            setValue(v);
            if (phase === 'retry') setPhase('answering');
          }}
          disabled={locked}
          locale={locale}
          review={review}
          submit={(final: unknown) => {
            setValue(final);
            void check(final);
          }}
        />

        {showHint && hint && phase === 'answering' && (
          <p className="flex gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-950 animate-rise">
            <span aria-hidden="true">💡</span>
            <span>
              <strong>{t('hint')}:</strong> {hint}
            </span>
          </p>
        )}

        {optionCount > 0 && !locked && !preview && (
          <p className="hidden text-xs text-muted [@media(pointer:fine)]:block">
            {t('keyboardTip', { keys: `1–${optionCount}` })}
          </p>
        )}
      </article>

      {/* Feedback is always encouraging: "Good try!", never "wrong". */}
      <ActionBar tone={tone}>
        <div aria-live="polite" className="flex min-w-0 flex-1">
          {error ? (
            <BarMessage tone="warning" icon="!" title={error} role="alert" />
          ) : phase === 'correct' ? (
            <BarMessage
              tone="success"
              icon="✓"
              title={pickPhrase(tf.raw('correct') as string[], attempts + index)}
            >
              {explanation && <p>{explanation}</p>}
            </BarMessage>
          ) : phase === 'revealed' && result?.revealed ? (
            <BarMessage
              tone="learn"
              icon="💡"
              title={t('answerWas', {
                answer: kind.describe(result.revealed, question, t, locale),
              })}
            >
              {revealAtOnce && <p>{pickPhrase(tf.raw('learned') as string[], attempts + index)}</p>}
              {explanation && <p>{explanation}</p>}
            </BarMessage>
          ) : phase === 'retry' ? (
            <BarMessage
              tone="retry"
              icon="↻"
              title={pickPhrase(tf.raw('tryAgain') as string[], attempts + index)}
            >
              {result?.partial && (
                <p>
                  {t('partial', { correct: result.partial.correct, total: result.partial.total })}
                </p>
              )}
              {hint && (
                <p>
                  <strong>{t('hint')}:</strong> {hint}
                </p>
              )}
            </BarMessage>
          ) : playingGame && phase !== 'checking' ? (
            <BarMessage tone="learn" icon="🎮" title={t('games.playAbove')} />
          ) : null}
        </div>

        <div className="flex gap-2 sm:shrink-0">
          {hint && phase === 'answering' && !showHint && !preview && (
            <Button variant="ghost" onClick={() => setShowHint(true)} className="shrink-0">
              💡 {t('showHint')}
            </Button>
          )}
          {finished ? (
            <Button
              size="lg"
              variant={phase === 'correct' ? 'success' : 'primary'}
              onClick={next}
              className="flex-1 sm:min-w-44 sm:flex-none"
              autoFocus
            >
              {t('next')} →
            </Button>
          ) : playingGame ? null : (
            <Button
              size="lg"
              onClick={() => void check()}
              disabled={!ready}
              loading={phase === 'checking'}
              loadingText={t('check')}
              className="flex-1 sm:min-w-44 sm:flex-none"
            >
              {preview ? `${t('next')} →` : phase === 'retry' ? t('tryAgain') : t('check')}
            </Button>
          )}
        </div>
      </ActionBar>
    </div>
  );
}
