import { expect, test } from '@playwright/test';
import { login, setLanguage } from './helpers';

// Phase 16: the strict Content-Security-Policy must not break any page, and every HTML page has it.
test.beforeEach(() => {
  test.skip(test.info().project.name !== 'android', 'one browser is enough for these checks');
});

test('every page has a CSP, and nothing on it is blocked', async ({ page }) => {
  const blocked: string[] = [];
  page.on('console', (msg) => {
    if (/Content Security Policy|Refused to (load|execute|apply|connect)/i.test(msg.text()))
      blocked.push(`${page.url()}: ${msg.text().slice(0, 200)}`);
  });
  page.on('pageerror', (err) => blocked.push(`${page.url()}: ${err.message.slice(0, 200)}`));

  await setLanguage(page, 'en');
  const loginPage = await page.goto('/login');
  const policy = loginPage!.headers()['content-security-policy'];
  expect(policy).toMatch(/script-src 'self' 'nonce-[^']+' 'strict-dynamic'/);
  expect(policy).toContain("frame-ancestors 'none'");

  await login(page);
  for (const path of ['/', '/badges', '/profile', '/offline']) {
    const res = await page.goto(path);
    expect(res!.headers()['content-security-policy'], path).toBeTruthy();
  }
  // A lesson (the most interactive page) and the admin area.
  await page.goto('/');
  await page
    .getByRole('link', { name: /Math Playground/ })
    .first()
    .click();
  await page.getByRole('link', { name: /Times Tables/ }).click();
  await expect(page.getByRole('progressbar').first()).toBeVisible();
  // Sign out (fresh cookies), then sign in as the admin.
  await page.context().clearCookies();
  await setLanguage(page, 'en');
  await login(page, 'admin');
  for (const path of ['/admin', '/admin/progress', '/admin/analytics', '/admin/content']) {
    await page.goto(path);
    await expect(page.locator('h1').first()).toBeVisible();
  }
  expect(blocked).toEqual([]);
});

test('the nonce changes on every page load', async ({ request }) => {
  const nonceOf = async () =>
    (await request.get('/login')).headers()['content-security-policy']!.match(/nonce-([^']+)/)![1];
  expect(await nonceOf()).not.toBe(await nonceOf());
});
