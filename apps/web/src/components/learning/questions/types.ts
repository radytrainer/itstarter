import type { ComponentType } from 'react';
import type { AnyAnswer, PlayQuestion } from '@itstarter/shared';

/**
 * After Check: was the student right, and (if not) the right answer. Inputs that can, mark the
 * right option and the student's own one; others leave it to the message in the action bar.
 */
export interface Review {
  correct: boolean;
  revealed: AnyAnswer | null;
}

export interface QuestionInputProps<V> {
  question: PlayQuestion;
  value: V;
  onChange: (value: V) => void;
  disabled: boolean;
  locale: string;
  review?: Review | null;
  /**
   * Games that end by themselves (catch, memory, robot) call this with their final value: the
   * runner checks it straight away, as if the student pressed Check.
   */
  submit?: (value: V) => void;
}

/** Everything the question runner needs to know about one question kind. */
export interface QuestionKindDef<V> {
  Input: ComponentType<QuestionInputProps<V>>;
  initial: (question: PlayQuestion) => V;
  /** The game submits itself, so there is no Check button while playing. */
  selfSubmit?: boolean;
  /** After "Try again" the game starts over from `initial` (catch, memory). */
  restartOnRetry?: boolean;
  /** Can the student press "Check"? */
  isReady: (value: V, question: PlayQuestion) => boolean;
  toAnswer: (value: V, question: PlayQuestion) => AnyAnswer;
  /** Keyboard shortcut: the value for option number `index` (0 = key 1 or A), if any. */
  shortcut?: (index: number, question: PlayQuestion) => V | null;
  /** Put a revealed answer into the input so the student can check it themselves. */
  fromRevealed: (revealed: AnyAnswer, question: PlayQuestion) => V;
  /** The revealed answer as text, e.g. "10" or "Monitor → Shows pictures". */
  describe: (
    revealed: AnyAnswer,
    question: PlayQuestion,
    t: (key: string) => string,
    locale: string,
  ) => string;
}
