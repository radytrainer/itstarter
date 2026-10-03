import { expect, test, type Locator, type Page } from '@playwright/test';
import { E2E_PASSWORD, E2E_USERS } from './accounts';

export const ACCOUNTS = {
  student: { username: 'student.demo', password: 'Student#2028dev' },
  teacher: { username: 'teacher.demo', password: 'Teacher#2028dev' },
  admin: { username: 'admin', password: 'Admin#2028dev' },
} as const;

/** The widths the brief asks us to check (px). */
export const WIDTHS = [320, 375, 390, 430, 768, 1024, 1440] as const;

export async function setLanguage(page: Page, locale: 'en' | 'km') {
  const url = new URL(
    page.url() === 'about:blank'
      ? (process.env.E2E_BASE_URL ?? 'http://localhost:8088')
      : page.url(),
  );
  await page
    .context()
    .addCookies([{ name: 'NEXT_LOCALE', value: locale, domain: url.hostname, path: '/' }]);
}

/**
 * Logs in. Default: this browser project's own fresh test student.
 * Pass 'student' for the seeded demo student (read-only checks only).
 */
export async function login(
  page: Page,
  who: keyof typeof ACCOUNTS | 'tester' | 'layout' = 'tester',
) {
  const { username, password } =
    who === 'layout'
      ? { username: E2E_USERS.layout, password: E2E_PASSWORD }
      : who === 'tester'
        ? {
            username: E2E_USERS[test.info().project.name as keyof typeof E2E_USERS],
            password: E2E_PASSWORD,
          }
        : ACCOUNTS[who];
  await page.goto('/login');
  await page.getByLabel(/username|ឈ្មោះអ្នកប្រើ/i).fill(username);
  await page.getByLabel(/^(password|ពាក្យសម្ងាត់)$/i).fill(password);
  await page.getByRole('button', { name: /^(log in|ចូលគណនី)$/i }).click();
  await page.waitForURL((url) => !url.pathname.startsWith('/login'));
}

/** Fails if the page scrolls sideways (the most common mobile layout bug). */
export async function expectNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - doc.clientWidth;
  });
  expect(overflow, 'page should not scroll horizontally').toBeLessThanOrEqual(0);
}

/** Next number of an arithmetic (+d) or geometric (×r) sequence like "3 → 6 → 9 → 12 → ?". */
export function nextInSequence(prompt: string): number | null {
  const n = (prompt.match(/-?\d+/g) ?? []).map(Number);
  if (n.length < 3) return null;
  const d = n[1]! - n[0]!;
  if (n.every((x, i) => i === 0 || x - n[i - 1]! === d)) return n.at(-1)! + d;
  const r = n[1]! / n[0]!;
  if (n.every((x, i) => i === 0 || x / n[i - 1]! === r)) return n.at(-1)! * r;
  return null;
}

type Solver = (prompt: string) => number | null;

/** Memory cards: try pairs until every card stays face up (the game then checks itself). */
async function solveMemory(page: Page) {
  const faceDown = page.getByRole('button', { name: /, face down$/ });
  for (let round = 0; round < 20 && (await faceDown.count()) > 0; round += 1) {
    const names = await Promise.all(
      (await faceDown.all()).map(async (card) => (await card.getAttribute('aria-label'))!),
    );
    for (const other of names.slice(1)) {
      await page.getByRole('button', { name: names[0], exact: true }).click();
      await page.getByRole('button', { name: other, exact: true }).click();
      await page.waitForTimeout(1_200); // a wrong pair turns back after 1 s
      if ((await page.getByRole('button', { name: names[0], exact: true }).count()) === 0) break;
    }
  }
}

/**
 * Plays one move of a game (they check themselves). Games can be replayed: after two tries the
 * right answer is shown, and Check then sends it.
 */
async function playGame(page: Page): Promise<boolean> {
  const still = page.getByRole('button', { name: 'Play without moving items' });
  if (await still.isVisible()) {
    await still.click();
    await page.getByRole('button', { name: /Done/ }).click();
    return true;
  }
  if (
    await page
      .getByRole('button', { name: /, face down$/ })
      .first()
      .isVisible()
  ) {
    await solveMemory(page);
    return true;
  }
  const run = page.getByRole('button', { name: /▶ Run/ });
  if ((await run.isVisible()) && (await run.isEnabled())) {
    await run.click();
    return true;
  }
  const up = page.getByRole('button', { name: 'Move up' });
  if ((await up.isVisible()) && (await up.isEnabled())) {
    await up.click();
    await run.click();
    return true;
  }
  return false;
}

