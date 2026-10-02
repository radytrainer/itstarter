# Security

How IT Starter 2028 protects student accounts and data. This file grows with each phase; the full
security review is Phase 16.

## Authentication (Phase 3)

### Accounts

- Accounts are created by staff (students may not have email). Usernames are lowercase and matched
  case-insensitively, so `Sokha` and `sokha` are the same account.
- Passwords are hashed with **Argon2id** (19 MiB, 2 iterations, 1 thread, per OWASP). Plain passwords are
  never stored or logged.
- Password rules are short and explainable for beginners: **at least 8 characters, not your username, not
  your old password.** Length matters more than symbols; the login rate limit handles guessing.

### Sessions

| Property       | Value                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------- |
| Token          | 256-bit random value in a cookie. Only its **SHA-256 hash** is stored in `sessions`.                |
| Cookie         | `HttpOnly; SameSite=Lax; Path=/`, plus `Secure` and the `__Host-` prefix in production (HTTPS).     |
| Students       | Signed out after **14 days** without use; at most **60 days** after login.                          |
| Teachers/Admin | Signed out after **12 hours** without use; at most **7 days** after login.                          |
| Lookup         | Redis cache (10 min) in front of PostgreSQL. If Redis is down, sessions still work from PostgreSQL. |
| Revocation     | Logout, password change (other devices) and teacher password reset (all devices) revoke instantly.  |
| Cleanup        | Ended sessions are deleted hourly.                                                                  |

Long student sessions are deliberate: students use their own phones, and typing a password on a phone
every day is a barrier. Shared devices are handled by a visible **Log out** button.

> Revocation deletes the cached copy in Redis. If that delete fails, a revoked session could stay usable for
> up to 10 minutes; this is logged as a warning. Disabling a user (Phase 13) must also revoke their sessions.

### Login protection

| Threat                   | Control                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| Password guessing        | 5 wrong passwords per username per 15 min, then a friendly "wait N minutes" (HTTP 429).         |
| Guessing many usernames  | 60 wrong passwords per IP per 10 min; correct logins never count (a school lab shares one IP).  |
| Finding valid usernames  | The same message for "unknown user" and "wrong password", with equal timing (dummy hash check). |
| Redis down               | Login fails **closed** (503) rather than allowing unlimited guessing. Existing sessions work.   |
| Stolen session, password | Changing the password requires the current password (also rate-limited).                        |
| Disabled accounts        | "Ask your teacher" is shown only after a correct password, so it can't be used to probe names.  |
| Temporary passwords      | Teacher resets create e.g. `brave-mango-4821`, signed out everywhere, must be changed at login. |

### CSRF

Cookie-authenticated, state-changing requests (`POST/PUT/PATCH/DELETE`) need all of:

1. The `SameSite=Lax` cookie (other sites' POSTs don't carry it).
2. An `Origin` header, when present, equal to `APP_ORIGIN`.
3. The header `x-requested-with: itstarter`. Browsers can only send it cross-origin after a CORS preflight,
   and CORS allows only `APP_ORIGIN`.

Our web app adds the header automatically (`apps/web/src/lib/api-client.ts`).

## Authorization (RBAC)

| Role      | Can                                                                     |
| --------- | ----------------------------------------------------------------------- |
| `STUDENT` | Their own account and (from Phase 5) their own progress only.           |
| `TEACHER` | Students in **their own cohorts**: list, view progress, reset password. |
| `ADMIN`   | Everything, including all students and the audit log.                   |

- Every route declares its guard (`requireAuth`, `requireRole(...)`) in the API. The web app's redirects are
  for convenience only; the API is the authority.
- Teacher scoping lives in one function (`studentScope` in `modules/teacher/service.ts`) used by every
  teacher query.
- A student outside the teacher's scope returns **404**, not 403, so teachers can't discover other students.
- Users who must change their password can only call `/auth/me`, `/auth/change-password` and `/auth/logout`.
- Analytics (`/api/admin/analytics/*`) use the same rule through their own `scopedStudents` filter: a
  teacher's numbers cover only their classes, and asking for another class returns **404**. Reports
  contain only counts and averages (no names or usernames); a test checks this. Averages over fewer
  than 3 students are left out of the "hardest" lists so they can't single out one child.

## Audit log and logging

- Admin and teacher actions that change other people's accounts are written to `audit_logs`
  (who, what, when). Readable by admins at `GET /api/admin/audit-logs`.
- Structured logs record `auth.login`, `auth.login_failed`, `auth.rate_limited`, `auth.logout`,
  `auth.password_changed`, `admin.student_password_reset` and `security.csrf_rejected` events.
- Passwords, tokens, cookies and temporary passwords are redacted from logs automatically.

## Other protections already in place

- Security headers (Helmet on the API, Nginx on every response), strict CORS, 1 MB body limit.
- JSON bodies are parsed with prototype-poisoning protection.
- All input is validated with Zod; all SQL is parameterised (Drizzle).
- Errors never include stack traces or internal details.
- Secrets only in environment variables; `.env` is git-ignored.

## Phase 16 security review

