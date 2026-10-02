import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import { renderWithIntl as render } from './render';

// The PWA store is module-level state: load a fresh copy for every test.
async function load() {
  vi.resetModules();
  const pwa = await import('../src/lib/pwa');
  const ui = await import('../src/components/pwa');
  return { ...pwa, ...ui };
}

function setBrowser({ ua, standalone = false }: { ua: string; standalone?: boolean }) {
  vi.stubGlobal('navigator', { ...navigator, userAgent: ua, maxTouchPoints: 0 });
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: standalone, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  );
  window.matchMedia = globalThis.matchMedia;
}

const ANDROID = 'Mozilla/5.0 (Linux; Android 14; Pixel 7) Chrome/130 Mobile';
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Safari/604.1';

function installEvent(outcome: 'accepted' | 'dismissed') {
  const event = new Event('beforeinstallprompt', { cancelable: true }) as Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: string }>;
  };
  event.prompt = vi.fn(async () => undefined);
  event.userChoice = Promise.resolve({ outcome });
  return event;
}

beforeEach(() => {
  try {
    localStorage.clear();
  } catch {
    // ignore
  }
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('Install the app', () => {
  it('Android/Chrome: shows our button only after the browser offers installation', async () => {
    setBrowser({ ua: ANDROID });
    const { startPwa, InstallApp } = await load();
    startPwa();
    render(<InstallApp variant="card" />);
    expect(screen.queryByRole('button', { name: /Install app/ })).toBeNull();

    const event = installEvent('accepted');
    act(() => {
      window.dispatchEvent(event);
    });
    expect(event.defaultPrevented).toBe(true); // our card instead of the browser's banner
    fireEvent.click(await screen.findByRole('button', { name: /Install app/ }));
    expect(event.prompt).toHaveBeenCalled();
    // Installed: the card goes away.
    await vi.waitFor(() =>
      expect(screen.queryByRole('button', { name: /Install app/ })).toBeNull(),
    );
  });

  it('“Not now” hides the dashboard card and remembers it', async () => {
    setBrowser({ ua: ANDROID });
    const { startPwa, InstallApp } = await load();
    startPwa();
    render(<InstallApp variant="card" />);
    act(() => {
      window.dispatchEvent(installEvent('dismissed'));
    });
    fireEvent.click(await screen.findByRole('button', { name: 'Not now' }));
    expect(screen.queryByRole('button', { name: /Install app/ })).toBeNull();
    expect(localStorage.getItem('its-install-dismissed')).toBe('1');
  });

  it('iPhone: explains Share → Add to Home Screen (Safari has no install dialog)', async () => {
    setBrowser({ ua: IPHONE });
    const { InstallApp } = await load();
    render(<InstallApp variant="panel" />);
    expect(screen.getByText(/tap Share ⬆️, then “Add to Home Screen” ➕/)).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Install app/ })).toBeNull();
  });

  it('already installed: nothing on the dashboard, a short note on the profile (Khmer too)', async () => {
    setBrowser({ ua: ANDROID, standalone: true });
    const { InstallApp } = await load();
    render(<InstallApp variant="card" />);
    expect(screen.queryByRole('heading')).toBeNull();
    cleanup();
    render(<InstallApp variant="panel" />, 'km');
    expect(screen.getByText(/កម្មវិធីត្រូវបានដំឡើង/)).toBeTruthy();
  });

  it('a browser that can’t install shows nothing', async () => {
    setBrowser({ ua: 'Mozilla/5.0 (Windows NT 10.0) Firefox/130' });
    const { InstallApp } = await load();
    const { container } = render(<InstallApp variant="panel" />);
    expect(container.textContent).toBe('');
  });
});
