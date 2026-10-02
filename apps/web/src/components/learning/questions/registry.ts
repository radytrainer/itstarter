import { safeOrDangerous, trueFalse } from './binary';
import { catchGame } from './catch';
import { categorize } from './categorize';
import { cellSelect } from './cell-select';
import { singleChoice } from './choice';
import { formatText } from './format-text';
import { keyCombo } from './key-combo';
import { matching } from './matching';
import { memoryGame } from './memory';
import { numberKind } from './number';
import { ordering } from './ordering';
import { promptBuilder } from './prompt-builder';
import { robotGame } from './robot';
import type { QuestionKindDef } from './types';
import { wordBuilder } from './word-builder';

/**
 * Question kind → input component. Adding a new kind = one file + one line here
 * (and a checker in apps/api/src/engine/checkers.ts). Lessons never need their own components.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- each entry has its own value type
export const QUESTION_KINDS: Record<string, QuestionKindDef<any>> = {
  single_choice: singleChoice,
  true_false: trueFalse,
  safe_or_dangerous: safeOrDangerous,
  number: numberKind,
  matching,
  ordering,
  key_combo: keyCombo,
  categorize,
  cell_select: cellSelect,
  format_text: formatText,
  prompt_builder: promptBuilder,
  catch: catchGame,
  memory: memoryGame,
  robot: robotGame,
  word_builder: wordBuilder,
};
