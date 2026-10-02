import { expect, test, type Page } from '@playwright/test';
import { expectNoHorizontalScroll, login, setLanguage } from './helpers';

// Phase 15: installable app + offline page, in Chromium (the engine of Android's Chrome).
// iPhone Safari can't be automated here; see docs/PWA.md for the manual checklist.
test.beforeEach(() => {
  test.skip(test.info().project.name !== 'android', 'Chromium-only PWA checks');
});

/** Waits until the service worker is active and controls this page. */
async function waitForServiceWorker(page: Page) {
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  if (!(await page.evaluate(() => navigator.serviceWorker.controller !== null))) {
    await page.reload();
  }
  await expect
    .poll(() => page.evaluate(() => navigator.serviceWorker.controller !== null))
    .toBe(true);
}

test('the manifest and icons are served', async ({ request }) => {
  const res = await request.get('/manifest.webmanifest');
  expect(res.ok()).toBe(true);
  const manifest = await res.json();
  expect(manifest).toMatchObject({
    name: 'IT Starter 2028',
    short_name: 'IT Starter',
    start_url: '/',
    display: 'standalone',
    theme_color: '#4f46e5',
  });
  expect(manifest.description).toContain('IT');
  for (const icon of manifest.icons as { src: string; sizes: string; purpose: string }[]) {
    const file = await request.get(icon.src);
    expect(file.ok(), icon.src).toBe(true);
    expect(file.headers()['content-type']).toContain('image/png');
  }
  expect(manifest.icons.some((i: { purpose: string }) => i.purpose === 'maskable')).toBe(true);

  const sw = await request.get('/sw.js');
  expect(sw.headers()['cache-control']).toContain('no-cache');
});

test('Chrome says the app is installable', async ({ page }) => {
  await setLanguage(page, 'en');
  await page.goto('/login');
  await waitForServiceWorker(page);
  const cdp = await page.context().newCDPSession(page);
  const { installabilityErrors } = (await cdp.send('Page.getInstallabilityErrors')) as {
    installabilityErrors: { errorId: string }[];
  };
  expect(installabilityErrors.map((e) => e.errorId)).toEqual([]);

  // Linked from every page, with the iPhone home-screen icon too.
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
    'href',
    '/manifest.webmanifest',
  );
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
});

test('offline: a friendly page in both languages, never an error screen', async ({ page }) => {
  await setLanguage(page, 'en');
  await login(page);
  await waitForServiceWorker(page);

  await page.context().setOffline(true);
  await page.goto('/worlds/00000000-0000-7000-8000-000000000000').catch(() => undefined);
  await expect(page.getByRole('heading', { name: 'You are offline' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'អ្នកមិនមានអ៊ីនធឺណិត' })).toBeVisible();
  // The page is styled from cached CSS (not a bare HTML page).
  const button = page.getByRole('link', { name: /Try again/ });
  await expect(button).toHaveCSS('background-color', 'rgb(79, 70, 229)');
  await expectNoHorizontalScroll(page);
  await page.screenshot({ path: 'e2e/screenshots/pwa-offline.png', fullPage: true });

  // Back online: “Try again” returns to the app.
  await page.context().setOffline(false);
  await button.click();
  await expect(page.getByRole('heading', { name: /Hi, E2E Tester/ })).toBeVisible();
});

test('nothing personal is stored on the device', async ({ page }) => {
  await setLanguage(page, 'en');
  await login(page);
  await waitForServiceWorker(page);
  await page.goto('/profile');
  await page.goto('/');

  const cached = await page.evaluate(async () => {
    const urls: string[] = [];
    for (const name of await caches.keys()) {
      const cache = await caches.open(name);
      for (const request of await cache.keys()) urls.push(new URL(request.url).pathname);
    }
    return urls;
  });
  expect(cached).toContain('/offline');
  expect(cached.some((u) => u.startsWith('/_next/static/'))).toBe(true);
  // Only static files and the offline page — no API answers, no student pages.
  const personal = cached.filter(
    (u) =>
      u.startsWith('/api/') ||
      (!u.startsWith('/_next/static/') &&
        !u.startsWith('/icons/') &&
        !['/offline', '/manifest.webmanifest'].includes(u)),
  );
  expect(personal).toEqual([]);
});
