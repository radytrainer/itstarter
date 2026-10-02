// Renders public/icons/icon.svg into the PNG icons phones need (Android, iPhone, maskable).
// Uses the Playwright browser we already have for tests — no image library needed.
// Run: npm run icons -w apps/web   (then commit the PNGs)
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';

const dir = resolve(import.meta.dirname, '../public/icons');
const svg = readFileSync(resolve(dir, 'icon.svg'), 'utf8');
const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;

/**
 * name, size, and how much of the canvas the artwork fills. Maskable icons get cropped to a
 * circle or squircle by Android, so the artwork must sit inside the central 80% "safe zone".
 */
const ICONS = [
  { file: 'icon-192.png', size: 192, scale: 1, background: 'transparent' },
  { file: 'icon-512.png', size: 512, scale: 1, background: 'transparent' },
  { file: 'maskable-512.png', size: 512, scale: 0.78, background: '#4f46e5' },
  { file: 'apple-touch-icon.png', size: 180, scale: 1, background: '#4f46e5' },
  { file: 'favicon-32.png', size: 32, scale: 1, background: 'transparent' },
];

const browser = await chromium.launch();
try {
  for (const icon of ICONS) {
    const page = await browser.newPage({ viewport: { width: icon.size, height: icon.size } });
    const art = Math.round(icon.size * icon.scale);
    await page.setContent(
      `<html><body style="margin:0;display:grid;place-items:center;width:${icon.size}px;height:${icon.size}px;background:${icon.background}">
        <img src="${dataUrl}" width="${art}" height="${art}" style="display:block${icon.background === 'transparent' ? '' : ';border-radius:0'}">
      </body></html>`,
    );
    await page.screenshot({
      path: resolve(dir, icon.file),
      omitBackground: icon.background === 'transparent',
    });
    await page.close();
    console.log(`✔ ${icon.file}`);
  }
} finally {
  await browser.close();
}
