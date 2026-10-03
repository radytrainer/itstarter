import type { ActivityType, LocalizedText, TextFormat } from '@itstarter/shared';
import {
  t,
  type ActivitySeed,
  type LessonSeed,
  type OptionSeed,
  type QuestionSeed,
} from '../types';

/**
 * Small helpers so lessons read like a script. Each lesson is:
 *   intro → learn → see → play → challenge → reward
 * Text is English first; add Khmer as the second argument of t() once reviewed.
 */

type Text = string | LocalizedText;
const tx = (value: Text): LocalizedText => (typeof value === 'string' ? t(value) : value);

interface QuestionExtras {
  hint?: Text;
  explanation?: Text;
  difficulty?: 1 | 2 | 3;
  /** PUBLIC data shown with the question (mock email, grid, keys...). */
  data?: Record<string, unknown>;
  /** English the 🔊 Listen button reads aloud (listening practice). */
  say?: string;
}

const extras = (q: QuestionExtras) => {
  const data = { ...q.data, ...(q.say ? { speak: q.say } : {}) };
  return {
    ...(q.hint ? { hint: tx(q.hint) } : {}),
    ...(q.explanation ? { explanation: tx(q.explanation) } : {}),
    ...(q.difficulty ? { difficulty: q.difficulty } : {}),
    ...(Object.keys(data).length > 0 ? { publicConfig: data } : {}),
  };
};

// ---------- Steps ----------

export const intro = (emoji: string, message: Text): ActivitySeed => ({
  step: 'welcome',
  type: 'intro',
  config: { emoji, message: tx(message) },
  xpReward: 0,
});

/** Learn cards. A 4th value is English the card's 🔊 button reads aloud. */
export const learn = (
  ...cards: [emoji: string, title: Text, body: Text, say?: string][]
): ActivitySeed => ({
  step: 'learn',
  type: 'learn_card',
  config: {
    cards: cards.map(([emoji, title, body, say]) => ({
      emoji,
      title: tx(title),
      body: tx(body),
      ...(say ? { say } : {}),
    })),
  },
  xpReward: 0,
});

/** The example is shown big; text with words can be translated (pass t(en, km)). */
export const see = (example: Text, explanation: Text): ActivitySeed => ({
  step: 'see',
  type: 'see_example',
  config: { example, explanation: tx(explanation) },
  xpReward: 0,
});

export const seeLevels = (levels: Text[], explanation: Text): ActivitySeed => ({
  step: 'see',
  type: 'see_example',
  config: { levels: levels.map(tx), explanation: tx(explanation) },
  xpReward: 0,
});

export const reward = (message: Text): ActivitySeed => ({
  step: 'reward',
  type: 'reward',
  config: { message: tx(message) },
  xpReward: 0,
});

/** A scored step made of questions. */
export const play = (type: ActivityType, ...questions: QuestionSeed[]): ActivitySeed => ({
  step: 'play',
  type,
  isScored: true,
  passScore: 50,
  xpReward: 10,
  questions,
});

export const challenge = (type: ActivityType, ...questions: QuestionSeed[]): ActivitySeed => ({
  step: 'challenge',
  type,
  isScored: true,
  passScore: 50,
  xpReward: 15,
  questions,
});

/**
 * Long practice sets (Math & Logic): each Check shows the right answer and the explanation
 * straight away, then the student moves on — no retries.
 */
export const revealPlay = (type: ActivityType, ...questions: QuestionSeed[]): ActivitySeed => ({
  ...play(type, ...questions),
  config: { feedback: 'reveal' },
});

export const revealChallenge = (
  type: ActivityType,
  ...questions: QuestionSeed[]
): ActivitySeed => ({
  ...challenge(type, ...questions),
  config: { feedback: 'reveal' },
});

/** Unscored practice game in the browser (mouse skills). */
export const mouseTrainer = (
  step: 'play' | 'challenge',
  tasks: ('tap' | 'double' | 'long' | 'drag' | 'scroll')[],
): ActivitySeed => ({ step, type: 'mouse_trainer', config: { tasks }, xpReward: 10 });

