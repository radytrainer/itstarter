# 🚀 IT Starter 2028

A small, friendly, mobile-first e-learning platform that helps new students feel at home with technology
before formal IT training: **Learn → Play → Practice → Create → Explore**.

> **Project status:** Phases 1–19 are complete; the site is live at **https://itstarter.store**. All **105 lessons** (about 1,950 questions) across 7 worlds are playable — including
> **English for Beginners** (grammar, vocabulary, listening with a 🔊 button, spelling) — 15 lessons per
> world, 15–20 questions per lesson (Logic Playground: 20–22), plus a 🎮 **game round** in every lesson
> (catch the answer, memory cards, robot coding, word builder). Every Check shows the right answer and,
> for most questions, a short explanation. Lessons include generated maths, keyboard and mouse practice, Office simulations, Safe-or-Dangerous scenes and an AI
> prompt builder. Badges, achievements, levels and streaks are awarded automatically. Teachers and admins manage students, classes, lessons and badges in the admin area at `/admin`, and follow every student's learning progress at `/admin/progress` (with CSV export), including a
> **commitment** score (days learned, active minutes, lessons — last 4 weeks) and a per-student performance report; students see their own habit and strengths on **My progress** (`/progress`). The analytics page (`/admin/analytics`) shows completion, engagement, quiz performance and the hardest lessons and activities. The app can be installed on Android and iPhone home screens and shows a friendly offline page ([docs/PWA.md](docs/PWA.md)). Security was reviewed in Phase 16 (strict CSP, production safety checks, automated route-guard tests — see [docs/SECURITY.md](docs/SECURITY.md)). Every change is checked by CI: about 520 automated tests (unit, API with a real database, components, and real-browser tests at phone sizes including accessibility), coverage minimums and a dependency audit — run them all with `npm run verify` ([docs/TESTING.md](docs/TESTING.md)). Production on OVHcloud is ready to set up at **https://itstarter.store**: HTTPS, encrypted off-site backups with monthly restore drills, Telegram alerts, and one-click deploys from GitHub with automatic rollback ([docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)). Students can create their own account (or staff create them; `SELF_REGISTRATION=closed` switches sign-up off). Before a class starts, run the real-phone checklist in [docs/QA-CHECKLIST.md](docs/QA-CHECKLIST.md). See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full design and roadmap.

## Stack

| Layer          | Technology                                           |
| -------------- | ---------------------------------------------------- |
| Web app        | Next.js (App Router), React, Tailwind CSS            |
| API            | Node.js 22, Fastify, Zod                             |
| Database       | PostgreSQL 17 (source of truth)                      |
| Cache          | Redis 7 (cache, rate limiting, temporary state only) |
| Reverse proxy  | Nginx                                                |
| Infrastructure | Docker Compose, GitHub Actions, OVHcloud VPS         |

```
apps/web         Next.js frontend
apps/api         REST API
packages/shared  Types and validation schemas used by both
infra/nginx      Nginx configuration
docs/            Architecture and operations docs
```

## Requirements

- **Node.js 22.22 or newer** (`.nvmrc`); npm 10+
- **Docker Desktop** (Windows/macOS) or Docker Engine + Compose plugin (Linux)

## Quick start (everything in Docker)

```bash
cp .env.example .env          # first time only
docker compose up -d --build  # build and start all services
npm run docker:migrate        # create/upgrade the database tables
npm run docker:seed           # add base data, sample lessons and demo accounts
```

Open **http://localhost:8088** and log in with a demo account (see [Database](#database)).
**http://localhost:8088/status** shows the system check (four green "Working" rows).

```bash
docker compose ps             # status and health of each service
docker compose logs -f api    # follow API logs
docker compose down           # stop (database data is kept)
docker compose down -v        # stop AND delete the database volume ⚠️
```

## Local development (hot reload)

Run only PostgreSQL and Redis in Docker, and the apps on your machine:

```bash
npm install
cp .env.example .env          # first time only
npm run docker:deps           # postgres + redis
npm run db:migrate            # first time, and after pulling new migrations
npm run db:seed               # first time
npm run dev                   # API on :4000, web on :3000
```

Open **http://localhost:3000**. In dev mode, Next.js forwards `/api/*` to the API, so the browser uses one
origin just like production.

## Scripts

