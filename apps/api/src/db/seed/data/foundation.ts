import type { Role } from '@itstarter/shared';
import { t, type AwardSeed, type WorldSeed } from '../types';

// Khmer (km) strings in this file are DRAFTS and must be reviewed by a native speaker.

/** Fixed ids: code relies on role codes, but ids keep foreign keys stable across environments. */
export const ROLE_SEEDS: { id: number; code: Role }[] = [
  { id: 1, code: 'STUDENT' },
  { id: 2, code: 'TEACHER' },
  { id: 3, code: 'ADMIN' },
];

export const LEVEL_SEEDS = [
  { number: 1, icon: '🌱', minXp: 0, name: t('Curious Beginner', 'អ្នកចាប់ផ្តើមដែលចង់ដឹង') },
  { number: 2, icon: '🔍', minXp: 300, name: t('IT Explorer', 'អ្នករុករក IT') },
  { number: 3, icon: '🛠️', minXp: 900, name: t('Digital Creator', 'អ្នកបង្កើតឌីជីថល') },
  { number: 4, icon: '🤖', minXp: 1800, name: t('AI Explorer', 'អ្នករុករក AI') },
  { number: 5, icon: '🚀', minXp: 3000, name: t('IT Starter', 'IT Starter') },
];

export const COURSE_SEED = {
  slug: 'it-starter-2028',
  title: t('IT Starter 2028'),
  description: t('Your fun first steps into the world of IT.'),
};

export const COHORT_SEED = { name: 'Generation 2028 – Class A', year: 2028 };

export const WORLD_SEEDS: WorldSeed[] = [
  {
    slug: 'math-playground',
    icon: '🔢',
    color: 'violet',
    badgeCode: 'math-master',
    title: t('Math Playground', 'សួនលេងគណិតវិទ្យា'),
    description: t(
      'Numbers, money, time and shapes — with fresh questions every time.',
      'លេខ លុយ ពេលវេលា និងរូបរាង — ជាមួយសំណួរថ្មីរាល់ពេល។',
    ),
  },
  {
    slug: 'logic-playground',
    icon: '🧩',
    color: 'indigo',
    badgeCode: 'logic-master',
    title: t('Logic Playground', 'សួនលេងតក្កវិជ្ជា'),
    description: t(
      'Puzzles, patterns and thinking like a programmer.',
      'ល្បែងផ្គុំ លំនាំ និងការគិតដូចអ្នកសរសេរកម្មវិធី។',
    ),
  },
  {
    slug: 'computer-explorer',
    icon: '🖥️',
    color: 'sky',
    badgeCode: 'computer-explorer',
    title: t('Computer Explorer', 'អ្នករុករកកុំព្យូទ័រ'),
    description: t('Meet the computer: parts, mouse, keyboard and files.'),
  },
  {
    slug: 'office-creator',
    icon: '📄',
    color: 'emerald',
    badgeCode: 'office-creator',
    title: t('Office Creator', 'អ្នកបង្កើតឯកសារការិយាល័យ'),
    description: t('Documents, spreadsheets and presentations.'),
  },
  {
    slug: 'internet-explorer',
    icon: '🌐',
    color: 'amber',
    badgeCode: 'web-explorer',
    title: t('Internet Explorer', 'អ្នករុករកអ៊ីនធឺណិត'),
    description: t('Search, email and staying safe online.'),
  },
  {
    slug: 'ai-playground',
    icon: '🤖',
    color: 'rose',
    badgeCode: 'ai-explorer',
    title: t('AI Playground', 'សួនលេង AI'),
    description: t('Learn what AI is and how to ask it good questions.'),
  },
  {
    slug: 'english-starter',
    icon: '🔤',
    color: 'teal',
    badgeCode: 'english-star',
    title: t('English for Beginners', 'ភាសាអង់គ្លេសសម្រាប់អ្នកចាប់ផ្តើម'),
    description: t(
      'Words, grammar and everyday English — with listening, spelling and games.',
      'ពាក្យ វេយ្យាករណ៍ និងភាសាអង់គ្លេសប្រចាំថ្ងៃ — ជាមួយការស្តាប់ ការប្រកប និងហ្គេម។',
    ),
  },
];

/**
 * Content the course no longer uses. On databases seeded before the change, the seed archives
 * these (soft delete) instead of removing them, so students' history and XP stay intact.
 * Brain Playground was split into Math Playground and Logic Playground.
 */
export const RETIRED_WORLD_SLUGS = ['brain-playground'];
export const RETIRED_BADGE_CODES = ['brain-master'];

