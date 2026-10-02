import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { login, setLanguage } from './helpers';

/**
 * Automatic accessibility checks (axe-core, WCAG 2.1 A + AA) on the main student and staff pages,
 * in both languages. Axe finds about a third of real problems (missing names, contrast, ARIA
 * misuse…); keyboard and screen-reader checks stay manual (see docs/TESTING.md).
 */
test.beforeEach(() => {
  test.skip(test.info().project.name !== 'android', 'one browser is enough for these checks');
});

async function expectAccessible(page: Page, name: string) {
  // Cards fade in: measure colours after the animation, not halfway through it.
  await page.waitForFunction(() =>
    document.getAnimations().every((a) => a.playState !== 'running'),
  );
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const problems = results.violations.map(
    (v) =>
      `${name}: [${v.impact}] ${v.id} — ${v.help}\n` +
      v.nodes
        .slice(0, 3)
        .map((n) => `    ${n.target.join(' ')}: ${n.failureSummary?.split('\n')[1]?.trim() ?? ''}`)
        .join('\n'),
  );
  expect(problems, problems.join('\n')).toEqual([]);
}

for (const locale of ['en', 'km'] as const) {
  test(`student pages (${locale})`, async ({ page }) => {
    await setLanguage(page, locale);
    await page.goto('/login');
    await expectAccessible(page, 'login');
    await page.goto('/register');
    await expectAccessible(page, 'register');
    await login(page);
    for (const path of ['/', '/progress', '/badges', '/profile', '/offline']) {
      await page.goto(path);
      await expectAccessible(page, path);
    }
    // A world, and a lesson: welcome, learn cards (with 🔊), a question and a game.
    await page.goto('/');
    await page
      .getByRole('link', { name: /English for Beginners|ភាសាអង់គ្លេស/ })
      .first()
      .click();
    await expectAccessible(page, 'world');
    await page
      .getByRole('link', { name: /The Alphabet|អក្ខរក្រមអង់គ្លេស/ })
      .first()
      .click();
    // A lesson opens where the student left off: the welcome step only the first time.
    const start = page.getByRole('button', { name: /Let's go!|តោះ/ });
    const listen = page.getByRole('button', { name: /^(Listen|ស្តាប់)$/ }).first();
    await expect(start.or(listen).first()).toBeVisible();
    if (await start.isVisible()) {
      await expectAccessible(page, 'lesson: welcome');
      await start.click();
    }
    await expect(listen).toBeVisible();
    await expectAccessible(page, 'lesson: learn');
  });
}

test('lesson questions and games', async ({ page }) => {
  await setLanguage(page, 'en');
  await login(page, 'admin'); // staff preview: every step without answering
  await page.goto('/admin/content');
  await page.getByRole('link', { name: /English for Beginners/ }).click();
  await page.getByRole('link', { name: /Colours & Shapes/ }).click();
  const preview = page.getByRole('link', { name: /Preview/ });
  await page.goto((await preview.getAttribute('href'))!);
  for (let step = 0; step < 12; step += 1) {
    await expectAccessible(page, `preview step ${step + 1}`);
    const next = page.getByRole('button', { name: /^(Let's go!|Next)/ }).last();
    if (!(await next.isVisible())) break;
    await next.click();
  }
});

test('staff pages', async ({ page }) => {
  await setLanguage(page, 'en');
  await login(page, 'admin');
  await page.goto('/admin/students');
  const student = await page.getByRole('link', { name: /Demo Student/ }).getAttribute('href');
  for (const path of [
    '/admin',
    '/admin/students',
    student!,
    '/admin/progress',
    '/admin/analytics',
    '/admin/content',
    '/admin/badges',
    '/admin/staff',
    '/admin/audit',
  ]) {
    await page.goto(path);
    await expectAccessible(page, path);
  }
});
