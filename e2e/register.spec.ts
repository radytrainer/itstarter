import { expect, test } from '@playwright/test';
import { expectNoHorizontalScroll, setLanguage } from './helpers';

// A new student finds "Create a student account" on the login page, signs up, and starts learning.
test.beforeEach(() => {
  test.skip(test.info().project.name !== 'android', 'one browser is enough here');
});

test('a student creates their own account and lands on the dashboard', async ({ page }) => {
  const username = `reg${Date.now()}`;
  await setLanguage(page, 'en');
  await page.goto('/login');
  await page.getByRole('link', { name: 'Create a student account' }).click();
  await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
  await expectNoHorizontalScroll(page);

  await page.getByLabel('Your name').fill('Bopha Keo');
  await page.getByLabel('Choose a username').fill(username);
  await page.getByLabel('Choose a password').fill('short');
  await expect(page.getByText(/Use at least 8 characters/)).toBeVisible();
  await page.getByLabel('Choose a password').fill('green-rice-field');
  await page.getByRole('button', { name: 'Create my account' }).click();

  await expect(page.getByRole('heading', { name: /Hi, Bopha Keo/ })).toBeVisible();
  // Signed in for real: the progress page works, and the login page sends them home.
  await page.goto('/progress');
  await expect(page.getByRole('heading', { name: 'My progress' })).toBeVisible();
  await page.goto('/register');
  await expect(page).toHaveURL(/\/$/);
});