export interface CreationFieldSeed {
  key: string;
  label: Text;
  placeholder?: Text;
  maxLength?: number;
  multiline?: boolean;
}

/** Creative work saved to the student's "My Work" (document, slides or prompt templates). */
export const creation = (
  template: 'document' | 'slides' | 'prompt' | 'budget',
  title: Text,
  fields: CreationFieldSeed[],
): ActivitySeed => ({
  step: 'challenge',
  type: 'creation',
  title: tx(title),
  config: {
    template,
    fields: fields.map((f) => ({
      key: f.key,
      label: tx(f.label),
      ...(f.placeholder ? { placeholder: tx(f.placeholder) } : {}),
      maxLength: f.maxLength ?? 120,
      multiline: f.multiline ?? false,
      required: true,
    })),
  },
  xpReward: 20,
});

// ---------- Questions ----------

export const mc = (
  prompt: Text,
  correct: Text,
  wrong: Text[],
  q: QuestionExtras = {},
): QuestionSeed => ({
  kind: 'single_choice',
  prompt: tx(prompt),
  options: [{ label: tx(correct), isCorrect: true }, ...wrong.map((w) => ({ label: tx(w) }))],
  ...extras(q),
});

/** Choice with emoji pictures, e.g. "Tap the keyboard". */
export const pictureChoice = (
  prompt: Text,
  correct: [emoji: string, label: Text],
  wrong: [emoji: string, label: Text][],
  q: QuestionExtras = {},
): QuestionSeed => {
  const opt = ([emoji, label]: [string, Text], isCorrect = false): OptionSeed => ({
    label: tx(label),
    media: { type: 'emoji', src: emoji, alt: tx(label).en },
    isCorrect,
  });
  return {
    kind: 'single_choice',
    prompt: tx(prompt),
    options: [opt(correct, true), ...wrong.map((w) => opt(w))],
    ...extras(q),
  };
};

export const tf = (prompt: Text, answer: boolean, q: QuestionExtras = {}): QuestionSeed => ({
  kind: 'true_false',
  prompt: tx(prompt),
  config: { answer },
  ...extras(q),
});

export const num = (prompt: Text, answer: number, q: QuestionExtras = {}): QuestionSeed => ({
  kind: 'number',
  prompt: tx(prompt),
  config: { answer },
  ...extras(q),
});

export const sod = (
  prompt: Text,
  answer: 'safe' | 'dangerous',
  q: QuestionExtras = {},
): QuestionSeed => ({
  kind: 'safe_or_dangerous',
  prompt: tx(prompt),
  config: { answer },
  ...extras(q),
});

export const match = (
  prompt: Text,
  pairs: [Text, Text][],
  q: QuestionExtras = {},
): QuestionSeed => ({
  kind: 'matching',
  prompt: tx(prompt),
  options: pairs.flatMap(([left, right], i) => [
    { label: tx(left), groupKey: 'left', matchKey: `m${i}` },
    { label: tx(right), groupKey: 'right', matchKey: `m${i}` },
  ]),
  ...extras(q),
});

/** Items listed in the CORRECT order; the API shuffles them for the student. */
export const order = (prompt: Text, items: Text[], q: QuestionExtras = {}): QuestionSeed => ({
  kind: 'ordering',
  prompt: tx(prompt),
  options: items.map((label, i) => ({ label: tx(label), correctOrder: i + 1 })),
  ...extras(q),
});

/** Server-generated maths with fresh numbers on every replay. */
export const gen = (
  generator: string,
  difficulty: 1 | 2 | 3,
  label: Text = 'Practice',
): QuestionSeed => ({
  kind: 'generated',
  prompt: tx(label),
  difficulty,
  config: { generator },
});

/** Press a key or shortcut on the on-screen keyboard. */
export const keys = (prompt: Text, answer: string[], q: QuestionExtras = {}): QuestionSeed => ({
  kind: 'key_combo',
  prompt: tx(prompt),
  config: { answer },
  ...extras(q),
});

