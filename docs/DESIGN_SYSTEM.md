# Design system and languages

**Feel:** friendly, colourful but calm, youth-oriented, never childish or intimidating. Mobile first.

Open **`/design`** in development (`npm run dev`, then http://localhost:3000/design) to see every
building block on one page. It's hidden in production.

## Tokens (`apps/web/src/app/globals.css`)

| Token                             | Use                                                                              |
| --------------------------------- | -------------------------------------------------------------------------------- |
| `brand-*` (indigo)                | primary actions, links, focus ring                                               |
| `ink`, `muted`, `line`            | text, secondary text, borders                                                    |
| `canvas`, `surface`               | page background, cards                                                           |
| world colours                     | `violet` 🧠 · `sky` 🖥️ · `emerald` 📄 · `amber` 🌐 · `rose` 🤖 (`lib/worlds.ts`) |
| `rounded-card`, `rounded-control` | 20px cards, 14px controls                                                        |
| `animate-pop`, `animate-rise`     | small celebratory/entry animations, switched off by reduced motion               |

Fonts: **Nunito** (Latin) and **Noto Sans Khmer**, self-hosted at build time (no Google requests from
phones). Khmer pages get a taller line height.

## Components (`apps/web/src/components/ui`)

`Button` / `ButtonLink` (primary, secondary, ghost, success; ≥ 48px tall) · `Card` · `ProgressBar`
(accessible `progressbar`) · `TextField` / `PasswordField` (label, hint, error, show/hide) · `Feedback`
(success, encourage, info, warning; **no "error/wrong" tone for learning**) · `StatPill` (XP, streak,
level) · `BadgeIcon` (earned / locked) · `AppShell` (header, language switch, bottom tabs on phones,
top links from 768px; `focus` mode hides the menu during lessons).

## Accessibility rules we follow

- Touch targets at least 48 × 48 px; matching and ordering use taps and ▲▼ buttons, not drag-only.
- Every field has a visible label. Help and error text are linked with `aria-describedby`.
- Feedback uses `aria-live`; the lesson player moves focus to each new step.
- Visible keyboard focus everywhere (`:focus-visible`).
- Emoji are decorative (`aria-hidden`) unless they carry meaning (`role="img"` + label).
- `prefers-reduced-motion` turns animations off.
- Checked automatically: no sideways scrolling at 320, 375, 390, 430, 768, 1024 and 1440 px, in English
  and Khmer (`e2e/layout.spec.ts`).

## Languages (Khmer + English)

- **Screen text** lives in `apps/web/messages/en.json` and `km.json` (next-intl). Never hard-code
  user-facing text in components.
- **Learning content** in the database uses `{ "en": "...", "km": "..." }`. Missing Khmer falls back to English.
- The chosen language is a cookie (`NEXT_LOCALE`) plus the user's profile (`PATCH /api/me`), so it follows
  them to another phone. URLs have no language prefix.
- `npm test` fails if the two files have different keys, empty strings, or different `{placeholders}`.

> ⚠️ All Khmer text is a **draft** and must be reviewed by a native speaker before students see it.

## Lesson & quiz screens

- **Focus mode:** no site header or menu. A slim sticky bar: ✕ exit · segmented step progress
  (done = `brand-600`, current = `brand-300`, to come = grey) · language (≥ 640px) · ⭐ XP.
  Under it one quiet line: lesson icon + name • step name (the step name is the page's `h1`).
- **Question card:** one white card — “Question 3 of 8” with a thin progress line, the question
  (`h2`, 20–24px bold), the scene (email, URL, sheet…), then the answer input.
- **Options** (`components/learning/questions/option.tsx`): full-width rows with A/B/C key badges
  (tiles with a big emoji for True/False and Safe/Dangerous). States: idle → selected (indigo) →
  after Check the right one turns **green ✓ “Correct answer”**, the student's pick **amber
  “Your answer”**, the rest fade. Never red, never “wrong”. Badges and tags are hidden from screen
  readers (the tag is an `aria-describedby` description), so option names stay just the answer.
- **Action bar** (`components/learning/action-bar.tsx`): the main button and the feedback in one
  place — stuck to the bottom of the screen on phones (no scrolling to find Check), a card under the
  question from 640px. Its colour tells the result: neutral, green (right), amber (now you know),
  orange (try again).
- **Keyboard:** 1–9 or A–I choose, Enter checks / continues (a tip shows only for mouse users).
