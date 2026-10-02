import { expect, test } from '@playwright/test';
import { answerUntil, expectNoHorizontalScroll, finishLesson, login, setLanguage } from './helpers';

/**
 * English for Beginners, a game round in a real browser, and the student's "My progress" page
 * (with the time and answers just recorded). Staff then see the same student's commitment.
 */
test.beforeEach(() => test.slow()); // a whole lesson; may wait out the answer rate limit

test('English lesson with 🔊, a game round, then “My progress” shows it', async ({ page }) => {
  await setLanguage(page, 'en');
  await login(page);

  await page
    .getByRole('link', { name: /English for Beginners/ })
    .first()
    .click();
  await expect(page.getByRole('heading', { name: 'English for Beginners' })).toBeVisible();
  await page.getByRole('link', { name: /Hello & Goodbye/ }).click();

  await page.getByRole('button', { name: /Let's go!/ }).click();
  // Vocabulary cards can be read aloud (the browser's own voice).
  await expect(page.getByRole('button', { name: 'Listen' }).first()).toBeVisible();
  await page.getByRole('button', { name: /^Next/ }).click();
  await page.getByRole('button', { name: /^Next/ }).click();

  // Quiz questions until the game round.
  await answerUntil(page, page.getByRole('heading', { name: 'Game time' }));
  await expect(page.getByText(/Find the English and Khmer pairs/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Card 1, face down' })).toBeVisible();
  await expectNoHorizontalScroll(page);
  // No Check button while a game is being played: it checks itself.
  await expect(page.getByRole('button', { name: 'Check' })).toHaveCount(0);

  await finishLesson(page);
  await expect(page.getByText(/\+\d+ XP/).first()).toBeVisible();

  // My progress
  await page.goto('/progress');
  await expect(page.getByRole('heading', { name: 'My progress' })).toBeVisible();
  await expect(page.getByRole('img', { name: /My learning habit: \d+\/100/ })).toBeVisible();
  await expect(page.getByText(/Learned on [1-9]\d* of the last 28 days/)).toBeVisible();
  await expect(page.getByText(/English for Beginners/).first()).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test('staff see commitment in the progress list and on the student page', async ({ page }) => {
  test.skip(test.info().project.name !== 'android', 'one browser is enough here');
  await setLanguage(page, 'en');
  await login(page, 'admin');
  await page.goto('/admin/progress?sort=commitment');
  await expect(page.getByRole('heading', { name: 'Learning progress' })).toBeVisible();
  const first = page.getByRole('link', { name: 'E2E Tester' }).filter({ visible: true }).first();
  await first.click();
  await expect(page.getByRole('heading', { name: 'Performance & commitment' })).toBeVisible();
  await expect(page.getByRole('img', { name: /Commitment: \d+\/100/ })).toBeVisible();
  await expect(page.getByText(/targets: 12 days/)).toBeVisible();
  await expectNoHorizontalScroll(page);
});
