import type { LessonSeed } from '../../types';
import { SECURITY_LESSONS_1 } from './security-1';
import { SECURITY_LESSONS_2 } from './security-2';

// 🛡️ Cyber Security Pro — 15 lessons with a game round and "Words to know".
export const SECURITY_LESSONS: LessonSeed[] = [...SECURITY_LESSONS_1, ...SECURITY_LESSONS_2];
