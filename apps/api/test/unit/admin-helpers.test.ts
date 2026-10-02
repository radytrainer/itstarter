import { describe, expect, it } from 'vitest';
import type { z } from 'zod';
import { parseCsv, questionInputSchema, type QuestionInput } from '@itstarter/shared';
import { ALL_LESSONS } from '../../src/db/seed/data/lessons';
import { validateQuestion } from '../../src/engine/validate-question';

describe('parseCsv', () => {
  it('reads simple rows, CRLF and a BOM', () => {
    expect(parseCsv('﻿username,name\r\nsokha,Sokha Chan\r\n')).toEqual([
      ['username', 'name'],
      ['sokha', 'Sokha Chan'],
    ]);
  });

  it('handles quotes, commas and doubled quotes inside fields', () => {
    expect(parseCsv('a,"Chan, Sokha","He said ""hi"""\n')).toEqual([
      ['a', 'Chan, Sokha', 'He said "hi"'],
    ]);
  });

  it('keeps Khmer text and skips blank lines', () => {
    expect(parseCsv('dara,ដារ៉ា\n\n,\nvanna,វណ្ណា')).toEqual([
      ['dara', 'ដារ៉ា'],
      ['vanna', 'វណ្ណា'],
    ]);
  });

  it('keeps line breaks inside quotes', () => {
    expect(parseCsv('x,"line 1\nline 2"')).toEqual([['x', 'line 1\nline 2']]);
  });
});

const q = (input: Partial<z.input<typeof questionInputSchema>>): QuestionInput =>
  questionInputSchema.parse({ kind: 'single_choice', prompt: { en: 'Q' }, ...input });
const opt = (en: string, extra = {}) => ({ label: { en }, ...extra });

describe('validateQuestion', () => {
  it('accepts a good single choice and explains broken ones', () => {
    expect(validateQuestion(q({ options: [opt('A', { isCorrect: true }), opt('B')] }))).toEqual([]);
    expect(validateQuestion(q({ options: [opt('A'), opt('B')] }))).toEqual([
      'Mark exactly 1 correct option (now 0).',
    ]);
    expect(validateQuestion(q({ options: [opt('A', { isCorrect: true })] }))).toContain(
      'Add at least 2 options.',
    );
  });

  it('checks typed answers', () => {
    expect(validateQuestion(q({ kind: 'number', config: { answer: '6' } }))).toEqual([
      'Set a number as the answer.',
    ]);
    expect(validateQuestion(q({ kind: 'true_false', config: { answer: true } }))).toEqual([]);
    expect(
      validateQuestion(q({ kind: 'safe_or_dangerous', config: { answer: 'maybe' } })),
    ).toHaveLength(1);
    expect(validateQuestion(q({ kind: 'key_combo', config: { answer: [] } }))).toHaveLength(1);
    expect(validateQuestion(q({ kind: 'generated', config: { generator: 'telepathy' } }))).toEqual([
      'Choose a valid generator.',
    ]);
  });

  it('checks matching pairs and ordering', () => {
    const pairs = [
      opt('Monitor', { groupKey: 'left', matchKey: 'm' }),
      opt('Shows', { groupKey: 'right', matchKey: 'm' }),
      opt('Mouse', { groupKey: 'left', matchKey: 'x' }),
      opt('Clicks', { groupKey: 'right', matchKey: 'y' }),
    ];
    expect(validateQuestion(q({ kind: 'matching', options: pairs }))).toContain(
      '“Mouse” needs exactly one partner with the same match key.',
    );
    expect(
      validateQuestion(
        q({
          kind: 'ordering',
          options: [opt('a', { correctOrder: 1 }), opt('b', { correctOrder: 3 })],
        }),
      ),
    ).toEqual(['Number the correct order 1, 2, 3… with no gaps.']);
  });

  it('never allows the answer in public data', () => {
    const problems = validateQuestion(
      q({
        kind: 'cell_select',
        config: { answer: 'B2' },
        publicConfig: { grid: { rows: [['a']] }, answer: 'B2' },
      }),
    );
    expect(problems).toContain('Public data is shown to students: it must not contain the answer.');
  });

  it('rejects unknown kinds', () => {
    expect(validateQuestion(q({ kind: 'telepathy' }))).toEqual([
      'Unknown question kind "telepathy".',
    ]);
  });

  it('every seeded question passes the same check the admin editor uses', () => {
    let checked = 0;
    for (const lesson of ALL_LESSONS) {
      for (const activity of lesson.activities) {
        for (const question of activity.questions ?? []) {
          const input = questionInputSchema.parse(question);
          expect(validateQuestion(input), `${lesson.slug}: ${question.prompt.en}`).toEqual([]);
          checked += 1;
        }
      }
    }
    expect(checked).toBeGreaterThan(600);
  });
});