| Command                    | What it does                                                                                         |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `npm run dev`              | Start API + web with hot reload                                                                      |
| `npm run build`            | Production build of API and web                                                                      |
| `npm test`                 | Unit tests (API + web), no services needed                                                           |
| `npm run test:integration` | API tests against real PostgreSQL/Redis (`npm run docker:deps`)                                      |
| `npm run e2e:reset`        | Reset the E2E test students (done automatically before `test:e2e`)                                   |
| `npm run test:e2e`         | Browser tests (Android + iPhone emulation) against the running stack (`E2E_BASE_URL`, default :8088) |
| `npm run test:coverage`    | Unit + integration tests with coverage minimums (reports in `apps/*/coverage`)                       |
| `npm run verify`           | Everything CI checks, with a summary (`-- --e2e` adds the browser tests)                             |
| `npm run lint`             | ESLint                                                                                               |
| `npm run typecheck`        | TypeScript checks for all workspaces                                                                 |
| `npm run format`           | Prettier (write); `format:check` to verify                                                           |
| `npm run db:migrate`       | Apply pending database migrations                                                                    |
| `npm run db:seed`          | Create missing base data, sample lessons and accounts                                                |
| `npm run db:generate`      | Create a migration after changing the schema                                                         |
| `npm run docker:migrate`   | `db:migrate` inside Docker                                                                           |
| `npm run docker:seed`      | `db:seed` inside Docker                                                                              |
| `npm run docker:up`        | `docker compose up -d --build`                                                                       |
| `npm run docker:down`      | `docker compose down`                                                                                |

## Documentation

| Doc                                                | What's in it                                                 |
| -------------------------------------------------- | ------------------------------------------------------------ |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)       | Overall design, ERD, roadmap                                 |
| [docs/DATABASE.md](docs/DATABASE.md)               | Tables, migrations, seeding                                  |
| [docs/SECURITY.md](docs/SECURITY.md)               | Authentication, roles, CSRF, rate limits                     |
| [docs/TESTING.md](docs/TESTING.md)                 | Test layers, coverage, CI, how to run everything             |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)           | Production server: setup, deploy, backups, restore, alerts   |
| [docs/QA-CHECKLIST.md](docs/QA-CHECKLIST.md)       | Final checks on real phones before a class starts            |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)     | UI components, accessibility, Khmer/English                  |
| [docs/LEARNING_ENGINE.md](docs/LEARNING_ENGINE.md) | How lessons, questions, XP and progress work; adding content |

## Health endpoints

| URL                     | Meaning                                                          |
| ----------------------- | ---------------------------------------------------------------- |
| `GET /api/health`       | API process is alive (does not check dependencies)               |
| `GET /api/health/ready` | PostgreSQL and Redis reachable: `200`, otherwise `503` + details |
| `GET /healthz`          | Web (Next.js) process is alive                                   |

## API endpoints so far

| Endpoint                                                                             | Who                        |
| ------------------------------------------------------------------------------------ | -------------------------- |
| `POST /api/auth/login`, `/logout`                                                    | anyone                     |
| `GET /api/auth/me`, `PATCH /api/me`, `POST /api/auth/change-password`                | signed in                  |
| `GET /api/courses`, `/courses/:id`, `/worlds/:id`, `/lessons/:id`, `/activities/:id` | signed in                  |
| `GET /api/progress` (dashboard)                                                      | student                    |
| `GET /api/badges`, `/achievements`                                                   | signed in                  |
| `POST /api/lessons/:id/start`, `/complete`                                           | student                    |
| `POST /api/activities/:id/answer`, `/complete`                                       | student                    |
| `GET /api/teacher/students` (filters), `/students/:id`, `/cohorts`                   | teacher (own class), admin |
| `GET /api/teacher/progress` (filters, sort), `/progress/export` (CSV)                | teacher (own class), admin |
| `POST /api/teacher/students/:id/reset-password`                                      | teacher (own class), admin |
| `POST/PATCH/DELETE /api/admin/students`, `POST /api/admin/students/import` (CSV)     | admin                      |
| `POST /api/admin/cohorts`, `GET/POST /api/admin/staff`                               | admin                      |
| Courses, worlds, lessons, activities: `GET/POST/PATCH/DELETE` + `…/reorder`          | admin                      |
| `POST /api/admin/activities/:id/questions`, `PUT/DELETE /api/admin/questions/:id`    | admin                      |
| `GET/POST/PATCH /api/admin/badges`, `GET /api/admin/audit-logs`                      | admin                      |
| `GET /api/admin/analytics/{overview,engagement,worlds,activities}`                   | teacher (own class), admin |

