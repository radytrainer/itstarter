import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { renderWithIntl as render } from './render';
import { RegisterForm } from '../src/components/register-form';

const replace = vi.fn();
const refresh = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace, refresh }) }));

const fetchMock = vi.fn();
beforeEach(() => vi.stubGlobal('fetch', fetchMock));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
  replace.mockReset();
});

const field = (name: RegExp) => screen.getByLabelText(name, { selector: 'input' });
const submit = () => screen.getByRole('button', { name: 'Create my account' });

describe('RegisterForm', () => {
  it('explains problems while typing and only then allows sending', () => {
    render(<RegisterForm />);
    expect(submit()).toHaveProperty('disabled', true);

    fireEvent.change(field(/Your name/), { target: { value: 'Sokha' } });
    // Typed with capitals and spaces: becomes a clean username.
    fireEvent.change(field(/Choose a username/), { target: { value: 'Sokha Chan' } });
    expect((field(/Choose a username/) as HTMLInputElement).value).toBe('sokhachan');

    fireEvent.change(field(/Choose a username/), { target: { value: 'admin' } });
    expect(screen.getByText(/That username is reserved/)).toBeTruthy();

    fireEvent.change(field(/Choose a username/), { target: { value: 'sokha.chan' } });
    fireEvent.change(field(/Choose a password/), { target: { value: 'short' } });
    expect(screen.getByText(/Use at least 8 characters/)).toBeTruthy();
    expect(submit()).toHaveProperty('disabled', true);

    fireEvent.change(field(/Choose a password/), { target: { value: 'blue-mango-river' } });
    expect(submit()).toHaveProperty('disabled', false);
  });

  it('creates the account, then goes to the dashboard; server problems are shown kindly', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: false,
          error: { code: 'USERNAME_TAKEN', message: 'taken' },
        }),
      ),
    );
    render(<RegisterForm />);
    fireEvent.change(field(/Your name/), { target: { value: 'Sokha' } });
    fireEvent.change(field(/Choose a username/), { target: { value: 'sokha.chan' } });
    fireEvent.change(field(/Choose a password/), { target: { value: 'blue-mango-river' } });
    fireEvent.click(submit());
    expect(
      await screen.findByText('That username is already taken. Try another one.'),
    ).toBeTruthy();

    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true, data: { user: { id: 'u' } } })),
    );
    fireEvent.change(field(/Choose a username/), { target: { value: 'sokha.chan2' } });
    fireEvent.click(submit());
    await vi.waitFor(() => expect(replace).toHaveBeenCalledWith('/'));

    const [url, init] = fetchMock.mock.calls.at(-1)!;
    expect(url).toBe('/api/auth/register');
    expect(JSON.parse(init.body)).toEqual({
      displayName: 'Sokha',
      username: 'sokha.chan2',
      password: 'blue-mango-river',
      locale: 'en',
    });
  });

  it('hides the bot trap from people (not focusable, not announced)', () => {
    const { container } = render(<RegisterForm />);
    const trap = container.querySelector('input[name="website"]')!;
    expect(trap.getAttribute('tabindex')).toBe('-1');
    expect(trap.closest('[aria-hidden="true"]')).not.toBeNull();
  });
});
