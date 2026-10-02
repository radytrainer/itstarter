import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithIntl as render } from './render';
import { ChangePasswordForm } from '../src/components/change-password-form';

const router = { replace: vi.fn(), refresh: vi.fn() };
vi.mock('next/navigation', () => ({ useRouter: () => router }));

const fetchMock = vi.fn();
beforeEach(() => vi.stubGlobal('fetch', fetchMock));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
  router.replace.mockReset();
});

const type = (label: string, value: string) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
const saveButton = () =>
  screen.getByRole('button', { name: 'Save new password' }) as HTMLButtonElement;

describe('ChangePasswordForm', () => {
  it('explains the rules while typing and blocks a weak password', () => {
    render(<ChangePasswordForm username="sokha" />);
    type('Current password', 'temp-pass-1234');

    type('New password', 'short');
    expect(screen.getByText('Use at least 8 characters.')).toBeTruthy();
    expect(saveButton().disabled).toBe(true);

    type('New password', 'Sokha');
    expect(screen.getByText(/Use at least 8 characters\./)).toBeTruthy();

    type('New password', 'temp-pass-1234');
    expect(screen.getByText('Choose something different from your old password.')).toBeTruthy();

    type('New password', 'blue-mango-river');
    expect(saveButton().disabled).toBe(false);
  });

  it('saves and goes home', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true, data: { user: {} } })),
    );
    render(<ChangePasswordForm username="sokha" />);
    type('Current password', 'temp-pass-1234');
    type('New password', 'blue-mango-river');
    fireEvent.click(saveButton());

    await waitFor(() => expect(router.replace).toHaveBeenCalledWith('/'));
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('/api/auth/change-password');
    expect(JSON.parse(init.body)).toEqual({
      currentPassword: 'temp-pass-1234',
      newPassword: 'blue-mango-river',
    });
  });

  it('shows the API message when the current password is wrong', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'INVALID_CURRENT_PASSWORD',
            message: 'ignored: the app shows its own translation',
          },
        }),
      ),
    );
    render(<ChangePasswordForm username="sokha" />);
    type('Current password', 'oops');
    type('New password', 'blue-mango-river');
    fireEvent.click(saveButton());
    expect((await screen.findByRole('alert')).textContent).toContain(
      'Your current password is not right.',
    );
  });
});
