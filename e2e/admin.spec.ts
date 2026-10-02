import { expect, test, type Page } from '@playwright/test';
import { expectNoHorizontalScroll, login, setLanguage, WIDTHS } from './helpers';

// Admin dashboard (Phase 13), in a real mobile browser. One device is enough for these.
test.beforeEach(async ({ page }) => {
  test.skip(test.info().project.name !== 'android', 'admin flows run once');
  await setLanguage(page, 'en');
});

async function csrfPatch(page: Page, url: string, data: object) {
  return page.request.patch(url, { data, headers: { 'x-requested-with': 'itstarter' } });
}

test('admin imports students; a new student logs in and must choose a password', async ({
  page,
  browser,
}) => {
  await login(page, 'admin');
  await page.goto('/admin/students/import');
  const stamp = Date.now().toString(36);
  await page
    .getByLabel('Or paste here')
    .fill(
      `username,display name,class\ne2e.imp${stamp}a,Import Alpha,Generation 2028 – Class A\ne2e.imp${stamp}b,"Chan, Import Beta",`,
    );
  await page.getByRole('button', { name: /Check/ }).click();
  await expect(page.getByText('Everything looks good. Ready to import.')).toBeVisible();
  await expectNoHorizontalScroll(page);
  await page.getByRole('button', { name: /Import 2 students/ }).click();
  await expect(page.getByText('2 students were created.')).toBeVisible();

  const row = page.getByRole('row').filter({ hasText: `e2e.imp${stamp}a` });
  const password = (await row.locator('td').nth(1).textContent())!.trim();
  expect(password).toMatch(/^[a-z]+-[a-z]+-\d{4}$/);

  // The new student, on their own phone.
  const phone = await browser.newPage();
  await phone.goto('/login');
  await phone.getByLabel('Username').fill(`e2e.imp${stamp}a`);
  await phone.getByLabel('Password', { exact: true }).fill(password);
  await phone.getByRole('button', { name: 'Log in' }).click();
  await expect(phone.getByRole('heading', { name: 'Choose your own password' })).toBeVisible();
  await phone.getByLabel('Current password').fill(password);
  await phone.getByLabel('New password').fill('my-very-own-password');
  await phone.getByRole('button', { name: 'Save new password' }).click();
  await expect(phone.getByRole('heading', { name: /Hi, Import Alpha/ })).toBeVisible();
  await phone.close();

  // …and the admin can open their profile.
  await page.goto(`/admin/students?q=e2e.imp${stamp}a`);
  await page.getByRole('link', { name: /Import Alpha/ }).click();
  await expect(page.getByRole('heading', { name: 'Import Alpha' })).toBeVisible();
  await expect(page.getByText('0/15').first()).toBeVisible();
});

test('admin unpublishes a lesson and students stop seeing it', async ({ page, browser }) => {
  await login(page, 'admin');
  await page.goto('/admin/content');
  await page.getByRole('link', { name: /Logic Playground/ }).click();
  const lessonRow = page.getByRole('listitem').filter({ hasText: 'Think Step by Step' });
  const statusSelect = lessonRow.getByRole('combobox');
  const lessonHref = await lessonRow.getByRole('link').getAttribute('href');
  const lessonId = lessonHref!.split('/').pop()!;

  try {
    // Wait for the save itself, not just the menu changing.
    await Promise.all([
      page.waitForResponse(
        (r) =>
          r.url().includes(`/api/admin/lessons/${lessonId}`) &&
          r.request().method() === 'PATCH' &&
          r.ok(),
      ),
      statusSelect.selectOption('draft'),
    ]);
    await expect(statusSelect).toHaveValue('draft');

    const student = await browser.newPage();
    await setLanguage(student, 'en');
    await login(student);
    await student
      .getByRole('link', { name: /Logic Playground/ })
      .first()
      .click();
    await expect(student.getByRole('heading', { name: 'Logic Playground' })).toBeVisible();
    await expect(student.getByRole('heading', { name: 'Think Step by Step' })).toHaveCount(0);
    await expect(student.getByText('0 of 14 lessons')).toBeVisible();
    await student.close();
  } finally {
    await csrfPatch(page, `/api/admin/lessons/${lessonId}`, { status: 'published' });
  }

  // The lesson editor shows every step of the lesson (6 steps + the game round on a fresh install).
  const lesson = (await (await page.request.get(`/api/admin/lessons/${lessonId}`)).json()).data as {
    activities: unknown[];
  };
  expect(lesson.activities.length).toBeGreaterThanOrEqual(6);
  await page.goto(`/admin/content/lessons/${lessonId}`);
  await expect(page.getByRole('heading', { name: 'Lesson settings' })).toBeVisible();
  await expect(page.locator('details')).toHaveCount(lesson.activities.length);
});

