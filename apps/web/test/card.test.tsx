import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import type { PlayActivity } from '@itstarter/shared';
import { renderWithIntl as render } from './render';
import { Card } from '../src/components/ui/card';
import { SeeExample } from '../src/components/learning/content-steps';

afterEach(cleanup);

const classesOf = (text: string) => screen.getByText(text).closest('div')!.className.split(/\s+/);

describe('Card colours', () => {
  it('is white with a grey border by default', () => {
    render(<Card>Plain</Card>);
    expect(classesOf('Plain')).toEqual(expect.arrayContaining(['bg-surface', 'border-line']));
  });

  it('uses only the caller’s colours when given (never white on white)', () => {
    render(<Card className="bg-slate-900 text-white">Dark</Card>);
    const dark = classesOf('Dark');
    expect(dark).toContain('bg-slate-900');
    expect(dark).not.toContain('bg-surface');

    render(<Card className="border-2 border-amber-300 bg-amber-50">Amber</Card>);
    const amber = classesOf('Amber');
    expect(amber).not.toContain('bg-surface');
    expect(amber).not.toContain('border-line');

    // border width alone keeps the default border colour
    render(<Card className="border-2">Thick</Card>);
    expect(classesOf('Thick')).toContain('border-line');
  });
});

describe('See step', () => {
  it('shows the worked example on a dark card', () => {
    const activity = {
      id: 'a',
      step: 'see',
      type: 'see_example',
      title: null,
      config: {
        example: '47 + 25 = 40 + 20 + 7 + 5 = 72',
        explanation: { en: 'Split numbers into tens and ones to add them easily.' },
      },
      isScored: false,
      xpReward: 0,
      position: 3,
      questions: [],
    } as PlayActivity;
    render(<SeeExample activity={activity} locale="en" />);
    const card = screen.getByText('47 + 25 = 40 + 20 + 7 + 5 = 72').closest('div')!;
    expect(card.className).toContain('bg-slate-900');
    expect(card.className).toContain('text-white');
    expect(card.className).not.toContain('bg-surface');
  });
});
