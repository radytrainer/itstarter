import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, screen, within } from '@testing-library/react';
import type { EngagementDay, LessonStats } from '@itstarter/shared';
import { renderWithIntl as render } from './render';
import { BarList, DailyChart, LessonRanking } from '../src/components/admin/analytics';

afterEach(cleanup);

const day = (date: string, activeStudents: number): EngagementDay => ({
  day: date,
  activeStudents,
  lessonsCompleted: activeStudents,
  activitiesCompleted: 0,
  minutes: activeStudents * 10,
  xp: activeStudents * 50,
});

describe('DailyChart', () => {
  const days = [day('2028-03-01', 0), day('2028-03-02', 4), day('2028-03-03', 2)];

  it('describes the chart and offers the same numbers as a table, newest first', () => {
    render(<DailyChart days={days} />);
    expect(screen.getByRole('img').getAttribute('aria-label')).toBe(
      'Active students per day, 1 Mar to 3 Mar',
    );
    const rows = within(screen.getByRole('table')).getAllByRole('row');
    expect(rows).toHaveLength(4); // header + 3 days
    expect([...rows[1]!.children].map((c) => c.textContent)).toEqual([
      '3 Mar',
      '2',
      '2',
      '20',
      '100',
    ]);
  });

  it('scales the tallest day to full height', () => {
    const { container } = render(<DailyChart days={days} />);
    const heights = [...container.querySelectorAll<HTMLElement>('[role=img] > span')].map(
      (bar) => bar.style.height,
    );
    expect(heights).toEqual(['1%', '100%', '50%']);
  });
});

describe('BarList', () => {
  it('shows each label with its number, bars relative to the largest', () => {
    const { container } = render(
      <BarList
        bars={[
          { key: 'a', label: 'Not started', value: 1, display: '1 student' },
          { key: 'b', label: '1–25%', value: 4, display: '4 students' },
        ]}
      />,
    );
    expect(screen.getByText('Not started')).toBeTruthy();
    expect(screen.getByText('4 students')).toBeTruthy();
    const widths = [...container.querySelectorAll<HTMLElement>('li span[aria-hidden] > span')].map(
      (b) => b.style.width,
    );
    expect(widths).toEqual(['25%', '100%']);
  });
});

describe('LessonRanking', () => {
  const lesson: LessonStats = {
    lessonId: 'l1',
    slug: 'number-patterns',
    title: { en: 'Number Patterns', km: 'លំនាំលេខ' },
    worldTitle: { en: 'Brain Playground' },
    started: 5,
    completed: 3,
    finishRate: 60,
    averageScore: 72,
    averageMinutes: 6,
  };

  it('shows students finished or the average score', () => {
    render(<LessonRanking title="Most completed" lessons={[lesson]} show="completed" />);
    expect(screen.getByText('3 students')).toBeTruthy();
    cleanup();
    render(<LessonRanking title="Hardest" lessons={[lesson]} show="score" />);
    expect(screen.getByText('72%')).toBeTruthy();
  });

  it('says so when there is nothing to rank, in Khmer too', () => {
    render(<LessonRanking title="Hardest" lessons={[]} show="score" />, 'km');
    expect(screen.getByText('មិនទាន់មានទិន្នន័យសម្រាប់រយៈពេលនេះទេ។')).toBeTruthy();
  });
});
