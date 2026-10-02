import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, screen, within } from '@testing-library/react';
import { renderWithIntl as render } from './render';
import { StatusList } from '../src/components/status-list';

afterEach(cleanup);

describe('StatusList', () => {
  it('shows a friendly state for each service', () => {
    render(<StatusList status={{ web: 'up', api: 'up', database: 'down', redis: 'unknown' }} />);

    const list = screen.getByRole('list', { name: 'Service status' });
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(4);

    expect(items[0]?.textContent).toContain('Working');
    expect(items[2]?.textContent).toContain('Database (PostgreSQL)');
    expect(items[2]?.textContent).toContain('Not reachable');
    expect(items[3]?.textContent).toContain('Unknown');
  });
});
