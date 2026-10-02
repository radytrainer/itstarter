# Install as an app (PWA) — Phase 15

IT Starter 2028 can be installed on a phone's home screen and opens full screen, like a native app.
There is no app store and no extra download: the website is the app.

## What is included

| Piece          | File                                                     | Notes                                                                                                                                                                    |
| -------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Manifest       | `apps/web/src/app/manifest.ts` → `/manifest.webmanifest` | Name, colours, `display: standalone`, icons (incl. maskable). Name and description come from the message files.                                                          |
| Icons          | `apps/web/public/icons/`                                 | `icon.svg` is the source. `npm run icons -w apps/web` re-renders the PNGs (192, 512, maskable 512, Apple 180, favicon 32) with Playwright's Chromium — no image library. |
| iPhone support | `apps/web/src/app/layout.tsx`                            | `apple-touch-icon` and `apple-mobile-web-app-capable`, so “Add to Home Screen” gives a proper icon and full screen.                                                      |
| Service worker | `apps/web/public/sw.js` (hand-written)                   | Registered by `PwaSetup` (root layout) in production builds only. Served with `Cache-Control: no-cache` so updates arrive straight away.                                 |
| Offline page   | `/offline`                                               | Both languages at once (we can't read the language setting offline), no login, no API.                                                                                   |
| Install button | `components/pwa.tsx`, `lib/pwa.ts`                       | Dashboard card (can be dismissed) and a panel on the profile page.                                                                                                       |

## Caching rules (and why)

| Request                                 | Strategy                                          | Why                                                                                                            |
| --------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `/_next/static/*`, `/icons/*`, manifest | Cache first                                       | File names change with every build, so a cached copy is never stale. Saves mobile data. Capped at 300 entries. |
| Page navigations                        | Network only → `/offline` if there is no Internet | Pages contain the student's name and progress.                                                                 |
| `/api/*`                                | Never touched                                     | Answers, XP and progress must always be live and checked by the server.                                        |
| Anything not `GET`                      | Never touched                                     | —                                                                                                              |

**Nothing personal is stored on the device.** School computers and family phones are shared; only
public static files and the offline page are cached. An end-to-end test checks the cache contents.

Updating: change `sw.js` (e.g. bump `VERSION`) and deploy. The new worker installs immediately
(`skipWaiting`) and deletes old `itstarter-*` caches. Lessons themselves are never cached, so
content changes show up at once.

Out of scope (see the architecture's "later" list): playing lessons offline and syncing later.

## How students install it

- **Android (Chrome, Samsung Internet, Edge):** the dashboard shows “📲 Install app”. One tap opens
  the browser's install dialog. (Chrome's menu → “Install app” also works.)
- **iPhone / iPad (Safari):** Apple has no install dialog. The card explains: tap Share ⬆️, then
  “Add to Home Screen” ➕.
- **Computers (Chrome / Edge):** the install icon in the address bar, or our button.

## Tests

- Web unit tests (`apps/web/test/pwa.test.tsx`): Chrome install flow, “Not now” remembered, iPhone
  instructions, already installed, browsers that can't install.
- End-to-end (`e2e/pwa.spec.ts`, Chromium = Android Chrome's engine): manifest and icons served,
  **Chrome's own installability check reports no errors**, offline page in both languages with its
  styles, back online, and the cache holds no pages or API data.

## Manual check on real phones (do before launch)

Playwright's “iPhone” project uses Chromium with an iPhone screen size; it cannot run Safari's PWA
features. Please check on real devices (needs the HTTPS site from Phase 18 — or `localhost`):

| #   | Android + Chrome                                                          | ✓   |
| --- | ------------------------------------------------------------------------- | --- |
| 1   | Dashboard shows “Install app”; tapping it shows Chrome's dialog           |     |
| 2   | Home-screen icon is the rocket (round on most phones)                     |     |
| 3   | Opens full screen (no address bar), status bar indigo                     |     |
| 4   | Airplane mode → open the app → offline page (EN + KM), no Chrome dinosaur |     |
| 5   | Wi-Fi back → “Try again” → dashboard                                      |     |

| #   | iPhone + Safari                                                                                | ✓   |
| --- | ---------------------------------------------------------------------------------------------- | --- |
| 1   | Dashboard/profile show the “Share ⬆️ → Add to Home Screen ➕” steps                            |     |
| 2   | Home-screen icon is the rocket (not a screenshot)                                              |     |
| 3   | Opens full screen from the home screen                                                         |     |
| 4   | Airplane mode → offline page                                                                   |     |
| 5   | Logging in from the home-screen app works (iOS keeps a separate cookie jar for installed apps) |     |
