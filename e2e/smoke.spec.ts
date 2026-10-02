import { expect, test } from '@playwright/test';

/**
 * Smoke test of a DEPLOYED site (staging or production), run after every deploy:
 *   E2E_BASE_URL=https://itstarter.store SMOKE_ADMIN_PASSWORD=… npm run test:smoke
 * Read-only: it signs in as the admin and opens pages, but changes nothing.
 * EXPECT_VERSION (optional) must match the version the site reports.
 */
const base = process.env.E2E_BASE_URL ?? 'http://localhost:8088';
const https = base.startsWith('https://');
const admin = {
  username: process.env.SMOKE_ADMIN_USERNAME ?? 'admin',
  password: process.env.SMOKE_ADMIN_PASSWORD ?? 'Admin#2028dev',
};

test('the site is up, on the expected version, with its security headers', async ({ request }) => {
  const health = await request.get('/api/health');
  expect(health.ok()).toBe(true);
  const { version } = (await health.json()).data;
  if (process.env.EXPECT_VERSION) expect(version).toBe(process.env.EXPECT_VERSION);
  expect((await request.get('/api/health/ready')).ok()).toBe(true);

  const page = await request.get('/login');
  expect(page.ok()).toBe(true);
  const headers = page.headers();
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['server']).toBe('nginx'); // no version number
  if (https) expect(headers['strict-transport-security']).toMatch(/max-age=\d+/);
});

test('plain http is sent to https', async ({ request }) => {
  test.skip(
    !https || !process.env.SMOKE_HTTP_URL,
    'set SMOKE_HTTP_URL (e.g. http://itstarter.store)',
  );
  const res = await request.get(`${process.env.SMOKE_HTTP_URL}/login`, { maxRedirects: 0 });
  expect(res.status()).toBe(301);
  expect(res.headers()['location']).toBe(`${base}/login`);
});

test('the admin can sign in (secure cookie) and every admin page works', async ({ page }) => {
  const blocked: string[] = [];
  page.on('console', (msg) => {
    if (/Content Security Policy|Refused to/i.test(msg.text())) blocked.push(msg.text());
  });
  page.on('pageerror', (err) => blocked.push(err.message));

  await page.goto('/login');
  await page.getByLabel(/username|ឈ្មោះអ្នកប្រើ/i).fill(admin.username);
  await page.getByLabel(/^(password|ពាក្យសម្ងាត់)$/i).fill(admin.password);
  await page.getByRole('button', { name: /^(log in|ចូលគណនី)$/i }).click();
  await page.waitForURL((url) => !url.pathname.startsWith('/login'));

  const session = (await page.context().cookies()).find((c) => c.name.endsWith('its_session'));
  expect(session).toMatchObject({ httpOnly: true, sameSite: 'Lax' });
  if (https) expect(session!.secure).toBe(true);

  for (const path of ['/admin', '/admin/progress', '/admin/analytics', '/admin/content']) {
    const res = await page.goto(path);
    expect(res!.ok(), path).toBe(true);
    await expect(page.locator('h1').first()).toBeVisible();
  }
  expect(blocked).toEqual([]);
});
