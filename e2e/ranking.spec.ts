import { expect, test } from '@playwright/test';
import { expectNoHorizontalScroll, login, setLanguage, WIDTHS } from './helpers';

test('students see the ranking and their own place, all time and this week', async ({ page }) => {
  await setLanguage(page, 'en');
  await login(page);
  // From the menu (bottom tab bar on phones).
  await page
    .getByRole('link', { name: /Ranking/ })
    .last()
    .click();
  await expect(page.getByRole('heading', { level: 1, name: /Ranking/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'All time' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(page.getByRole('heading', { name: 'Your place' })).toBeVisible();
  // A place ("You are #3 of 12") or a friendly nudge to earn the first XP — never a "last place".
  await expect(
    page.getByText(/You are #\d+ of \d+|Finish a lesson to join the ranking!/),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: /^All students/ })).toBeVisible();
  // A student with a place can jump straight to their own row.
  const findMe = page.getByRole('link', { name: /Find me in the list/ });
  if (await findMe.isVisible()) {
    await findMe.click();
    await expect(page).toHaveURL(/#me$/);
    await expect(page.locator('#me')).toBeInViewport();
  }
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    await expectNoHorizontalScroll(page);
  }

  await page.getByRole('link', { name: 'This week' }).click();
  await expect(page).toHaveURL(/period=week/);
  await expect(page.getByRole('link', { name: 'This week' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(
    page.getByText(/You are #\d+ of \d+|Earn XP this week to join the ranking!/),
  ).toBeVisible();

  // Khmer too.
  await setLanguage(page, 'km');
  await page.goto('/ranking');
  await expect(page.getByRole('heading', { level: 1, name: /ចំណាត់ថ្នាក់/ })).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test('staff download the ranking as a PDF report and as a CSV file', async ({ page }) => {
  await setLanguage(page, 'en');
  await login(page, 'admin');
  await page.goto('/ranking');
  await expect(page.getByText(/Staff accounts are not ranked/)).toBeVisible();
  await page.getByRole('link', { name: /Export \(PDF \/ Excel\)/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: /Ranking/ })).toBeVisible();
  await expectNoHorizontalScroll(page);

  const pdf = page.waitForEvent('download');
  await page.getByRole('button', { name: /Download PDF/ }).click();
  const file = await pdf;
  expect(file.suggestedFilename()).toMatch(/^student-ranking-all-\d{4}-\d{2}-\d{2}\.pdf$/);

  await page.getByLabel('Period').selectOption('week');
  const csv = page.waitForEvent('download');
  await page.getByRole('button', { name: /Download CSV/ }).click();
  expect((await csv).suggestedFilename()).toMatch(/^student-ranking-week-.*\.csv$/);
});
