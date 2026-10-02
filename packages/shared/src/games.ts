import { z } from 'zod';

/**
 * Rules for the moving games. Pure functions shared by the API (to check answers) and the phone
 * (to animate them), so both always agree on what happened.
 */

// ---------- Robot path (coding) ----------

export const ROBOT_DIRECTIONS = ['up', 'down', 'left', 'right'] as const;
export type RobotDirection = (typeof ROBOT_DIRECTIONS)[number];

/** [row, column], counted from 0 at the top-left corner. */
export type Cell = [row: number, col: number];

const cellSchema = z.tuple([z.number().int().min(0).max(9), z.number().int().min(0).max(9)]);

/** The board, sent to the phone as public data (nothing secret: the answer is worked out). */
export const robotBoardSchema = z.object({
  rows: z.number().int().min(1).max(8),
  cols: z.number().int().min(2).max(8),
  start: cellSchema,
  goal: cellSchema,
  walls: z.array(cellSchema).max(40).default([]),
  /** Things to pick up before reaching the goal. */
  collect: z.array(cellSchema).max(6).default([]),
  /** Most blocks allowed (teaches "repeat"). A repeat block counts 1 + its inside. */
  maxBlocks: z.number().int().min(1).max(20).optional(),
  goalIcon: z.string().min(1).max(8).optional(),
  collectIcon: z.string().min(1).max(8).optional(),
});
export type RobotBoard = z.infer<typeof robotBoardSchema>;

export const REPEAT_MIN = 2;
export const REPEAT_MAX = 9;
export const REPEAT_BODY_MAX = 4;
export const PROGRAM_MAX_BLOCKS = 20;

export const robotBlockSchema = z.union([
  z.enum(ROBOT_DIRECTIONS),
  z.object({
    repeat: z.number().int().min(REPEAT_MIN).max(REPEAT_MAX),
    do: z.array(z.enum(ROBOT_DIRECTIONS)).min(1).max(REPEAT_BODY_MAX),
  }),
]);
export type RobotBlock = z.infer<typeof robotBlockSchema>;

const STEP: Record<RobotDirection, Cell> = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

/** Blocks used: an arrow is 1, a repeat is 1 plus the arrows inside it. */
export function countBlocks(program: RobotBlock[]): number {
  return program.reduce((n, b) => n + (typeof b === 'string' ? 1 : 1 + b.do.length), 0);
}

/** The program as single moves, e.g. [repeat 3 × right] → right, right, right. */
export function expandProgram(program: RobotBlock[]): RobotDirection[] {
  return program.flatMap((b) =>
    typeof b === 'string' ? [b] : Array.from({ length: b.repeat }, () => b.do).flat(),
  );
}

export type RobotOutcome = 'goal' | 'wall' | 'edge' | 'missing' | 'short' | 'too_long';

export interface RobotRun {
  /** Cells visited, starting with the start cell (for the animation). */
  path: Cell[];
  outcome: RobotOutcome;
  /** Moves made before stopping (where it bumped, or reached the goal). */
  steps: number;
  collected: number;
}

const same = (a: Cell, b: Cell) => a[0] === b[0] && a[1] === b[1];
const key = (c: Cell) => `${c[0]},${c[1]}`;

/**
 * Runs a program. The robot stops when it reaches the goal (after collecting everything),
 * bumps into a wall or the edge, or runs out of moves.
 */
