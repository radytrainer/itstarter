import { describe, expect, it } from 'vitest';
import { GENERATORS, generateQuestion, generatedSeed } from '../../src/engine/generators';

const NAMES = Object.keys(GENERATORS);

describe('generated questions', () => {
  it.each(NAMES)('%s: same seed → same question; different seed → (usually) different', (name) => {
    const a = generateQuestion(name, 2, 'student-1:q1:0');
    expect(generateQuestion(name, 2, 'student-1:q1:0')).toEqual(a);
    const prompts = new Set(
      Array.from(
        { length: 10 },
        (_, i) => generateQuestion(name, 2, `student-1:q1:${i}`).prompt.en,
      ),
    );
    expect(prompts.size).toBeGreaterThan(3);
  });

  it.each(NAMES)(
    '%s: every difficulty gives a sensible, finite answer with EN + KM text',
    (name) => {
      for (const difficulty of [1, 2, 3]) {
        for (let i = 0; i < 50; i += 1) {
          const q = generateQuestion(name, difficulty, `s:${i}`);
          expect(Number.isFinite(q.answer), `${name} d${difficulty}`).toBe(true);
          expect(q.answer).toBeGreaterThanOrEqual(0);
          // Money answers have at most 2 decimals; everything else is a whole number.
          expect(Math.round(q.answer * 100) / 100).toBe(q.answer);
          for (const text of [q.prompt, q.hint, q.explanation]) {
            expect(text.en.length).toBeGreaterThan(0);
            expect(text.km?.length ?? 0).toBeGreaterThan(0);
          }
          // The explanation shows the answer, so students learn from a reveal.
          const shown = Number.isInteger(q.answer) ? String(q.answer) : q.answer.toFixed(2);
          expect(q.explanation.en, `${name}: ${q.prompt.en}`).toContain(shown);
        }
      }
    },
  );

  it('gets harder with difficulty (bigger numbers in addition)', () => {
    const avg = (d: number) =>
      Array.from({ length: 100 }, (_, i) => generateQuestion('addition', d, `x${i}`).answer).reduce(
        (a, b) => a + b,
      ) / 100;
    expect(avg(1)).toBeLessThan(avg(2));
    expect(avg(2)).toBeLessThan(avg(3));
  });

  it('division is always exact', () => {
    for (let i = 0; i < 200; i += 1) {
      expect(Number.isInteger(generateQuestion('division', 3, `d${i}`).answer)).toBe(true);
    }
  });

  it('a replay (next round) gives new numbers', () => {
    const first = generateQuestion('multiplication', 2, generatedSeed('stu', 'q', 0));
    const replays = [1, 2, 3].map(
      (round) => generateQuestion('multiplication', 2, generatedSeed('stu', 'q', round)).prompt.en,
    );
    expect(replays.some((p) => p !== first.prompt.en)).toBe(true);
  });

  it('refuses unknown generators', () => {
    expect(() => generateQuestion('telepathy', 1, 'x')).toThrow(/Unknown generator/);
  });
});
