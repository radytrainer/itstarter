'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';

const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

/** Picks an English voice when the phone has one (some phones load voices a moment later). */
function englishVoice(lang: string): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === lang) ??
    voices.find((v) => v.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()))
  );
}

/**
 * 🔊 Reads a word or sentence aloud with the phone's own voice (Web Speech API): no download,
 * works offline on most phones. Hidden where the browser can't speak.
 */
export function SpeakButton({
  text,
  lang = 'en-US',
  size = 'md',
}: {
  text: string;
  lang?: string;
  size?: 'md' | 'sm';
}) {
  const t = useTranslations('lesson.games');
  const supported = useSyncExternalStore(
    () => () => {},
    canSpeak,
    () => false,
  );
  const [speaking, setSpeaking] = useState(false);
  useEffect(
    () => () => {
      if (canSpeak()) window.speechSynthesis.cancel();
    },
    [],
  );

  if (!supported) return null;

  function speak(slow: boolean) {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = slow ? 0.6 : 0.9;
    const voice = englishVoice(lang);
    if (voice) utterance.voice = voice;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synth.speak(utterance);
  }

  const box = size === 'sm' ? 'min-h-10 px-3 text-sm' : 'min-h-12 px-4 text-base';
  return (
    <span className="inline-flex shrink-0 gap-1.5">
      <button
        type="button"
        onClick={() => speak(false)}
        aria-label={t('listen')}
        className={`inline-flex items-center gap-1.5 rounded-full bg-sky-100 font-bold text-sky-900 transition-colors hover:bg-sky-200 ${box} ${
          speaking ? 'ring-2 ring-sky-400' : ''
        }`}
      >
        <span aria-hidden="true">🔊</span>
        <span>{t('listen')}</span>
      </button>
      <button
        type="button"
        onClick={() => speak(true)}
        aria-label={t('listenSlow')}
        title={t('listenSlow')}
        className={`inline-flex items-center rounded-full bg-sky-50 font-bold text-sky-900 transition-colors hover:bg-sky-100 ${box}`}
      >
        <span aria-hidden="true">🐢</span>
      </button>
    </span>
  );
}
