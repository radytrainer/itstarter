import type { LessonSeed } from '../../types';
import { revised } from '../dsl';
import { AI_LESSONS_1 } from './ai-1';
import { AI_LESSONS_2 } from './ai-2';

// 🤖 AI Playground — 15 lessons. Revision 2: expanded to 15–18 questions per lesson with the
// answer shown after each Check (existing databases get the new version from the seed).
export const AI_LESSONS: LessonSeed[] = [...AI_LESSONS_1, ...AI_LESSONS_2].map(revised(2));