Reviewed area by area against the brief's checklist. Findings were fixed and locked in with tests,
so they cannot come back silently.

### Results

| Area              | Checked                                                                                                                                                                                   | Result                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Authentication    | Password hashing (Argon2id), login rate limits, no username enumeration, session cookie flags, session revoke on password change / pause / delete, forced password change                 | ✅ No issues                                                                         |
| Authorization     | **Every API route**, discovered automatically, called as anonymous → 401, as student on teacher/admin routes → 403, as teacher on admin routes → 403 (except analytics)                   | ✅ No issues — test: `security.test.ts` (proven to fail if a guard is removed)       |
| Admin permissions | Admin “student” actions can't target staff accounts (no locking out another admin); teachers limited to their classes everywhere (lists, detail, progress, analytics, CSV)                | ✅ No issues                                                                         |
| Input validation  | Every route parses with Zod; unknown fields ignored (mass assignment: `PATCH /api/me {role:"ADMIN"}` has no effect); 1 MB body limit (Nginx 2 MB); CSV import capped at 300 rows / 200 kB | ✅ No issues                                                                         |
| SQL injection     | All queries parameterised (Drizzle / `sql` tags); `sql.raw` is used only for a fixed `asc`/`desc` and the commitment formula's code constants; search boxes tested with injection strings | ✅ No issues                                                                         |
| XSS               | React escapes all output; no `dangerouslySetInnerHTML`; no links built from data                                                                                                          | **Fixed:** web pages had no Content-Security-Policy → strict nonce-based CSP (below) |
| CSRF              | `x-requested-with` header + Origin check on every write — **tested on every write route**                                                                                                 | ✅ No issues                                                                         |
| CORS              | Only `APP_ORIGIN` with credentials; any other origin gets no CORS headers                                                                                                                 | ✅ No issues                                                                         |
| Rate limiting     | Login (per user + per IP, wrong passwords only), change password, answers; Nginx 20 req/s per IP                                                                                          | ✅ No issues (see accepted risks)                                                    |
| Secrets           | `.env` git-ignored; config errors print names, never values; logs redact cookies, passwords, tokens                                                                                       | **Fixed:** production accepted the passwords published in `.env.example` (below)     |
| Errors            | Generic JSON for 4xx/5xx; no stack traces, SQL or library names (tested with broken JSON)                                                                                                 | ✅ No issues                                                                         |
| File handling     | No uploads. CSV import is text in JSON (size-capped). CSV export defuses spreadsheet formulas (`=`, `+`, `-`, `@` …)                                                                      | ✅ No issues                                                                         |
| Offline cache     | Service worker stores only static files + the offline page, never pages or API data (tested)                                                                                              | ✅ No issues                                                                         |
| Containers        | API and web run as the non-root `node` user; Postgres and Redis bound to 127.0.0.1                                                                                                        | ✅ No issues                                                                         |
| Dependencies      | `npm audit --omit=dev`: **0** vulnerabilities                                                                                                                                             | ✅ (dev-only note below)                                                             |

### Fixes made

1. **Content-Security-Policy on every page** (`apps/web/src/proxy.ts`, `lib/csp.ts`). A fresh random
   nonce per request; only scripts with that nonce run (`'strict-dynamic'`), no `eval` in production,
   `frame-ancestors 'none'`, `object-src 'none'`, `base-uri`/`form-action 'self'`. Even if a bug ever
   let someone inject a `<script>`, the browser would not run it. A browser test visits student,
   lesson and admin pages and fails on any CSP violation.
2. **Production safety checks** (`apps/api/src/config/env.ts`). When `NODE_ENV=production` and
   `APP_ORIGIN` is not `localhost`, the API refuses to start unless: `APP_ORIGIN` is `https://`,
   `COOKIE_SECURE` is not `false`, and the database password is private (16+ characters, not the one
   in `.env.example`). The error names the problem, never the value.
3. **No published passwords on a real server** (`seed/users.ts`). On a real server the seed refuses
   `Admin#2028dev` and the other development passwords from `.env.example` — before, a server set up
   by copying `.env.example` would have had a publicly known admin password.

The local Docker stack (a production build on `http://localhost`) keeps working unchanged.

### Accepted risks (and why)

- **Account lockout by guessing:** 5 wrong passwords lock a username for 15 minutes, so a classmate
  could lock someone out on purpose. Accepted: it stops password guessing, the lock is short, and a
  teacher can reset the password.
- **Dev tool advisory:** `npm audit` reports 4 moderate issues in `esbuild` used by `drizzle-kit`
  (migration generator) — they affect a local development server only; production images contain no
  dev dependencies. The automatic fix is a breaking downgrade; revisit when drizzle-kit updates.
- **Heavy reports are not rate-limited separately:** analytics is cached for 5 minutes; the
  progress report is limited by Nginx (20 req/s per IP) and only open to staff.

### For Phase 18 (production server)

HTTPS with HSTS in Nginx, a Redis password (`requirepass`), firewall (22/80/443 only), and secrets
only in the server's environment — see the production checklist there.