/** Sort items into groups (files into folders...). Items: [label, bucketKey]. */
export const sortInto = (
  prompt: Text,
  buckets: [key: string, label: Text, emoji?: string][],
  items: [label: Text, bucketKey: string][],
  q: QuestionExtras = {},
): QuestionSeed => ({
  kind: 'categorize',
  prompt: tx(prompt),
  options: [
    ...buckets.map(([key, label, emoji]) => ({
      label: tx(label),
      groupKey: 'bucket',
      matchKey: key,
      ...(emoji ? { media: { type: 'emoji' as const, src: emoji, alt: tx(label).en } } : {}),
    })),
    ...items.map(([label, key]) => ({ label: tx(label), groupKey: 'item', matchKey: key })),
  ],
  ...extras(q),
});

export interface Grid {
  /** First row = column headers shown in the sheet (A, B, ... are added automatically). */
  rows: (string | number)[][];
}

/** Tap a spreadsheet cell. */
export const cell = (
  prompt: Text,
  answer: string,
  sheet: { grid: Grid },
  q: QuestionExtras = {},
): QuestionSeed => ({
  kind: 'cell_select',
  prompt: tx(prompt),
  config: { answer },
  ...extras({ ...q, data: { ...sheet, ...q.data } }),
});

/** Format a line of text in a mini word processor. Only the given properties are checked. */
export const formatText = (
  prompt: Text,
  text: string,
  answer: Partial<TextFormat>,
  q: QuestionExtras = {},
): QuestionSeed => ({
  kind: 'format_text',
  prompt: tx(prompt),
  config: { answer },
  ...extras({ ...q, data: { text, ...q.data } }),
});

/** Build a prompt: for each part, the FIRST choice is the best one. */
export const promptBuilder = (
  prompt: Text,
  parts: Partial<Record<'role' | 'task' | 'context' | 'format', [best: Text, ...others: Text[]]>>,
  q: QuestionExtras = {},
): QuestionSeed => ({
  kind: 'prompt_builder',
  prompt: tx(prompt),
  options: Object.entries(parts).flatMap(([part, choices]) =>
    (choices ?? []).map((label, i) => ({ label: tx(label), groupKey: part, isCorrect: i === 0 })),
  ),
  ...extras(q),
});

// ---------- Moving games ----------

/** A game item: text, or [emoji, text] for a picture card. */
export type Item = Text | [emoji: string, label: Text];

const itemOption = (item: Item, extra: Partial<OptionSeed> = {}): OptionSeed => {
  if (Array.isArray(item)) {
    const [emoji, label] = item;
    return { label: tx(label), media: { type: 'emoji', src: emoji, alt: tx(label).en }, ...extra };
  }
  return { label: tx(item), ...extra };
};

/** Text that looks the same in both languages (a Khmer word on an English ↔ Khmer card). */
export const same = (text: string): LocalizedText => ({ en: text, km: text });

/** 🎮 The game round of a lesson (retry mode: games can be played again). */
export const game = (...questions: QuestionSeed[]): ActivitySeed => ({
  step: 'challenge',
  type: 'game',
  title: t('Game time', 'ពេលលេងហ្គេម'),
  isScored: true,
  passScore: 50,
  xpReward: 15,
  questions,
});

/** Catch the falling answers: `targets` should be caught, `others` left to fall. */
export const catchIt = (
  prompt: Text,
  targets: Item[],
  others: Item[],
  q: QuestionExtras & { speed?: 'slow' | 'normal' | 'fast' } = {},
): QuestionSeed => ({
  kind: 'catch',
  prompt: tx(prompt),
  options: [
    ...targets.map((i) => itemOption(i, { isCorrect: true })),
    ...others.map((i) => itemOption(i)),
  ],
  ...extras({ ...q, data: { speed: q.speed ?? 'normal', ...q.data } }),
});

/** Memory cards: each pair is two cards that belong together. */
export const memory = (
  prompt: Text,
  pairs: [Item, Item][],
  q: QuestionExtras = {},
): QuestionSeed => ({
  kind: 'memory',
  prompt: tx(prompt),
  options: pairs.flatMap(([a, b], i) => [
    itemOption(a, { matchKey: `p${i}` }),
    itemOption(b, { matchKey: `p${i}` }),
  ]),
  ...extras(q),
});

