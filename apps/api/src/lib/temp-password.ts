import { randomInt } from 'node:crypto';

// Short, common words that are easy to read aloud and type on a phone.
const WORDS = [
  'apple',
  'banana',
  'mango',
  'lemon',
  'river',
  'ocean',
  'cloud',
  'storm',
  'tiger',
  'panda',
  'eagle',
  'dolphin',
  'rabbit',
  'turtle',
  'monkey',
  'lion',
  'green',
  'blue',
  'orange',
  'purple',
  'silver',
  'golden',
  'yellow',
  'pink',
  'happy',
  'brave',
  'quick',
  'smart',
  'calm',
  'bright',
  'lucky',
  'kind',
  'rocket',
  'planet',
  'comet',
  'star',
  'moon',
  'sun',
  'robot',
  'pixel',
  'pencil',
  'paper',
  'book',
  'school',
  'garden',
  'forest',
  'island',
  'bridge',
  'music',
  'drum',
  'guitar',
  'piano',
  'dance',
  'smile',
  'jump',
  'swim',
  'rice',
  'tea',
  'cake',
  'bread',
  'soup',
  'noodle',
  'coconut',
  'pepper',
] as const;

/**
 * A temporary password a teacher can read to a student, e.g. "brave-mango-4821".
 * ~25 bits of entropy: fine for a one-time password that must be changed at next login and
 * is protected by the login rate limit — not meant as a permanent password.
 */
export function generateTemporaryPassword(): string {
  const word = () => WORDS[randomInt(WORDS.length)]!;
  const digits = String(randomInt(10_000)).padStart(4, '0');
  return `${word()}-${word()}-${digits}`;
}
