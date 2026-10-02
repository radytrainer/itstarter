import {
  answerSchemas,
  normalizeWords,
  robotBoardSchema,
  runRobot,
  solveRobot,
  TEXT_FORMAT_DEFAULT,
  type AnswerFor,
  type AnyAnswer,
  type QuestionKind,
  type TextFormat,
} from '@itstarter/shared';

/** A question as stored, including the PRIVATE answer data. */
export interface QuestionWithAnswer {
  kind: string;
  config: Record<string, unknown>;
  /** Public data shown with the question (the robot's board, ...). */
  publicConfig?: Record<string, unknown>;
  options: {
    id: string;
    isCorrect: boolean;
    matchKey: string | null;
    groupKey: string | null;
    correctOrder: number | null;
  }[];
}

export interface CheckResult {
  correct: boolean;
  partial: { correct: number; total: number } | null;
  /** The correct answer in the same shape the student sends. */
  correctAnswer: AnyAnswer;
  /** 0–100 when the kind scores more finely than right/partial (memory: fewer moves = better). */
  score?: number;
}

export class UnsupportedQuestionError extends Error {}
export class InvalidAnswerError extends Error {}

const NUMBER_TOLERANCE = 1e-6;

export function isSupportedKind(kind: string): kind is QuestionKind {
  return kind in answerSchemas;
}

/**
 * Checks a student's answer. Pure function: the expected answer comes from the database,
 * never from the client.
 */