export interface RobotOptions extends QuestionExtras {
  maxBlocks?: number;
  goalIcon?: string;
  collectIcon?: string;
}

/**
 * Robot path from a little map: S start, G goal, # wall, * thing to collect, . empty.
 *   robot('Get to the flag', ['S..#', '.#..', '...G'])
 */
export const robot = (prompt: Text, map: string[], q: RobotOptions = {}): QuestionSeed => {
  const find = (ch: string) =>
    map.flatMap((row, r) => [...row].flatMap((c, col) => (c === ch ? [[r, col]] : [])));
  const [start] = find('S');
  const [goal] = find('G');
  if (!start || !goal) throw new Error(`Robot map needs S and G: ${map.join('/')}`);
  const { maxBlocks, goalIcon, collectIcon, ...rest } = q;
  return {
    kind: 'robot',
    prompt: tx(prompt),
    ...extras({
      ...rest,
      data: {
        robot: {
          rows: map.length,
          cols: map[0]!.length,
          start,
          goal,
          walls: find('#'),
          collect: find('*'),
          ...(maxBlocks ? { maxBlocks } : {}),
          ...(goalIcon ? { goalIcon } : {}),
          ...(collectIcon ? { collectIcon } : {}),
        },
        ...rest.data,
      },
    }),
  };
};

/** Spell a word with letter tiles (plus a few extra letters to make it a puzzle). */
export const spell = (
  prompt: Text,
  word: string,
  q: QuestionExtras & { extra?: string } = {},
): QuestionSeed => ({
  kind: 'word_builder',
  prompt: tx(prompt),
  config: { answer: word },
  options: [...word, ...(q.extra ?? '')].map((letter) => ({ label: t(letter) })),
  ...extras(q),
});

/** Build a sentence from word tiles (final . ? ! are optional when checking). */
export const buildSentence = (
  prompt: Text,
  sentence: string,
  q: QuestionExtras & { extra?: string[] } = {},
): QuestionSeed => ({
  kind: 'word_builder',
  prompt: tx(prompt),
  config: { answer: sentence },
  options: [...sentence.replace(/[.?!]$/, '').split(/\s+/), ...(q.extra ?? [])].map((w) => ({
    label: t(w),
  })),
  ...extras({ ...q, data: { join: ' ', ...q.data } }),
});

/** Type a word or sentence (spelling / typing practice). `accept`: other right answers. */
export const typeIt = (
  prompt: Text,
  answer: string,
  q: QuestionExtras & { accept?: string[] } = {},
): QuestionSeed => ({
  kind: 'word_builder',
  prompt: tx(prompt),
  config: { answer, ...(q.accept ? { accept: q.accept } : {}) },
  ...extras(q),
});

// ---------- Words to know (vocabulary) ----------

/** An IT word: English, Khmer meaning, optional emoji picture. */
export type Word = [en: string, km: string, emoji?: string];

/**
 * 📖 Words to know: match each IT word to its Khmer meaning (memory cards), then listen and
 * spell one of them. Spelling uses the first one-word term unless `spellWord` is given.
 */
export const vocab = (words: Word[], spellWord?: string): ActivitySeed => {
  const word = spellWord ?? words.map(([en]) => en).find((en) => /^[A-Za-z]{3,12}$/.test(en));
  if (!word) throw new Error(`No one-word term to spell in: ${words.map((w) => w[0]).join(', ')}`);
  return {
    step: 'learn',
    type: 'vocabulary',
    title: t('Words to know', 'ពាក្យត្រូវដឹង'),
    isScored: true,
    passScore: 50,
    xpReward: 10,
    questions: [
      memory(
        t(
          'Match each IT word to its Khmer meaning.',
          'ផ្គូផ្គងពាក្យ IT នីមួយៗជាមួយអត្ថន័យជាភាសាខ្មែរ។',
        ),
        words.map(([en, km, emoji]) => [emoji ? [emoji, t(en)] : t(en), same(km)]),
      ),
      spell(t('Listen 🔊 and spell the IT word.', 'ស្តាប់ 🔊 ហើយប្រកបពាក្យ IT។'), word, {
        say: word,
        extra: 'eo',
      }),
    ],
  };
};

