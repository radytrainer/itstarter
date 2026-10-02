import type { LessonSeed } from '../../types';
import { revised, withGames } from '../dsl';
import { AI_LESSONS } from './ai';
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
 * Adds a world's game rounds (🎮 before each reward) and bumps the lessons' revision, so
 * existing databases get the games too (unless staff edited the lesson).
 */
const withRound =
  (games: Parameters<typeof withGames>[0], revision: number) => (seed: LessonSeed) =>
    revised(revision)(withGames(games)(seed));

/** All lessons of IT Starter 2028, in course order (world by world). */
export const ALL_LESSONS: LessonSeed[] = [
  ...MATH_LESSONS.map(withRound(MATH_GAMES, 2)),
  ...[...LOGIC_LESSONS_1, ...LOGIC_LESSONS_2].map(withRound(LOGIC_GAMES, 2)),
  ...COMPUTER_LESSONS.map(withRound(COMPUTER_GAMES, 3)),
  ...OFFICE_LESSONS.map(withRound(OFFICE_GAMES, 3)),
  ...INTERNET_LESSONS.map(withRound(INTERNET_GAMES, 3)),
  ...AI_LESSONS.map(withRound(AI_GAMES, 3)),
  ...ENGLISH_LESSONS,
];
