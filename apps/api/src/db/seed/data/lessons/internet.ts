import type { LessonSeed } from '../../types';
import { revised } from '../dsl';
import { INTERNET_LESSONS_1 } from './internet-1';
import { INTERNET_LESSONS_2 } from './internet-2';

// 🌐 Internet Explorer — 15 lessons. Revision 2: expanded to 15–18 questions per lesson with the
// answer shown after each Check (existing databases get the new version from the seed).
export const INTERNET_LESSONS: LessonSeed[] = [...INTERNET_LESSONS_1, ...INTERNET_LESSONS_2].map(
  revised(2),
);