/** Adds each lesson's "Words to know" round (by lesson slug) right after its example step. */
export const withVocab =
  (lists: Record<string, Word[]>) =>
  (seed: LessonSeed): LessonSeed => {
    const words = lists[seed.slug];
    if (!words) return seed;
    const see = seed.activities.findIndex((a) => a.step === 'see');
    const learn = seed.activities.findIndex((a) => a.step === 'learn');
    const at = (see !== -1 ? see : learn) + 1;
    const activities = [...seed.activities];
    activities.splice(at, 0, vocab(words));
    return { ...seed, activities };
  };

/** Everything a standard lesson needs; `plannedLesson` puts it in the usual order. */
export interface LessonPlan {
  intro: [emoji: string, message: Text];
  learn: [emoji: string, title: Text, body: Text, say?: string][];
  see: [example: Text, explanation: Text];
  words: Word[];
  play: QuestionSeed[];
  challenge: QuestionSeed[];
  games: QuestionSeed[];
  reward: Text;
  minutes?: number;
}

/**
 * welcome → learn → see → 📖 words → play → challenge → 🎮 game → reward.
 * Quiz steps show the answer after each Check; games can be replayed.
 */
export function plannedLesson(
  worldSlug: string,
  slug: string,
  icon: string,
  title: LocalizedText,
  summary: Text,
  plan: LessonPlan,
): LessonSeed {
  return lesson(worldSlug, slug, icon, title, summary, plan.minutes ?? 12, [
    intro(...plan.intro),
    learn(...plan.learn),
    see(...plan.see),
    vocab(plan.words),
    revealPlay('multiple_choice', ...plan.play),
    revealChallenge('multiple_choice', ...plan.challenge),
    game(...plan.games),
    reward(plan.reward),
  ]);
}

/** A piece of code shown with the question (never run). */
export const code = (
  source: string,
  language: 'HTML' | 'CSS' | 'JavaScript' | 'Python' | 'Code' = 'Code',
) => ({
  code: source,
  codeLang: language,
});

/** Adds each lesson's game round (by lesson slug) just before its reward step. */
export const withGames =
  (games: Record<string, ActivitySeed>) =>
  (seed: LessonSeed): LessonSeed => {
    const round = games[seed.slug];
    if (!round) return seed;
    const at = seed.activities.findIndex((a) => a.step === 'reward');
    const activities = [...seed.activities];
    activities.splice(at === -1 ? activities.length : at, 0, round);
    return { ...seed, activities };
  };

// ---------- Mocks (public data for realistic scenes) ----------

export const emailMock = (from: string, subject: string, body: string, attachment?: string) => ({
  mock: { type: 'email', from, subject, body, ...(attachment ? { attachment } : {}) },
});
export const urlMock = (url: string, note?: string) => ({
  mock: { type: 'url', url, ...(note ? { note } : {}) },
});
export const searchMock = (query: string) => ({ mock: { type: 'search', query } });
export const chatMock = (...messages: [from: 'you' | 'ai', text: string][]) => ({
  mock: { type: 'chat', messages: messages.map(([from, text]) => ({ from, text })) },
});
export const gridData = (rows: (string | number)[][]) => ({ grid: { rows } });

/** Marks rewritten lessons, so existing databases get the new version (see LessonSeed.revision). */
export const revised =
  (revision: number) =>
  (seed: LessonSeed): LessonSeed => ({ ...seed, revision });

export function lesson(
  worldSlug: string,
  slug: string,
  icon: string,
  title: LocalizedText,
  summary: Text,
  minutes: number,
  activities: ActivitySeed[],
): LessonSeed {
  return {
    worldSlug,
    slug,
    icon,
    title,
    summary: tx(summary),
    estimatedMinutes: minutes,
    activities,
  };
}
