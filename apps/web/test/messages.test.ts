import { describe, expect, it } from 'vitest';
import en from '../messages/en.json';
import km from '../messages/km.json';

type Tree = { [key: string]: Tree | string | string[] };

function keys(tree: Tree, prefix = ''): string[] {
  return Object.entries(tree).flatMap(([k, v]) =>
    typeof v === 'object' && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

function leaf(tree: Tree, path: string): unknown {
  return path.split('.').reduce<unknown>((node, k) => (node as Tree)[k], tree);
}

const placeholders = (s: string) =>
  // Only real placeholders: "{name}" or "{count, plural, ...}", not text inside plural branches.
  [...s.matchAll(/\{(\w+)\s*[,}]/g)]
    .map((m) => m[1])
    .filter((p, i, all) => all.indexOf(p) === i)
    .sort();

describe('translations', () => {
  it('Khmer has exactly the same keys as English', () => {
    expect(keys(km as Tree).sort()).toEqual(keys(en as Tree).sort());
  });

  it('no translation is empty', () => {
    for (const [name, messages] of [
      ['en', en],
      ['km', km],
    ] as const) {
      for (const key of keys(messages as Tree)) {
        const value = leaf(messages as Tree, key);
        const values = Array.isArray(value) ? value : [value];
        for (const v of values) expect(String(v).trim(), `${name}:${key}`).not.toBe('');
      }
    }
  });

  it('uses the same {placeholders} in both languages', () => {
    for (const key of keys(en as Tree)) {
      const e = leaf(en as Tree, key);
      const k = leaf(km as Tree, key);
      if (typeof e === 'string' && typeof k === 'string') {
        expect(placeholders(k), key).toEqual(placeholders(e));
      }
    }
  });

  it('keeps encouraging phrase lists the same length', () => {
    expect(km.feedback.correct).toHaveLength(en.feedback.correct.length);
    expect(km.feedback.tryAgain).toHaveLength(en.feedback.tryAgain.length);
  });

  it('never uses discouraging words in learning feedback', () => {
    const all = [...en.feedback.correct, ...en.feedback.tryAgain, ...Object.values(en.lesson)]
      .flatMap((v) => (typeof v === 'string' ? [v] : Object.values(v)))
      .join(' ')
      .toLowerCase();
    for (const word of ['failed', 'wrong', 'bad score', 'incorrect']) {
      expect(all).not.toContain(word);
    }
  });
});