Every admin change is validated (a question with no correct answer can't be saved), written to
the audit log, and refreshes the content cache. Deletes are soft (archived, never lost).

State-changing requests must send `x-requested-with: itstarter` (CSRF protection).
More detail: [docs/LEARNING_ENGINE.md](docs/LEARNING_ENGINE.md), [docs/SECURITY.md](docs/SECURITY.md).

All API responses use one envelope:

```json
{ "success": true, "data": {} }
{ "success": false, "error": { "code": "NOT_FOUND", "message": "..." } }
```

## Environment variables

Copy `.env.example` to `.env`. **Never commit `.env`.**

| Variable                                            | Used by        | Meaning                                                                  |
| --------------------------------------------------- | -------------- | ------------------------------------------------------------------------ |
| `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` | Compose        | Database name and credentials                                            |
| `POSTGRES_HOST_PORT`                                | Compose        | Host port for PostgreSQL (default `5433`, bound to 127.0.0.1)            |
| `REDIS_HOST_PORT`                                   | Compose        | Host port for Redis (default `6379`, bound to 127.0.0.1)                 |
| `NGINX_HOST_PORT`                                   | Compose        | Host port for the full stack (default `8088`)                            |
| `DATABASE_URL`                                      | API (host dev) | PostgreSQL connection string. Compose builds its own for containers      |
| `REDIS_URL`                                         | API (host dev) | Redis connection string                                                  |
| `API_PORT`                                          | API            | Port the API listens on (default `4000`)                                 |
| `APP_ORIGIN`                                        | API            | Public URL of the web app; the only origin allowed by CORS               |
| `LOG_LEVEL`                                         | API            | `fatal` `error` `warn` `info` `debug` `trace` `silent`                   |
| `COOKIE_SECURE`                                     | API            | Session cookie only over HTTPS. Default: `true` in production            |
| `API_INTERNAL_URL`                                  | Web            | How the Next.js server reaches the API (`http://api:4000` inside Docker) |
| `SEED_ADMIN_PASSWORD`                               | Seed           | Admin password created by the seed (required, 12+ chars, in production)  |
| `SEED_DEMO_USERS`                                   | Seed           | `true` also creates `teacher.demo` and `student.demo`                    |
| `SEED_TEACHER_PASSWORD`, `SEED_STUDENT_PASSWORD`    | Seed           | Passwords for the demo accounts                                          |

The API validates its environment at startup and stops with a clear list of missing or invalid variables.
It never prints their values.

## Database

See **[docs/DATABASE.md](docs/DATABASE.md)**: tables, conventions, changing the schema, and seeding.

Local demo accounts after seeding (development only):

| Role    | Username       | Password          |
| ------- | -------------- | ----------------- |
| Admin   | `admin`        | `Admin#2028dev`   |
| Teacher | `teacher.demo` | `Teacher#2028dev` |
| Student | `student.demo` | `Student#2028dev` |

Teachers see only students in their own class. See [docs/SECURITY.md](docs/SECURITY.md).

## Deployment and backups

- **Production deployment to OVHcloud (HTTPS, firewall, CI/CD):** Phase 18
- **Backup and restore of PostgreSQL:** Phase 18

These sections will be filled in as each phase is completed.

## Troubleshooting

| Problem                                                | Fix                                                                                                                                                                          |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `port is already allocated` / `address already in use` | Another program uses the port. Change `POSTGRES_HOST_PORT`, `REDIS_HOST_PORT` or `NGINX_HOST_PORT` in `.env`                                                                 |
| `failed to connect to the docker API`                  | Start Docker Desktop and wait until it says "running"                                                                                                                        |
| `Set POSTGRES_PASSWORD in .env`                        | You have no `.env` yet: `cp .env.example .env`                                                                                                                               |
| System check shows **API: Not reachable**              | `docker compose ps`; check `docker compose logs api`                                                                                                                         |
| System check shows **Database: Not reachable**         | `docker compose ps postgres`. If you changed `POSTGRES_PASSWORD` after first start, the old volume still has the old password: `docker compose down -v` (deletes local data) |
| API exits with `Invalid environment configuration`     | The message lists which variables are missing or invalid in `.env`                                                                                                           |
| `relation "..." does not exist`                        | Run `npm run db:migrate` (or `npm run docker:migrate`)                                                                                                                       |
| Seed: `SEED_ADMIN_PASSWORD is required`                | Docker runs in production mode. Add the `SEED_*` lines from `.env.example` to your `.env`                                                                                    |
| Login says "Too many tries"                            | Wait the time shown (15 min max), or in dev: `docker compose exec redis redis-cli flushdb`                                                                                   |
| Logged in but every page sends you back to login       | Over plain HTTP the cookie must not be `Secure`: set `COOKIE_SECURE=false` (the local Docker stack already does)                                                             |
| `npm warn EBADENGINE` during install                   | Upgrade Node.js to 22.22+ (some test tools require it)                                                                                                                       |
