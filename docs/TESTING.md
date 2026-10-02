# Testing

How IT Starter 2028 is tested, how to run the tests, and what CI checks on every change.

## The short version

```bash
npm run docker:deps          # PostgreSQL + Redis for the API tests
npm run verify               # everything CI runs, except the browser tests (~6 min)

npm run docker:up && npm run docker:migrate && npm run docker:seed
npm run verify -- --e2e      # … plus the browser tests (~15 min)
```

`verify` prints a ✔/✘ summary and fails if any step fails, exactly like CI.

## The layers

| Layer               | Tool                           | Where                       | Tests | What it proves                                                                                                                                                                                                                                                                                                                           |
| ------------------- | ------------------------------ | --------------------------- | ----: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API unit**        | Vitest                         | `apps/api/test/unit`        |   197 | Pure logic: answer checkers for every question kind and game, robot rules and solver, maths generators, XP/levels/streaks, commitment formula, config and seed safety checks, cache failure handling, **every built-in question is answerable** (same validator as the admin editor).                                                    |
| **API integration** | Vitest + real PostgreSQL/Redis | `apps/api/test/integration` |   200 | Every endpoint through the real app: login and sessions, roles (**every route is tried as anonymous, student and teacher**), learning and XP (exactly once), games, admin content CRUD with audit log, analytics, progress report, performance & commitment, seed upgrades, attacks (SQL injection, mass assignment, CSRF, huge bodies). |
| **Web components**  | Vitest + Testing Library       | `apps/web/test`             |    90 | Every question input and game (catch, memory, robot, word builder), the question runner (feedback, retry, reveal, keyboard), active-time tracking, listen button, admin forms, progress/performance views, CSP, PWA helpers, messages in both languages.                                                                                 |
| **End-to-end**      | Playwright                     | `e2e/`                      |   ~30 | Real browser at phone sizes (Pixel 7, iPhone 14) against the Docker stack: student journey, every world, games, English, layout at 7 widths (320–1440 px), admin tasks, PWA/offline, CSP, **accessibility (axe, WCAG 2.1 AA, English and Khmer)**.                                                                                       |

Integration tests use their own database (`<name>_test`), recreated on every run, so they never touch
your local data. E2E tests use dedicated students (`e2e.android`, `e2e.iphone`, `e2e.layout`) that are
reset before each run (only on a local database).

## Coverage

Measured with V8 coverage; CI fails if it drops below these minimums:

| Package                  | Statements | Branches | Functions | Lines | Minimum (CI)        |
| ------------------------ | ---------: | -------: | --------: | ----: | ------------------- |
| API (unit + integration) |      93.5% |    84.6% |     94.5% | 95.3% | 91 / 82 / 92 / 93 % |
| Web (components and lib) |      64.2% |    58.3% |     57.6% | 65.6% | 62 / 56 / 55 / 63 % |

Web pages (server components), the lesson player and admin screens are covered by the E2E tests
instead, which coverage does not count. Reports: `apps/*/coverage/index.html` after
`npm run test:coverage`.

## CI (`.github/workflows/ci.yml`)

Runs on every pull request and every push to `main`; all four jobs must pass:

1. **check** — formatting, lint, types, API unit tests, web tests with coverage minimums,
   `npm audit` of production dependencies, and "the database schema has a migration".
2. **integration** — API unit + integration tests together against PostgreSQL 17 and Redis 7,
   with coverage minimums.
3. **docker** — both production images build.
4. **e2e** — starts the whole stack with Docker Compose (Nginx → web → API → PostgreSQL + Redis),
   migrates, seeds, and runs the browser tests. On failure it keeps the Playwright report, screenshots,
   traces and service logs for 7 days.

## Writing tests: house rules

- **Real over mocked.** API behaviour is tested through the real app and a real database. Mock only
  the outside world (the network in component tests, a broken Redis in the cache test).
- **Test what the student sees.** Component and E2E tests find things by role and visible text
  (`getByRole('button', { name: 'Check' })`), which also keeps the app accessible.
- **Feedback is never punishing:** tests assert that no screen says "wrong" or "failed".
- **New question kind or game?** Add a checker test, a validator test, an input test, and a seed
  question — the content test then proves every built-in question of that kind is answerable.
- **New endpoint?** The security test finds it automatically and checks it refuses anonymous users,
  the wrong roles, and writes without the CSRF header.
- **Slow on purpose:** the API allows 60 answers a minute per student; E2E helpers wait and retry.

## What automated tests cannot prove (manual, Phase 19)

- How it feels on real low-end Android phones and iPhones over school Wi-Fi.
- Screen readers end to end (TalkBack, VoiceOver) and keyboard-only use of every game; axe catches
  about a third of accessibility problems.
- Khmer wording (all Khmer text is a draft for native review) and the 🔊 voices on each phone.
- Installing the app to the home screen on real devices (needs HTTPS, Phase 18).
