import { test } from '@playwright/test';
import { expectNoHorizontalScroll, login, setLanguage } from './helpers';

// Every step of two lessons that use the interactive question types (matching, ordering),
// on the narrowest phone width. Fails on sideways scrolling; screenshots for a human look.
const LESSONS = [
  { world: /Computer Explorer/, lesson: /Parts of a Computer/, name: 'computer-parts' },
  { world: /Computer Explorer/, lesson: /Files & Folders/, name: 'files-and-folders' },
  { world: /Office Creator/, lesson: /Format Your Text/, name: 'format-your-text' },
  { world: /Office Creator/, lesson: /Cells & Addresses/, name: 'cells-and-addresses' },
  { world: /Internet Explorer/, lesson: /Spot the Phishing/, name: 'spot-phishing' },
  { world: /AI Playground/, lesson: /Better Questions/, name: 'better-prompts' },
  { world: /AI Playground/, lesson: /Prompt Builder/, name: 'prompt-builder' },
  // New in the 15-lesson worlds
  { world: /Computer Explorer/, lesson: /Hardware & Software/, name: 'hardware-and-software' },
  { world: /Office Creator/, lesson: /Sort & Charts/, name: 'sort-and-charts' },
  { world: /Internet Explorer/, lesson: /Is It True/, name: 'is-it-true' },
  { world: /AI Playground/, lesson: /AI Images/, name: 'ai-images-and-voice' },
];

test.beforeEach(() => {
  test.skip(test.info().project.name !== 'android', 'one device is enough');
});

for (const { world, lesson, name } of LESSONS) {
  test(`every step of ${name} fits a 320px phone`, async ({ page }) => {
    await setLanguage(page, 'en');
    await login(page, 'layout'); // its own student: these walk-throughs leave lessons half-done
    await page.setViewportSize({ width: 320, height: 720 });
    await page.getByRole('link', { name: world }).first().click();
    await page.getByRole('link', { name: lesson }).click();

    for (let step = 1; step <= 6; step += 1) {
      await page.waitForTimeout(400); // let the step animation settle
      await expectNoHorizontalScroll(page);
      await page.screenshot({
        path: `e2e/screenshots/lesson_${name}_step${step}.png`,
        fullPage: true,
      });
      const next = page.getByRole('button', { name: /^(Let's go!|Next|Check|Try again)/ }).first();
      if (!(await next.isVisible()) || !(await next.isEnabled())) break;
      await next.click();
    }
  });
}
