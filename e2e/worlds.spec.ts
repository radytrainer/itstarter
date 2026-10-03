import { expect, test, type Page } from '@playwright/test';
import {
  answerUntil,
  expectNoHorizontalScroll,
  finishLesson,
  login,
  playWordsToKnow,
  setLanguage,
} from './helpers';

// One lesson from each new kind of activity (Phases 7–11), played in a real mobile browser.

async function openLesson(page: Page, world: RegExp, lesson: RegExp) {
  await page.goto('/');
  await page.getByRole('link', { name: world }).first().click();
  await page.getByRole('link', { name: lesson }).click();
}

/** Clicks through the welcome/learn/see steps and plays the "Words to know" round. */
async function passIntroSteps(page: Page) {
  await page.getByRole('button', { name: /Let's go!/ }).click();
  await page.getByRole('button', { name: /^Next/ }).click();
  await page.getByRole('button', { name: /^Next/ }).click();
  await playWordsToKnow(page);
}

/** Solves "a + b = ?", "a − b = ?", "a × b = ?" or "a ÷ b = ?" from the screen. */
function solve(prompt: string): number {
  const m = prompt.match(/^(\d+) ([+−×÷]) (\d+) = \?$/);
  if (!m) throw new Error(`Can't solve: ${prompt}`);
  const [a, op, b] = [Number(m[1]), m[2], Number(m[3])];
  return op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b;
}

// These tests continue the same student's lessons, so a retry can't start clean: no retries.
test.describe.configure({ retries: 0 });

test.beforeEach(async ({ page }) => {
  // Whole lessons (15+ questions, a form, a game) and the 60-answers-a-minute limit: up to 6 min.
  test.setTimeout(360_000);
  await setLanguage(page, 'en');
  await login(page);
});

test('Math: generated maths with fresh numbers', async ({ page }) => {
  await openLesson(page, /Math Playground/, /Times Tables/);
  await passIntroSteps(page);

  for (let i = 0; i < 8; i += 1) {
    const heading = page.getByRole('heading', { level: 2 });
    const prompt = (await heading.textContent())!.trim();
    await page.getByLabel('Your answer').fill(String(solve(prompt)));
    await page.getByRole('button', { name: 'Check' }).click();
    await expect(page.getByText(new RegExp(`= ${solve(prompt)}`)).first()).toBeVisible();
    await page.getByRole('button', { name: /^Next/ }).click();
  }
  await finishLesson(page, (prompt) => {
    try {
      return solve(prompt);
    } catch {
      return null; // a word problem: any answer is fine, the right one is shown
    }
  });
});

test('Logic: a puzzle shows its answer and explanation after Check', async ({ page }) => {
  await openLesson(page, /Logic Playground/, /AND, OR, NOT/);
  await passIntroSteps(page);
  await expect(page.getByRole('heading', { name: 'true AND true' })).toBeVisible();
  await page.getByRole('radio', { name: 'False' }).click();
  await page.getByRole('button', { name: 'Check' }).click();
  await expect(page.getByText(/The answer is: True/)).toBeVisible();
  await expect(page.getByRole('button', { name: /Try again/ })).toHaveCount(0);
  await expectNoHorizontalScroll(page);
  await page.getByRole('button', { name: /^Next/ }).click();
  await expect(page.getByText('Question 2 of 10')).toBeVisible();
});

test('Computer: keyboard shortcuts on the on-screen keyboard', async ({ page }) => {
  await openLesson(page, /Computer Explorer/, /Copy & Paste/);
  await passIntroSteps(page);
  await page.getByRole('radio', { name: 'Copy' }).click();
  await page.getByRole('button', { name: 'Check' }).click();
  await page.getByRole('button', { name: /^Next/ }).click();
  await page.getByRole('radio', { name: 'Paste' }).click();
  await page.getByRole('button', { name: 'Check' }).click();
  await page.getByRole('button', { name: /^Next/ }).click();

  // …more questions, then the on-screen keyboard.
  await answerUntil(page, page.getByRole('button', { name: 'Ctrl', exact: true }));
  await page.getByRole('button', { name: 'Ctrl', exact: true }).click();
  await page.getByRole('button', { name: 'C', exact: true }).click();
  await expect(page.getByText('You are pressing: Ctrl + C')).toBeVisible();
  await expectNoHorizontalScroll(page);
  await page.getByRole('button', { name: 'Check' }).click();
  await page.getByRole('button', { name: /^Next/ }).click();

  await page.getByRole('button', { name: 'Ctrl', exact: true }).click();
  await page.getByRole('button', { name: 'V', exact: true }).click();
  await page.getByRole('button', { name: 'Check' }).click();
  await expect(
    page.getByText(/The answer is|Nice work|Excellent|You got it|Great thinking|Well done/).first(),
  ).toBeVisible();
  await page.getByRole('button', { name: /^Next/ }).click();
  await finishLesson(page);
});

test('Computer: drag files into folders (real touch-style drag)', async ({ page }) => {
  await openLesson(page, /Computer Explorer/, /Files & Folders/);
  await passIntroSteps(page);

  const targets: Record<string, string> = {
    'beach.jpg': 'Photos',
    'family.png': 'Photos',
    'my-song.mp3': 'Music',
    'homework.docx': 'Documents',
    'cv.pdf': 'Documents',
  };
  for (const [file, folder] of Object.entries(targets)) {
    const item = page.getByRole('button', { name: file, exact: true });
    const zone = page.locator('[data-drop]').filter({ hasText: folder });
    const from = (await item.boundingBox())!;
    const to = (await zone.boundingBox())!;
    await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2);
    await page.mouse.down();
    await page.mouse.move(to.x + to.width / 2, to.y + to.height / 2, { steps: 8 });
    await page.mouse.up();
    await expect(zone.getByText(file)).toBeVisible();
  }
  await expect(page.getByText('Everything is sorted. Press Check!')).toBeVisible();
  await page.getByRole('button', { name: 'Check' }).click();
  await expect(page.getByText(/\.jpg\/\.png are pictures/)).toBeVisible();
});

test('Office: create My Profile with a live preview', async ({ page }) => {
  await openLesson(page, /Office Creator/, /My Profile/);
  await passIntroSteps(page);
  await page.getByRole('radio', { name: 'My Profile', exact: true }).click();
  await page.getByRole('button', { name: 'Check' }).click();
  await page.getByRole('button', { name: /^Next/ }).click();

  // 15 questions, then the profile form.
  await answerUntil(page, page.getByLabel('My name'));
  await page.getByLabel('My name').fill('Demo Student');
  await page.getByLabel('My province').fill('Kampot');
  await page.getByLabel('My hobby').fill('Football');
  await page.getByLabel('My favourite subject').fill('Maths');
  await page.getByLabel('My dream').fill('Build apps for farmers');
  await expect(page.getByText('Build apps for farmers').last()).toBeVisible(); // preview
  await expectNoHorizontalScroll(page);
  await page.getByRole('button', { name: /Save my work/ }).click();
  // Then the game round (build a sentence, memory cards) and the reward.
  await expect(page.getByRole('heading', { name: 'Game time' })).toBeVisible();
  await finishLesson(page);
  await expect(page.getByRole('heading', { name: 'Lesson complete!' })).toBeVisible();
});

test('Internet: spot the phishing email', async ({ page }) => {
  await openLesson(page, /Internet Explorer/, /Spot the Phishing/);
  await passIntroSteps(page);
  await expect(page.getByText('support@aba-bank-verify.top')).toBeVisible();
  await page.getByRole('radio', { name: /Dangerous/ }).click();
  await page.getByRole('button', { name: 'Check' }).click();
  await expect(page.getByText(/Classic phishing/)).toBeVisible();
});

test('AI: build a prompt piece by piece', async ({ page }) => {
  await openLesson(page, /AI Playground/, /Prompt Builder/);
  await passIntroSteps(page);
  await page.getByRole('radio', { name: 'You are a patient IT teacher.' }).click();
  await page.getByRole('radio', { name: 'Explain the most important keyboard keys.' }).click();
  await page
    .getByRole('radio', { name: 'I am a beginner who uses a phone more than a computer.' })
    .click();
  await page.getByRole('radio', { name: 'Give me a short list of 5 keys.' }).click();
  await expect(
    page.getByText(/You are a patient IT teacher\. Explain the most important keyboard keys\./),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Check' }).click();
  await expect(page.getByRole('button', { name: /^Next/ })).toBeVisible();
  await expectNoHorizontalScroll(page);
});
