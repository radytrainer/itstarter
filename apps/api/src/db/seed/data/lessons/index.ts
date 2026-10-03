import type { LessonSeed } from '../../types';
import { revised, withGames, withVocab, type Word } from '../dsl';
import { AI_LESSONS } from './ai';
import { CODING_LESSONS } from './coding';
import { NETWORK_LESSONS } from './networks';
import { SECURITY_LESSONS } from './security';
import { VOCABULARY_LESSONS } from './vocabulary';
import { WEB_LESSONS } from './web';
import { COMPUTER_WORDS, LOGIC_WORDS, MATH_WORDS } from './vocab-1';
import { AI_WORDS, ENGLISH_WORDS, INTERNET_WORDS, OFFICE_WORDS } from './vocab-2';
import { COMPUTER_LESSONS } from './computer';
import { ENGLISH_LESSONS } from './english';
import { AI_GAMES } from './games-ai';
import { COMPUTER_GAMES } from './games-computer';
import { INTERNET_GAMES } from './games-internet';
import { LOGIC_GAMES } from './games-logic';
import { MATH_GAMES } from './games-math';
import { OFFICE_GAMES } from './games-office';
import { INTERNET_LESSONS } from './internet';
import { LOGIC_LESSONS_1 } from './logic-1';
import { LOGIC_LESSONS_2 } from './logic-2';
import { MATH_LESSONS } from './math';
import { OFFICE_LESSONS } from './office';

/**
 * Adds a world's game rounds (🎮 before each reward) and "Words to know" rounds (📖 after the
 * example), and bumps the lessons' revision so existing databases get them too (unless staff
 * edited the lesson).
 */
const withRounds =
  (games: Parameters<typeof withGames>[0], words: Record<string, Word[]>, revision: number) =>
  (seed: LessonSeed) =>
    revised(revision)(withVocab(words)(withGames(games)(seed)));

/** All lessons of IT Starter 2028, in course order (world by world). */
export const ALL_LESSONS: LessonSeed[] = [
  ...MATH_LESSONS.map(withRounds(MATH_GAMES, MATH_WORDS, 3)),
  ...[...LOGIC_LESSONS_1, ...LOGIC_LESSONS_2].map(withRounds(LOGIC_GAMES, LOGIC_WORDS, 3)),
  ...COMPUTER_LESSONS.map(withRounds(COMPUTER_GAMES, COMPUTER_WORDS, 4)),
  ...OFFICE_LESSONS.map(withRounds(OFFICE_GAMES, OFFICE_WORDS, 4)),
  ...INTERNET_LESSONS.map(withRounds(INTERNET_GAMES, INTERNET_WORDS, 4)),
  ...AI_LESSONS.map(withRounds(AI_GAMES, AI_WORDS, 4)),
  ...ENGLISH_LESSONS.map(withRounds({}, ENGLISH_WORDS, 2)),
  ...VOCABULARY_LESSONS,
  ...CODING_LESSONS,
  ...WEB_LESSONS,
  ...NETWORK_LESSONS,
  ...SECURITY_LESSONS,
];
