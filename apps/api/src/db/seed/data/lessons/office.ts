import type { LessonSeed } from '../../types';
import { revised } from '../dsl';
import { OFFICE_LESSONS_1 } from './office-1';
import { OFFICE_LESSONS_2 } from './office-2';

// 📄 Office Creator — 15 lessons. Revision 2: expanded to 15–18 questions per lesson with the
// answer shown after each Check (existing databases get the new version from the seed).
export const OFFICE_LESSONS: LessonSeed[] = [...OFFICE_LESSONS_1, ...OFFICE_LESSONS_2].map(
  revised(2),
);