/**
 * Gives SOME answer to the question on screen, then Check and Next. Quiz lessons show the right
 * answer after Check and accept any answer; games (and other "try again" questions) are tried
 * until the answer is shown, then Check sends it. Handles choices (also prompt-builder parts),
 * typed numbers and words, letter tiles, the on-screen keyboard and the four games.
 */
async function answerOne(page: Page, solve: Solver) {
  for (const group of await page.getByRole('radiogroup').all()) {
    if ((await group.getByRole('radio', { checked: true }).count()) === 0) {
      await group.getByRole('radio').first().click();
    }
  }
  const input = page.getByLabel('Your answer', { exact: true });
  if ((await input.count()) > 0) {
    const prompt = (await page.getByRole('heading', { level: 2 }).textContent()) ?? '';
    await input.fill(String(solve(prompt.trim()) ?? 0));
  }
  const typed = page.getByLabel('Type your answer', { exact: true });
  if ((await typed.count()) > 0 && !(await typed.inputValue())) await typed.fill('x');
  const tiles = page.getByRole('group', { name: 'Your word' });
  if ((await tiles.count()) > 0 && (await page.getByText('Tap the tiles below…').isVisible())) {
    await tiles.locator('xpath=following-sibling::div[1]//button').first().click();
  }
  // Matching: pair each unpaired left item with an unpaired right item (paired ones show a number).
  const lists = page.locator('article ul');
  if (
    (await page.getByText('Tap an item on the left, then tap its match on the right.').count()) > 0
  ) {
    const freeLeft = lists.nth(0).locator('button:not([aria-label])');
    for (let i = 0; i < 12 && (await freeLeft.count()) > 0; i += 1) {
      await freeLeft.first().click();
      await lists.nth(1).locator('button:enabled:not(:has(span[aria-hidden]))').first().click();
    }
  }
  // Sorting into groups: tap each item, then the first group.
  const toSort = page.getByRole('region', { name: 'Items to sort' });
  for (let i = 0; i < 12 && (await toSort.getByRole('button').count()) > 0; i += 1) {
    await toSort.getByRole('button').first().click();
    await page.locator('[data-drop] > button:enabled').first().click();
  }
  const check = page.getByRole('button', { name: /^(Check|Try again)$/ });
  const ctrl = page.getByRole('button', { name: 'Ctrl', exact: true });
  if ((await check.count()) > 0 && (await check.isDisabled()) && (await ctrl.count()) > 0) {
    await ctrl.click();
  }
  const next = page.getByRole('button', { name: /^Next/ });
  const limited = page.getByText(/Too many tries/);
  // A robot answers far faster than a student: the API allows 60 answers a minute per student,
  // so if we hit that limit, wait and try again.
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (await next.isVisible()) return next.click();
    if (await limited.isVisible()) {
      await page.waitForTimeout(3_000);
    }
    if ((await check.isVisible()) && (await check.isEnabled())) {
      await check.click();
    } else if (!(await playGame(page))) {
      await page.waitForTimeout(300);
      continue;
    }
    // Let the answer (or a robot run) come back before looking again.
    await page.waitForTimeout(600);
  }
  throw new Error('Could not answer the question on screen');
}

/** Answers questions until `stop` appears (e.g. the keyboard, a form, the reward screen). */
export async function answerUntil(page: Page, stop: Locator, solve: Solver = nextInSequence) {
  for (let i = 0; i < 60; i += 1) {
    await expect(
      page
        .getByRole('button', { name: /^(Check|Try again)$/ })
        .or(page.getByText(/Play the game above/))
        .or(stop)
        .first(),
    ).toBeVisible();
    if (await stop.first().isVisible()) return;
    await answerOne(page, solve);
  }
  throw new Error('Never reached the expected step');
}

/** Plays the "Words to know" round after the example: memory cards, then listen and spell. */
export async function playWordsToKnow(page: Page) {
  const round = page.getByRole('heading', { level: 1, name: 'Words to know' });
  await expect(round).toBeVisible();
  for (let i = 0; i < 4 && (await round.isVisible()); i += 1) {
    await answerOne(page, nextInSequence);
    await page.waitForTimeout(300);
  }
  await expect(round).toHaveCount(0);
}

/** Answers every remaining question until the reward screen. */
export async function finishLesson(page: Page, solve: Solver = nextInSequence) {
  await answerUntil(page, page.getByRole('heading', { name: 'Lesson complete!' }), solve);
}
