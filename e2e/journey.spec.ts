import { expect, test } from '@playwright/test';
import {
  expectNoHorizontalScroll,
  finishLesson,
  login,
  playWordsToKnow,
  setLanguage,
} from './helpers';

/**
 * The core student journey from the brief, in a real (mobile-emulated) browser:
 * login → dashboard → world → lesson → activity (a wrong answer shows the right one) → reward with XP
 * → progress updated.
 * Uses the seeded demo student; works whether or not the lesson was finished before.
 */
test.beforeEach(() => test.slow()); // long lessons; may wait out the answer rate limit

test('student completes "Number Patterns" from the dashboard', async ({ page }) => {
  await setLanguage(page, 'en');
  await login(page);

  // Dashboard
  await expect(page.getByRole('heading', { name: /Hi, E2E Tester/ })).toBeVisible();
  const xpBefore = Number(
    (await page
      .getByText(/^\d+ XP$/)
      .first()
      .textContent())!.replace(/\D/g, ''),
  );

  // World → lesson
  await page
    .getByRole('link', { name: /Math Playground/ })
    .first()
    .click();
  await expect(page.getByRole('heading', { name: 'Math Playground' })).toBeVisible();
  await expectNoHorizontalScroll(page);
  await page.getByRole('link', { name: /Number Patterns/ }).click();

  // Welcome → Learn → See → Words to know (match the Khmer meanings, then listen and spell)
  await page.getByRole('button', { name: /Let's go!/ }).click();
  await page.getByRole('button', { name: /^Next/ }).click();
  await expect(page.getByText('3 → 6 → 9 → 12 → 15')).toBeVisible();
  await page.getByRole('button', { name: /^Next/ }).click();
  await playWordsToKnow(page);

  // A wrong answer → the right answer and why, straight away (never "wrong"), then Next
  await expect(page.getByText('Question 1 of 8')).toBeVisible();
  await expect(page.getByRole('heading', { name: '2 → 4 → 6 → 8 → ?' })).toBeVisible();
  await page.getByRole('radio', { name: '9' }).click();
  await page.getByRole('button', { name: 'Check' }).click();
  await expect(page.getByText('The answer is: 10')).toBeVisible();
  await expect(page.getByText('8 + 2 = 10')).toBeVisible();
  await expect(page.getByRole('button', { name: /Try again/ })).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText(/wrong|failed/i);
  await expectNoHorizontalScroll(page);
  await page.getByRole('button', { name: /^Next/ }).click();

  // A right answer
  await page.getByRole('radio', { name: '40' }).click();
  await page.getByRole('button', { name: 'Check' }).click();
  await expect(page.getByText('30 + 10 = 40')).toBeVisible();
  await page.getByRole('button', { name: /^Next/ }).click();

  // …and the rest of the 16 questions (typed answers accept spaces: " 25 ")
  await finishLesson(page);

  // Reward
  await expect(page.getByRole('heading', { name: 'Lesson complete!' })).toBeVisible();
  await expect(page.getByText(/\+100 XP|already finished this lesson/)).toBeVisible();
  await expect(page.getByRole('link', { name: /Next lesson/ })).toBeVisible();

  // Back home: progress and XP updated
  await page
    .getByRole('link', { name: /^Home$/ })
    .last()
    .click();
  await expect(page.getByRole('heading', { name: /Hi, E2E Tester/ })).toBeVisible();
  const xpAfter = Number(
    (await page
      .getByText(/^\d+ XP$/)
      .first()
      .textContent())!.replace(/\D/g, ''),
  );
  expect(xpAfter).toBeGreaterThanOrEqual(Math.max(xpBefore, 75));
  await expect(page.getByText(/\d+ of 180 lessons/)).toBeVisible();
});

test('the lesson player works in Khmer', async ({ page }) => {
  await setLanguage(page, 'km');
  await login(page);
  await page.goto('/');
  await page
    .getByRole('link', { name: /សួនលេងគណិតវិទ្យា/ })
    .first()
    .click();
  await page.getByRole('link', { name: /គណិតលុយ/ }).click();
  await expect(page.getByRole('button', { name: /តោះចាប់ផ្តើម!/ })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'km');
  await expectNoHorizontalScroll(page);
});
