import type { LessonSeed } from '../../types';
import { ENGLISH_LESSONS_1 } from './english-1';
import { ENGLISH_LESSONS_2 } from './english-2';

// 🔤 English for Beginners — 15 lessons, 15–17 questions each plus a game round.
export const ENGLISH_LESSONS: LessonSeed[] = [...ENGLISH_LESSONS_1, ...ENGLISH_LESSONS_2];
