import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithIntl as render } from './render';
import { LoginForm } from '../src/components/login-form';

const router = { replace: vi.fn(), refresh: vi.fn() };
vi.mock('next/navigation', () => ({ useRouter: () => router }));

const fetchMock = vi.fn();

function respond(body: unknown) {
  fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(body)));
}

function fillAndSubmit(username: string, password: string) {
  fireEvent.change(screen.getByLabelText('Username'), { target: { value: username } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: password } });
  fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
}

const user = (mustChangePassword: boolean) => ({
  id: '0190f4e6-0000-7000-8000-000000000000',
  username: 'sokha',
  displayName: 'Sokha',
  role: 'STUDENT',
  locale: 'en',
  mustChangePassword,
});

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
  router.replace.mockReset();
  router.refresh.mockReset();
});

describe('LoginForm', () => {
  it('has labelled, phone-friendly fields', () => {
    render(<LoginForm />);
    const username = screen.getByLabelText('Username');
    expect(username.getAttribute('autocomplete')).toBe('username');
    expect(username.getAttribute('autocapitalize')).toBe('none');
    expect(screen.getByLabelText('Password').getAttribute('type')).toBe('password');
  });

  it('can show the password while typing', () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: 'Show' }));
    expect(screen.getByLabelText('Password').getAttribute('type')).toBe('text');
  });

  it('disables the button until both fields are filled', () => {
    render(<LoginForm />);
    const button = screen.getByRole('button', { name: 'Log in' }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'sokha' } });
    expect(button.disabled).toBe(true);
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'x' } });
    expect(button.disabled).toBe(false);
  });

  it('posts to the API with the CSRF header and goes home', async () => {
    respond({ success: true, data: { user: user(false) } });
    render(<LoginForm />);
    fillAndSubmit('sokha', 'secret-123');

    await waitFor(() => expect(router.replace).toHaveBeenCalledWith('/'));
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('/api/auth/login');
    expect(init.method).toBe('POST');
    expect(init.headers['x-requested-with']).toBe('itstarter');
    expect(JSON.parse(init.body)).toEqual({ username: 'sokha', password: 'secret-123' });
  });

  it('sends first-time users to choose a password', async () => {
    respond({ success: true, data: { user: user(true) } });
    render(<LoginForm />);
    fillAndSubmit('sokha', 'temp-pass-1234');
    await waitFor(() => expect(router.replace).toHaveBeenCalledWith('/change-password'));
  });

  it('shows the friendly message from the API', async () => {
    respond({
      success: false,
      error: { code: 'INVALID_CREDENTIALS', message: 'That username or password is not right.' },
    });
    render(<LoginForm />);
    fillAndSubmit('sokha', 'wrong');
    expect((await screen.findByRole('alert')).textContent).toContain(
      'That username or password is not right.',
    );
    expect(router.replace).not.toHaveBeenCalled();
  });

  it('explains a network problem', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    render(<LoginForm />);
    fillAndSubmit('sokha', 'secret');
    expect((await screen.findByRole('alert')).textContent).toMatch(/could not reach the server/);
  });
});