export function runRobot(board: RobotBoard, program: RobotBlock[]): RobotRun {
  if (board.maxBlocks !== undefined && countBlocks(program) > board.maxBlocks) {
    return { path: [board.start], outcome: 'too_long', steps: 0, collected: 0 };
  }
  const walls = new Set(board.walls.map(key));
  const toCollect = new Set(board.collect.map(key));
  const path: Cell[] = [board.start];
  let at: Cell = board.start;
  const moves = expandProgram(program);
  for (let i = 0; i < moves.length; i += 1) {
    const [dr, dc] = STEP[moves[i]!];
    const next: Cell = [at[0] + dr, at[1] + dc];
    if (next[0] < 0 || next[1] < 0 || next[0] >= board.rows || next[1] >= board.cols) {
      return { path, outcome: 'edge', steps: i, collected: board.collect.length - toCollect.size };
    }
    if (walls.has(key(next))) {
      return { path, outcome: 'wall', steps: i, collected: board.collect.length - toCollect.size };
    }
    at = next;
    path.push(at);
    toCollect.delete(key(at));
    if (same(at, board.goal) && toCollect.size === 0) {
      return { path, outcome: 'goal', steps: i + 1, collected: board.collect.length };
    }
  }
  const collected = board.collect.length - toCollect.size;
  return {
    path,
    outcome: same(at, board.goal) ? 'missing' : 'short',
    steps: moves.length,
    collected,
  };
}

/**
 * A shortest route (breadth-first search over position + things collected), written with
 * repeat blocks where a direction repeats 3+ times. null when the board can't be solved.
 */
export function solveRobot(board: RobotBoard): RobotBlock[] | null {
  const walls = new Set(board.walls.map(key));
  const items = board.collect.map(key);
  const full = (1 << items.length) - 1;
  const startMask = 0;
  type Node = { at: Cell; mask: number; moves: RobotDirection[] };
  const queue: Node[] = [{ at: board.start, mask: startMask, moves: [] }];
  const seen = new Set([`${key(board.start)}|${startMask}`]);
  while (queue.length > 0) {
    const node = queue.shift()!;
    for (const dir of ROBOT_DIRECTIONS) {
      const [dr, dc] = STEP[dir];
      const at: Cell = [node.at[0] + dr, node.at[1] + dc];
      if (at[0] < 0 || at[1] < 0 || at[0] >= board.rows || at[1] >= board.cols) continue;
      if (walls.has(key(at))) continue;
      const item = items.indexOf(key(at));
      const mask = item >= 0 ? node.mask | (1 << item) : node.mask;
      const moves = [...node.moves, dir];
      if (same(at, board.goal) && mask === full) return compressProgram(moves);
      const id = `${key(at)}|${mask}`;
      if (seen.has(id)) continue;
      seen.add(id);
      queue.push({ at, mask, moves });
    }
  }
  return null;
}

/**
 * Writes moves with as few blocks as it can: runs and short patterns that repeat become repeat
 * blocks. right, right, right, up → [repeat 3 × right], up; R D R D R D → [repeat 3 × (R D)].
 */
export function compressProgram(moves: RobotDirection[]): RobotBlock[] {
  const blocks: RobotBlock[] = [];
  let i = 0;
  while (i < moves.length) {
    let best: { length: number; times: number; saving: number } | null = null;
    for (let length = 1; length <= REPEAT_BODY_MAX; length += 1) {
      const body = moves.slice(i, i + length);
      if (body.length < length) break;
      let times = 1;
      while (times < REPEAT_MAX && body.every((m, k) => moves[i + times * length + k] === m)) {
        times += 1;
      }
      // Blocks saved: the moves written one by one, minus the repeat block (1 + its inside).
      const saving = times * length - (1 + length);
      if (times >= 2 && saving > 0 && (!best || saving > best.saving)) {
        best = { length, times, saving };
      }
    }
    if (best) {
      blocks.push({ repeat: best.times, do: moves.slice(i, i + best.length) });
      i += best.times * best.length;
    } else {
      blocks.push(moves[i]!);
      i += 1;
    }
  }
  return blocks;
}

// ---------- Word builder ----------

/** Same word or sentence, ignoring capitals, extra spaces and a final full stop. */
export function normalizeWords(text: string): string {
  return text
    .normalize('NFC')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\s*([.?!,])\s*$/, '')
    .replace(/\s+([,.?!])/g, '$1');
}