export const BADGE_SEEDS: AwardSeed[] = [
  {
    code: 'math-master',
    icon: '🔢',
    name: t('Math Master', 'មេគណិតវិទ្យា'),
    description: t('Finished every lesson in Math Playground.'),
    criteria: { type: 'world_completed', worldSlug: 'math-playground' },
  },
  {
    code: 'logic-master',
    icon: '🧩',
    name: t('Logic Master', 'មេតក្កវិជ្ជា'),
    description: t('Finished every lesson in Logic Playground.'),
    criteria: { type: 'world_completed', worldSlug: 'logic-playground' },
  },
  {
    code: 'computer-explorer',
    icon: '🖥️',
    name: t('Computer Explorer'),
    description: t('Finished every lesson in Computer Explorer.'),
    criteria: { type: 'world_completed', worldSlug: 'computer-explorer' },
  },
  {
    code: 'mouse-master',
    icon: '🖱️',
    name: t('Mouse Master'),
    description: t('Completed 3 mouse activities.'),
    criteria: { type: 'activity_type_completed', activityType: 'mouse_trainer', count: 3 },
  },
  {
    code: 'keyboard-hero',
    icon: '⌨️',
    name: t('Keyboard Hero'),
    description: t('Completed 3 keyboard challenges.'),
    criteria: { type: 'activity_type_completed', activityType: 'keyboard_challenge', count: 3 },
  },
  {
    code: 'office-creator',
    icon: '📄',
    name: t('Office Creator'),
    description: t('Finished every lesson in Office Creator.'),
    criteria: { type: 'world_completed', worldSlug: 'office-creator' },
  },
  {
    code: 'web-explorer',
    icon: '🌐',
    name: t('Web Explorer'),
    description: t('Finished every lesson in Internet Explorer.'),
    criteria: { type: 'world_completed', worldSlug: 'internet-explorer' },
  },
  {
    code: 'cyber-guardian',
    icon: '🛡️',
    name: t('Cyber Guardian'),
    description: t('Completed 3 Safe or Dangerous games.'),
    criteria: { type: 'activity_type_completed', activityType: 'safe_or_dangerous', count: 3 },
  },
  {
    code: 'ai-explorer',
    icon: '🤖',
    name: t('AI Explorer'),
    description: t('Finished every lesson in AI Playground.'),
    criteria: { type: 'world_completed', worldSlug: 'ai-playground' },
  },
  {
    code: 'english-star',
    icon: '🔤',
    name: t('English Star', 'តារាភាសាអង់គ្លេស'),
    description: t('Finished every lesson in English for Beginners.'),
    criteria: { type: 'world_completed', worldSlug: 'english-starter' },
  },
  {
    code: 'it-starter',
    icon: '🚀',
    name: t('IT Starter'),
    description: t('Completed the whole IT Starter 2028 journey!'),
    criteria: { type: 'course_completed', courseSlug: 'it-starter-2028' },
  },
];

export const ACHIEVEMENT_SEEDS: AwardSeed[] = [
  {
    code: 'first-lesson',
    icon: '👣',
    name: t('First Step'),
    description: t('Finished your first lesson.'),
    criteria: { type: 'lessons_completed', count: 1 },
    xpBonus: 20,
  },
  {
    code: 'five-lessons',
    icon: '⭐',
    name: t('Getting Going'),
    description: t('Finished 5 lessons.'),
    criteria: { type: 'lessons_completed', count: 5 },
    xpBonus: 30,
  },
  {
    code: 'streak-3',
    icon: '🔥',
    name: t('3-Day Streak'),
    description: t('Learned 3 days in a row.'),
    criteria: { type: 'streak_days', days: 3 },
    xpBonus: 30,
  },
  {
    code: 'streak-7',
    icon: '🌟',
    name: t('On Fire'),
    description: t('Learned 7 days in a row.'),
    criteria: { type: 'streak_days', days: 7 },
    xpBonus: 50,
  },
  {
    code: 'game-player',
    icon: '🎮',
    name: t('Game Player', 'អ្នកលេងហ្គេម'),
    description: t('Finished 10 game rounds.'),
    criteria: { type: 'activity_type_completed', activityType: 'game', count: 10 },
    xpBonus: 30,
  },
  {
    code: 'xp-500',
    icon: '💎',
    name: t('500 XP'),
    description: t('Earned 500 XP.'),
    criteria: { type: 'xp_reached', xp: 500 },
  },
  {
    code: 'xp-1000',
    icon: '🏆',
    name: t('1000 XP'),
    description: t('Earned 1000 XP.'),
    criteria: { type: 'xp_reached', xp: 1000 },
  },
];
