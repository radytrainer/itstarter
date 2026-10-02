import type {
  ActivityType,
  AwardCriteria,
  LessonStep,
  LocalizedText,
  Media,
  Role,
} from '@itstarter/shared';

/** Shorthand for localized text. Khmer drafts must be reviewed by a native speaker. */
export const t = (en: string, km?: string): LocalizedText => (km ? { en, km } : { en });

export interface OptionSeed {
  label: LocalizedText;
  media?: Media;
  isCorrect?: boolean;
  groupKey?: string;
  matchKey?: string;
  correctOrder?: number;
}

export interface QuestionSeed {
  kind: string;
  prompt: LocalizedText;
  media?: Media;
  hint?: LocalizedText;
  explanation?: LocalizedText;
  difficulty?: 1 | 2 | 3;
  /** PRIVATE: may contain the expected answer. */
  config?: Record<string, unknown>;
  /** PUBLIC: shown with the question (mock email, grid, keys...). Never put answers here. */
  publicConfig?: Record<string, unknown>;
  options?: OptionSeed[];
}

export interface ActivitySeed {
  step: LessonStep;
  type: ActivityType;
  title?: LocalizedText;
  /** PUBLIC: sent to the phone. Never put answers here. */
  config?: Record<string, unknown>;
  isScored?: boolean;
  passScore?: number;
  xpReward?: number;
  questions?: QuestionSeed[];
}

export interface LessonSeed {
  /**
   * Content version (default 1). Raise it after rewriting a lesson: the seed then replaces the
   * lesson's steps on existing databases — unless staff edited the lesson in the admin area.
   */
  revision?: number;
  worldSlug: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  icon: string;
  estimatedMinutes: number;
  xpReward?: number;
  activities: ActivitySeed[];
}

export interface WorldSeed {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  color: string;
  badgeCode: string;
}

export interface AwardSeed {
  code: string;
  name: LocalizedText;
  description: LocalizedText;
  icon: string;
  criteria: AwardCriteria;
  xpBonus?: number;
}

export interface UserSeed {
  username: string;
  displayName: string;
  role: Role;
  password: string;
}
