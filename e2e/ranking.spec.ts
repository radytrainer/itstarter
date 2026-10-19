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
  await expect(page.getByRole('heading', { name: /^Top \d+$/ })).toBeVisible();
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
