/**
 * Choosing a clear English voice for 🔊 Listen. Phones list many voices; the first English one is
 * often a robotic "compact"/eSpeak voice, so we score them and take the clearest.
 */

interface VoiceLike {
  name: string;
  lang: string;
  localService: boolean;
  default?: boolean;
}

// Natural/neural voices sound like a person; these names are the clear ones on common phones and
// computers (Android Google voices, iPhone Samantha/Enhanced, Windows/Edge "Natural" voices).
const CLEAR =
  /natural|neural|enhanced|premium|google|samantha|aria|jenny|guy|libby|sonia|daniel|karen|moira|serena/i;
const ROBOTIC =
  /espeak|compact|robot|novelty|whisper|bad news|bells|boing|bubbles|cellos|zarvox|trinoids/i;

/** Higher is clearer. Returns -1 for voices that are not English. */
export function voiceScore(voice: VoiceLike, lang = 'en-US'): number {
  const vl = voice.lang.replace('_', '-').toLowerCase();
  if (!vl.startsWith('en')) return -1;
  let score = 0;
  if (vl === lang.toLowerCase()) score += 30;
  else if (vl === 'en-us' || vl === 'en-gb')
    score += 20; // the accents beginners hear most
  else score += 5;
  if (CLEAR.test(voice.name)) score += 40;
  if (ROBOTIC.test(voice.name)) score -= 60;
  if (!voice.localService) score += 10; // online voices are usually the higher-quality ones
  if (voice.default) score += 2;
  return score;
}

export function bestVoice<T extends VoiceLike>(voices: T[], lang = 'en-US'): T | undefined {
  let best: T | undefined;
  let bestScore = -1;
  for (const v of voices) {
    const s = voiceScore(v, lang);
    if (s > bestScore) [best, bestScore] = [v, s];
  }
  return best;
}

/** Slow mode reads a sentence word by word (short groups), with a small pause between them. */
export function slowChunks(text: string): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 2) return [text.trim()];
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += 2) chunks.push(words.slice(i, i + 2).join(' '));
  return chunks;
}

/** Voices load a moment after the page on Chrome/Android: wait for them (max ~1 s). */
export function loadVoices(synth: SpeechSynthesis): Promise<SpeechSynthesisVoice[]> {
  const now = synth.getVoices();
  if (now.length > 0) return Promise.resolve(now);
  return new Promise((resolve) => {
    const done = () => {
      synth.removeEventListener('voiceschanged', done);
      clearTimeout(timer);
      resolve(synth.getVoices());
    };
    const timer = setTimeout(done, 1000);
    synth.addEventListener('voiceschanged', done);
  });
}