test('a teacher sees only their class and cannot open admin-only pages', async ({ page }) => {
  await login(page, 'teacher');
  await page.goto('/admin');
  await expect(page.getByRole('link', { name: /Content/ })).toHaveCount(0);
  await page.goto('/admin/students');
  await expect(page.getByText('@student.demo')).toBeVisible();
  await expect(page.getByRole('link', { name: /Add student/ })).toHaveCount(0);
  await page.goto('/admin/content');
  await expect(page).toHaveURL(/\/admin$/);
});

test('analytics: a teacher filters by period; every section fits a 320px phone', async ({
  page,
}) => {
  await login(page, 'teacher');
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/admin');
  await page.getByRole('link', { name: /Analytics/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Analytics' })).toBeVisible();

  await page.getByLabel('Period').selectOption('30');
  await page.getByRole('button', { name: /Filter/ }).click();
  await expect(page).toHaveURL(/days=30/);
  await expect(page.getByRole('img', { name: /Active students per day/ })).toBeVisible();
  await expect(page.getByLabel('Period')).toHaveValue('30');
  // Teachers can't edit lessons, so no edit links.
  await expect(page.getByRole('link', { name: 'Edit lesson' })).toHaveCount(0);

  // Open every "show more" section (lesson lists, the table) — still no sideways scrolling.
  for (const summary of await page.locator('summary').all()) await summary.click();
  await expectNoHorizontalScroll(page);
  await page.screenshot({ path: 'e2e/screenshots/admin_analytics-open-320.png', fullPage: true });

  await setLanguage(page, 'km');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'ការវិភាគ' })).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test('learning progress: a teacher sees, sorts and downloads their class', async ({ page }) => {
  await login(page, 'teacher');
  await page.goto('/admin');
  await page
    .getByRole('link', { name: /Progress/ })
    .first()
    .click();
  await expect(page.getByRole('heading', { level: 1, name: 'Learning progress' })).toBeVisible();
  await expect(page.getByText('Demo Student').filter({ visible: true }).first()).toBeVisible();
  await expect(
    page
      .getByText(/\d+\/105 lessons/)
      .filter({ visible: true })
      .first(),
  ).toBeVisible();

  await page.getByLabel('Sort by').selectOption('progress');
  await page.getByRole('button', { name: /Show/ }).click();
  await expect(page).toHaveURL(/sort=progress/);
  await expect(page.getByText('Sorted by Progress')).toBeVisible();

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('link', { name: /Download CSV/ }).click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/^learning-progress-\d{4}-\d{2}-\d{2}\.csv$/);
  const csv = await (await download.createReadStream()).toArray();
  const text = Buffer.concat(csv).toString('utf8');
  expect(text).toContain('Lessons completed');
  expect(text).toContain('student.demo');
  await page.setViewportSize({ width: 320, height: 800 });
  await expectNoHorizontalScroll(page);
  await page.screenshot({ path: 'e2e/screenshots/admin_progress-320.png', fullPage: true });
});

test('every admin page fits every width', async ({ page }) => {
  test.setTimeout(240_000); // 14 pages × 7 widths
  await login(page, 'admin');
  await page.goto('/admin/students');
  const studentHref = await page.getByRole('link', { name: /Demo Student/ }).getAttribute('href');
  await page.goto('/admin/content');
  const worldHref = await page.getByRole('link', { name: /Math Playground/ }).getAttribute('href');
  await page.goto(worldHref!);
  const lessonHref = await page.getByRole('link', { name: /Number Patterns/ }).getAttribute('href');

  const pages = [
    '/admin',
    '/admin/students',
    studentHref!,
    '/admin/students/import',
    '/admin/content',
    worldHref!,
    lessonHref!,
    '/admin/badges',
    '/admin/staff',
    '/admin/audit',
    '/admin/analytics',
    '/admin/analytics?days=90',
    '/admin/progress',
    '/admin/progress?sort=progress',
  ];
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of pages) {
      await page.goto(path);
      await expectNoHorizontalScroll(page);
      if (width === 320 || width === 1440) {
        await page.screenshot({
          path: `e2e/screenshots/admin${path.replace(/[^a-z0-9-]+/gi, '_').slice(0, 60)}-${width}.png`,
          fullPage: true,
        });
      }
    }
  }
});
