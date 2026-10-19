import { describe, expect, it } from 'vitest';
import { bestVoice, slowChunks, voiceScore } from '@/lib/voices';

const v = (name: string, lang: string, localService = true) => ({ name, lang, localService });

describe('choosing a clear English voice', () => {
  it('prefers natural/online English voices over robotic ones and other languages', () => {
    const voices = [
      v('Khmer', 'km-KH'),
      v('eSpeak English', 'en-US'),
      v('English (India)', 'en-IN'),
      v('Google US English', 'en-US', false),
      v('Microsoft David', 'en-US'),
    ];
    expect(bestVoice(voices)?.name).toBe('Google US English');
    expect(voiceScore(v('Khmer', 'km-KH'))).toBe(-1);
    expect(voiceScore(v('eSpeak English', 'en-US'))).toBeLessThan(
      voiceScore(v('Microsoft David', 'en-US')),
    );
  });

  it('takes iPhone and Windows natural voices, and accepts en_GB style tags', () => {
    expect(bestVoice([v('Fred', 'en-US'), v('Samantha', 'en-US')])?.name).toBe('Samantha');
    expect(
      bestVoice([
        v('Microsoft Zira', 'en-US'),
        v('Microsoft Aria Online (Natural)', 'en-US', false),
      ])?.name,
    ).toBe('Microsoft Aria Online (Natural)');
    expect(bestVoice([v('English', 'en_GB')])?.name).toBe('English');
  });

  it('finds no voice when the phone has no English voice', () => {
    expect(bestVoice([v('Khmer', 'km-KH'), v('Thai', 'th-TH')])).toBeUndefined();
  });
});

describe('slow mode', () => {
  it('reads two words at a time; short texts stay whole', () => {
    expect(slowChunks('Please reply to my email.')).toEqual(['Please reply', 'to my', 'email.']);
    expect(slowChunks('router')).toEqual(['router']);
    expect(slowChunks('Good morning')).toEqual(['Good morning']);
  });
});
