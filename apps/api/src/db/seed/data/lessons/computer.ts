import type { LessonSeed } from '../../types';
import { revised } from '../dsl';
import { COMPUTER_LESSONS_1 } from './computer-1';
import { COMPUTER_LESSONS_2 } from './computer-2';

// 🖥️ Computer Explorer — 15 lessons. Revision 2: expanded to 15–18 questions per lesson with the
// answer shown after each Check (existing databases get the new version from the seed).
export const COMPUTER_LESSONS: LessonSeed[] = [...COMPUTER_LESSONS_1, ...COMPUTER_LESSONS_2].map(
  revised(2),
);
