'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { bestVoice, loadVoices, slowChunks } from '@/lib/voices';

const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

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
  useEffect(() => {
    if (!canSpeak()) return;
    void loadVoices(window.speechSynthesis); // load the voice list early
    return () => window.speechSynthesis.cancel();
  }, []);

  if (!supported) return null;

  async function speak(slow: boolean) {
    const synth = window.speechSynthesis;
    synth.cancel();
    setSpeaking(true);
    // Always an English voice (a Khmer phone's default voice can't read English clearly).
    // iPhones only speak straight after the tap, so use the voices already loaded when we can.
    const ready = synth.getVoices();
    const voice = bestVoice(ready.length > 0 ? ready : await loadVoices(synth), lang);
    // Normal: a little slower than a native speaker. Slow: two words at a time, with pauses.
    const parts = slow ? slowChunks(text) : [text];
    parts.forEach((part, i) => {
      const utterance = new SpeechSynthesisUtterance(part);
      utterance.lang = voice?.lang ?? lang;
      if (voice) utterance.voice = voice;
      utterance.rate = slow ? 0.7 : 0.85;
      if (i === parts.length - 1) {
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => setSpeaking(false);
      }
      synth.speak(utterance);
    });
  }

  const box = size === 'sm' ? 'min-h-10 px-3 text-sm' : 'min-h-12 px-4 text-base';
  return (
    <span className="inline-flex shrink-0 gap-1.5">
      <button
        type="button"
        onClick={() => void speak(false)}
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
        onClick={() => void speak(true)}
        aria-label={t('listenSlow')}
        title={t('listenSlow')}
        className={`inline-flex items-center rounded-full bg-sky-50 font-bold text-sky-900 transition-colors hover:bg-sky-100 ${box}`}
      >
        <span aria-hidden="true">🐢</span>
      </button>
    </span>
  );
}