export function checkAnswer(question: QuestionWithAnswer, rawAnswer: unknown): CheckResult {
  const kind = question.kind;
  if (!isSupportedKind(kind)) throw new UnsupportedQuestionError(kind);
  const parsed = answerSchemas[kind].safeParse(rawAnswer);
  if (!parsed.success) throw new InvalidAnswerError(`Invalid answer for ${kind}`);

  switch (kind) {
    case 'single_choice': {
      const { optionId } = parsed.data as { optionId: string };
      const right = question.options.find((o) => o.isCorrect);
      if (!right) throw new UnsupportedQuestionError('single_choice without a correct option');
      return {
        correct: optionId === right.id,
        partial: null,
        correctAnswer: { optionId: right.id },
      };
    }

    case 'true_false': {
      const expected = question.config.answer;
      if (typeof expected !== 'boolean')
        throw new UnsupportedQuestionError('true_false without answer');
      const { value } = parsed.data as { value: boolean };
      return { correct: value === expected, partial: null, correctAnswer: { value: expected } };
    }

    case 'number': {
      const expected = question.config.answer;
      if (typeof expected !== 'number') throw new UnsupportedQuestionError('number without answer');
      const { value } = parsed.data as { value: number };
      return {
        correct: Math.abs(value - expected) < NUMBER_TOLERANCE,
        partial: null,
        correctAnswer: { value: expected },
      };
    }

    case 'safe_or_dangerous': {
      const expected = question.config.answer;
      if (expected !== 'safe' && expected !== 'dangerous') {
        throw new UnsupportedQuestionError('safe_or_dangerous without answer');
      }
      const { value } = parsed.data as { value: 'safe' | 'dangerous' };
      return { correct: value === expected, partial: null, correctAnswer: { value: expected } };
    }

    case 'matching': {
      const { pairs } = parsed.data as { pairs: { left: string; right: string }[] };
      const byId = new Map(question.options.map((o) => [o.id, o]));
      const lefts = question.options.filter((o) => o.groupKey === 'left');
      const rights = question.options.filter((o) => o.groupKey === 'right');

      // Each left item counts once; a pair is right when both sides share a match key.
      const answered = new Map<string, string>();
      for (const { left, right } of pairs) {
        if (byId.get(left)?.groupKey !== 'left' || byId.get(right)?.groupKey !== 'right') {
          throw new InvalidAnswerError('Pair uses unknown options');
        }
        answered.set(left, right);
      }
      const rightCount = lefts.filter((l) => {
        const chosen = byId.get(answered.get(l.id) ?? '');
        return chosen !== undefined && chosen.matchKey === l.matchKey;
      }).length;

      return {
        correct: rightCount === lefts.length,
        partial: { correct: rightCount, total: lefts.length },
        correctAnswer: {
          pairs: lefts.map((l) => ({
            left: l.id,
            right: rights.find((r) => r.matchKey === l.matchKey)!.id,
          })),
        },
      };
    }

    case 'ordering': {
      const { order } = parsed.data as { order: string[] };
      const expected = [...question.options]
        .sort((a, b) => (a.correctOrder ?? 0) - (b.correctOrder ?? 0))
        .map((o) => o.id);
      const sameItems =
        order.length === expected.length &&
        new Set(order).size === order.length &&
        order.every((id) => expected.includes(id));
      if (!sameItems) throw new InvalidAnswerError('Order must contain every item exactly once');
      const inPlace = order.filter((id, i) => expected[i] === id).length;
      return {
        correct: inPlace === expected.length,
        partial: { correct: inPlace, total: expected.length },
        correctAnswer: { order: expected },
      };
    }

    case 'key_combo': {
      const expected = question.config.answer;
      if (!Array.isArray(expected) || expected.length === 0) {
        throw new UnsupportedQuestionError('key_combo without answer');
      }
      const { keys } = parsed.data as { keys: string[] };
      const want = normalizeKeys(expected as string[]);
      const got = normalizeKeys(keys);
      return {
        correct: want.length === got.length && want.every((k, i) => k === got[i]),
        partial: null,
        correctAnswer: { keys: expected as string[] },
      };
    }

    case 'categorize': {
      const { placements } = parsed.data as { placements: { item: string; bucket: string }[] };
      const items = question.options.filter((o) => o.groupKey === 'item');
      const buckets = question.options.filter((o) => o.groupKey === 'bucket');
      const bucketById = new Map(buckets.map((b) => [b.id, b]));
      const itemIds = new Set(items.map((i) => i.id));
      const placed = new Map<string, string>();
      for (const { item, bucket } of placements) {
        if (!itemIds.has(item) || !bucketById.has(bucket))
          throw new InvalidAnswerError('Unknown item or bucket');
        placed.set(item, bucket);
      }
      const right = items.filter(
        (i) => bucketById.get(placed.get(i.id) ?? '')?.matchKey === i.matchKey,
      ).length;
      return {
        correct: right === items.length,
        partial: { correct: right, total: items.length },
        correctAnswer: {
          placements: items.map((i) => ({
            item: i.id,
            bucket: buckets.find((b) => b.matchKey === i.matchKey)!.id,
          })),
        },
      };
    }

    case 'cell_select': {
      const expected = question.config.answer;
      if (typeof expected !== 'string')
        throw new UnsupportedQuestionError('cell_select without answer');
      const { cell } = parsed.data as { cell: string };
      return {
        correct: cell === expected.toUpperCase(),
        partial: null,
        correctAnswer: { cell: expected.toUpperCase() },
      };
    }

    case 'format_text': {
      const required = question.config.answer as Partial<TextFormat> | undefined;
      if (!required || typeof required !== 'object')
        throw new UnsupportedQuestionError('format_text without answer');
      const { format } = parsed.data as { format: TextFormat };
      // Only what the task asks for must match ("make it bold" doesn't care about alignment).
      const keys = Object.keys(required) as (keyof TextFormat)[];
      const right = keys.filter((k) => format[k] === required[k]).length;
      return {
        correct: right === keys.length,
        partial: keys.length > 1 ? { correct: right, total: keys.length } : null,
        correctAnswer: { format: { ...TEXT_FORMAT_DEFAULT, ...required } },
      };
    }

    case 'prompt_builder': {
      const { optionIds } = parsed.data as { optionIds: string[] };
      const parts = [...new Set(question.options.map((o) => o.groupKey ?? ''))];
      const chosen = new Set(optionIds);
      const right = parts.filter((part) => {
        const inPart = question.options.filter((o) => (o.groupKey ?? '') === part);
        const picked = inPart.filter((o) => chosen.has(o.id));
        return picked.length === 1 && picked[0]!.isCorrect;
      }).length;
      return {
        correct: right === parts.length,
        partial: { correct: right, total: parts.length },
        correctAnswer: { optionIds: question.options.filter((o) => o.isCorrect).map((o) => o.id) },
      };
    }

    case 'catch': {
      const { caught } = parsed.data as { caught: string[] };
      const known = new Set(question.options.map((o) => o.id));
      if (new Set(caught).size !== caught.length || caught.some((id) => !known.has(id))) {
        throw new InvalidAnswerError('Caught items must be different, known options');
      }
      const got = new Set(caught);
      const rightOnes = question.options.filter((o) => o.isCorrect);
      if (rightOnes.length === 0) throw new UnsupportedQuestionError('catch without targets');
      // An option is handled well when a target was caught or a non-target was left alone.
      const handled = question.options.filter((o) => got.has(o.id) === o.isCorrect).length;
      return {
        correct: handled === question.options.length,
        partial: { correct: handled, total: question.options.length },
        correctAnswer: { caught: rightOnes.map((o) => o.id) },
      };
    }

    case 'memory': {
      const { pairs, moves } = parsed.data as {
        pairs: { a: string; b: string }[];
        moves: number;
      };
      const byId = new Map(question.options.map((o) => [o.id, o]));
      const total = new Set(question.options.map((o) => o.matchKey)).size;
      const used = new Set<string>();
      const found = new Set<string>();
      for (const { a, b } of pairs) {
        const left = byId.get(a);
        const right = byId.get(b);
        if (!left || !right || a === b || used.has(a) || used.has(b)) {
          throw new InvalidAnswerError('Pairs must use different, known cards once');
        }
        used.add(a);
        used.add(b);
        if (left.matchKey && left.matchKey === right.matchKey) found.add(left.matchKey);
      }
      if (moves < pairs.length) throw new InvalidAnswerError('Fewer moves than pairs');
      const correct = found.size === total;
      return {
        correct,
        partial: correct ? null : { correct: found.size, total },
        correctAnswer: {
          pairs: [...new Set(question.options.map((o) => o.matchKey))].map((k) => {
            const [a, b] = question.options.filter((o) => o.matchKey === k);
            return { a: a!.id, b: b!.id };
          }),
          moves: total,
        },
        // Every pair found in up to 2 tries each is perfect; more turns lower the score gently.
        score: correct ? Math.min(100, Math.round((200 * total) / moves)) : undefined,
      };
    }

    case 'robot': {
      const board = robotBoardSchema.safeParse(question.publicConfig?.robot);
      if (!board.success) throw new UnsupportedQuestionError('robot without a valid board');
      const solution = solveRobot(board.data);
      if (!solution) throw new UnsupportedQuestionError('robot board has no solution');
      const { program } = parsed.data as AnswerFor<'robot'>;
      const run = runRobot(board.data, program);
      return {
        correct: run.outcome === 'goal',
        partial: null,
        correctAnswer: { program: solution },
      };
    }

    case 'word_builder': {
      const expected = question.config.answer;
      if (typeof expected !== 'string' || !expected.trim()) {
        throw new UnsupportedQuestionError('word_builder without answer');
      }
      const accept = Array.isArray(question.config.accept)
        ? (question.config.accept as unknown[]).filter((a): a is string => typeof a === 'string')
        : [];
      const { word } = parsed.data as { word: string };
      const allowed = new Set([expected, ...accept].map(normalizeWords));
      return {
        correct: allowed.has(normalizeWords(word)),
        partial: null,
        correctAnswer: { word: expected },
      };
    }
  }
}

const KEY_ALIASES: Record<string, string> = {
  control: 'ctrl',
  cmd: 'ctrl',
  command: 'ctrl',
  option: 'alt',
  return: 'enter',
};

/** Case-insensitive, order-insensitive key names ("Control"+"c" equals "C"+"Ctrl"). */
function normalizeKeys(keys: string[]): string[] {
  return [
    ...new Set(keys.map((k) => KEY_ALIASES[k.trim().toLowerCase()] ?? k.trim().toLowerCase())),
  ].sort();
}
