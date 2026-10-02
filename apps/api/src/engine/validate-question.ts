import {
  answerSchemas,
  countBlocks,
  normalizeWords,
  robotBoardSchema,
  solveRobot,
  type QuestionInput,
} from '@itstarter/shared';
import { isSupportedKind } from './checkers';
import { isGenerator } from './generators';

const FORBIDDEN_PUBLIC_KEYS = /"(answer|answers|isCorrect|is_correct|correct|solution)"\s*:/;

/**
 * Can a student actually answer this question? Returns plain-English problems (empty = OK).
 * Used by the admin API before saving, so editors can't publish a broken question.
 */
export function validateQuestion(q: QuestionInput): string[] {
  const problems: string[] = [];
  const options = q.options;
  const answer = q.config.answer;

  if (FORBIDDEN_PUBLIC_KEYS.test(JSON.stringify(q.publicConfig))) {
    problems.push('Public data is shown to students: it must not contain the answer.');
  }
  if (q.kind !== 'generated' && !isSupportedKind(q.kind)) {
    return [...problems, `Unknown question kind "${q.kind}".`];
  }

  switch (q.kind) {
    case 'generated':
      if (!isGenerator(q.config.generator)) problems.push('Choose a valid generator.');
      break;
    case 'single_choice': {
      if (options.length < 2) problems.push('Add at least 2 options.');
      const correct = options.filter((o) => o.isCorrect).length;
      if (correct !== 1) problems.push(`Mark exactly 1 correct option (now ${correct}).`);
      break;
    }
    case 'true_false':
      if (typeof answer !== 'boolean') problems.push('Set the answer to true or false.');
      break;
    case 'number':
      if (typeof answer !== 'number' || !Number.isFinite(answer))
        problems.push('Set a number as the answer.');
      break;
    case 'safe_or_dangerous':
      if (answer !== 'safe' && answer !== 'dangerous')
        problems.push('Set the answer to "safe" or "dangerous".');
      break;
    case 'matching': {
      const lefts = options.filter((o) => o.groupKey === 'left');
      const rights = options.filter((o) => o.groupKey === 'right');
      if (lefts.length < 2) problems.push('Add at least 2 pairs.');
      for (const l of lefts) {
        if (rights.filter((r) => r.matchKey && r.matchKey === l.matchKey).length !== 1) {
          problems.push(`“${l.label.en}” needs exactly one partner with the same match key.`);
        }
      }
      if (lefts.length !== rights.length)
        problems.push('Left and right need the same number of items.');
      break;
    }
    case 'ordering': {
      if (options.length < 2) problems.push('Add at least 2 items.');
      const orders = options.map((o) => o.correctOrder ?? 0).sort((a, b) => a - b);
      if (!orders.every((n, i) => n === i + 1))
        problems.push('Number the correct order 1, 2, 3… with no gaps.');
      break;
    }
    case 'key_combo':
      if (
        !Array.isArray(answer) ||
        answer.length === 0 ||
        !answerSchemas.key_combo.safeParse({ keys: answer }).success
      ) {
        problems.push('Set the answer as a list of keys, e.g. ["Ctrl", "C"].');
      }
      break;
    case 'categorize': {
      const buckets = new Set(
        options.filter((o) => o.groupKey === 'bucket').map((o) => o.matchKey),
      );
      const items = options.filter((o) => o.groupKey === 'item');
      if (buckets.size < 2) problems.push('Add at least 2 groups (group key "bucket").');
      if (items.length < 2) problems.push('Add at least 2 items (group key "item").');
      for (const item of items) {
        if (!buckets.has(item.matchKey))
          problems.push(`“${item.label.en}” must belong to an existing group.`);
      }
      break;
    }
    case 'cell_select': {
      if (typeof answer !== 'string' || !/^[A-Z][1-9][0-9]?$/.test(answer)) {
        problems.push('Set the answer as a cell address like "B3".');
      }
      const rows = (q.publicConfig.grid as { rows?: unknown[][] } | undefined)?.rows;
      if (!Array.isArray(rows) || rows.length === 0)
        problems.push('Add the sheet in public data: { "grid": { "rows": [...] } }.');
      break;
    }
    case 'format_text': {
      const parsed = answerSchemas.format_text.shape.format.partial().safeParse(answer);
      if (!parsed.success || Object.keys(parsed.data).length === 0) {
        problems.push('Set which formatting is required, e.g. { "bold": true }.');
      }
      if (typeof q.publicConfig.text !== 'string')
        problems.push('Add the text to format in public data: { "text": "..." }.');
      break;
    }
    case 'prompt_builder': {
      const parts = new Set(options.map((o) => o.groupKey ?? ''));
      for (const part of parts) {
        const best = options.filter((o) => (o.groupKey ?? '') === part && o.isCorrect).length;
        if (best !== 1) problems.push(`Part “${part || '(none)'}” needs exactly 1 best piece.`);
      }
      break;
    }
    case 'catch': {
      const targets = options.filter((o) => o.isCorrect).length;
      if (targets < 1) problems.push('Mark at least 1 item to catch (correct).');
      if (options.length - targets < 1)
        problems.push('Add at least 1 item to let fall (not correct).');
      if (options.length > 16) problems.push('Use at most 16 falling items.');
      break;
    }
    case 'memory': {
      const keys = new Map<string, number>();
      for (const o of options) keys.set(o.matchKey ?? '', (keys.get(o.matchKey ?? '') ?? 0) + 1);
      if (keys.has('')) problems.push('Every card needs a match key.');
      if ([...keys.values()].some((n) => n !== 2))
        problems.push('Each match key needs exactly 2 cards.');
      if (keys.size < 2 || keys.size > 8) problems.push('Use 2 to 8 pairs.');
      break;
    }
    case 'robot': {
      const board = robotBoardSchema.safeParse(q.publicConfig.robot);
      if (!board.success) {
        problems.push(
          'Add the board in public data: { "robot": { "rows": 4, "cols": 4, "start": [0,0], "goal": [3,3], "walls": [] } }.',
        );
        break;
      }
      const b = board.data;
      const inside = ([r, c]: [number, number]) => r < b.rows && c < b.cols;
      if (![b.start, b.goal, ...b.walls, ...b.collect].every(inside))
        problems.push('Every cell must be inside the board.');
      const solution = solveRobot(b);
      if (!solution) problems.push('The robot cannot reach the goal: move a wall.');
      else if (b.maxBlocks !== undefined && countBlocks(solution) > b.maxBlocks)
        problems.push(`The shortest route needs ${countBlocks(solution)} blocks: raise maxBlocks.`);
      break;
    }
    case 'word_builder': {
      if (typeof answer !== 'string' || !answer.trim()) {
        problems.push('Set the answer word or sentence, e.g. { "answer": "cat" }.');
        break;
      }
      if (options.length > 0) {
        // Tiles: the answer must be buildable from them (letters, or words for a sentence).
        const sentence = q.publicConfig.join === ' ';
        const norm = (x: string) => (sentence ? normalizeWords(x) : x);
        const left = options.map((o) => norm(o.label.en));
        const pieces = sentence ? answer.split(/\s+/) : [...answer];
        for (const piece of pieces) {
          const i = left.indexOf(norm(piece));
          if (i === -1) {
            problems.push(`The tiles cannot make “${answer}” (missing “${piece}”).`);
            break;
          }
          left.splice(i, 1);
        }
      }
      break;
    }
  }
  return problems;
}
