import { test } from '@playwright/test';
import { expectNoHorizontalScroll, login, setLanguage, WIDTHS } from './helpers';

// Mobile-first check: every main page, every width from the brief, both languages.
// Screenshots go to e2e/screenshots/ for a human look (git-ignored).

const PUBLIC_PAGES = ['/login'];
const STUDENT_PAGES = process.env.E2E_PAGES?.split(',') ?? ['/'];

test.describe('layout at every width', () => {
  test.beforeEach(() => {
    test.skip(test.info().project.name !== 'android', 'one device is enough');
  });

  for (const locale of ['en', 'km'] as const) {
    test(`public pages (${locale})`, async ({ page }) => {
      await setLanguage(page, locale);
      for (const path of PUBLIC_PAGES) {
        for (const width of WIDTHS) {
          await page.setViewportSize({ width, height: 900 });
          await page.goto(path);
          await expectNoHorizontalScroll(page);
          await page.screenshot({
            path: `e2e/screenshots/${locale}${path.replaceAll('/', '_') || '_home'}-${width}.png`,
            fullPage: true,
          });
        }
      }
    });

    test(`signed-in pages (${locale})`, async ({ page }) => {
      await setLanguage(page, locale);
      await login(page);
      for (const path of STUDENT_PAGES) {
        for (const width of WIDTHS) {
          await page.setViewportSize({ width, height: 900 });
          await page.goto(path);
          await expectNoHorizontalScroll(page);
          await page.screenshot({
            path: `e2e/screenshots/${locale}${path === '/' ? '_home' : path.replaceAll('/', '_')}-${width}.png`,
            fullPage: true,
          });
        }
      }
    });
  }
});
