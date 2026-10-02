# Deployment and operations (OVHcloud)

How IT Starter 2028 runs in production at **https://itstarter.store**, how to set up a new server,
deploy, back up, restore, and watch it. Everything for the server lives in [`deploy/`](../deploy).

```
Internet ──443/80──▶ Nginx (HTTPS, HSTS, rate limit) ──▶ web (Next.js) ──▶ API (Fastify) ──▶ PostgreSQL
                     certbot renews the certificate                          └──────────▶ Redis (password)
cron: nightly encrypted backup ──▶ /var/backups/itstarter ──▶ OVH Object Storage (off-site)
```

Only ports 22, 80 and 443 are open. The database and Redis are not published at all.

## 1. One-time setup

### 1.1 Order and prepare

- **Server:** OVHcloud VPS, Ubuntu 24.04, 2–4 vCPU and 4 GB RAM is plenty for one school. The Singapore region is closest to Cambodia.
- **Off-site backups:** OVHcloud Public Cloud → Object Storage → create a bucket (e.g.
  `itstarter-backups`, region `sgp`) and an S3 user. Note the endpoint, access key and secret.
- **DNS** at your registrar: `A itstarter.store → server IPv4` and `A www.itstarter.store → same`.
  (AAAA records too if the server has IPv6.)
- **Staging (recommended):** a second, smaller VPS with `staging.itstarter.store`, set up the same way.
  Every release goes to staging first.

### 1.2 Prepare the server (as root, once)

```bash
scp deploy/scripts/bootstrap-server.sh ubuntu@SERVER:
ssh ubuntu@SERVER "sudo SSH_PUBKEY='$(cat ~/.ssh/id_ed25519.pub; cat deploy_key.pub)' bash bootstrap-server.sh"
```

The **first key is yours**: your admin account (`ubuntu` on OVH) keeps it, with `sudo`. **All keys**
may log in as `deploy`, which runs the app with Docker but has no `sudo`. So the GitHub deploy key
can deploy but cannot take over the server.

This sets up the following; after it, log in as `deploy@SERVER`, because root and password logins are off:

- system updates and automatic security updates;
- time zone Asia/Phnom_Penh, plus swap;
- Docker;
- the `deploy` user (SSH key only);
- the firewall and fail2ban;
- folders and scheduled jobs (§4).

### 1.3 GitHub

In the repository go to Settings → Environments, and create **staging** and **production**. Give
production at least one _Required reviewer_, so nobody deploys to production by accident.

| Per environment               | Value                                                                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Variable `DOMAIN`             | `itstarter.store` (or `staging.itstarter.store`)                                                                                   |
| Secret `SSH_HOST`             | server IP                                                                                                                          |
| Secret `SSH_USER`             | `deploy`                                                                                                                           |
| Secret `SSH_PRIVATE_KEY`      | a key made only for deploys (`ssh-keygen -t ed25519 -f deploy_key`); add its `.pub` to the server's `~deploy/.ssh/authorized_keys` |
| Secret `SSH_KNOWN_HOSTS`      | output of `ssh-keyscan -t ed25519 SERVER`                                                                                          |
| Secret `SMOKE_ADMIN_PASSWORD` | the admin password (for the read-only check after each deploy)                                                                     |

Images go to GitHub's registry (`ghcr.io/<owner>/<repo>`). The deploy job lends the server its
short-lived token to pull them, and removes it afterwards: no long-lived registry password sits on the server.

### 1.4 Files and settings on the server

From your computer, copy the deploy files once (later deploys copy them automatically):

```bash
scp -r deploy deploy@SERVER:/opt/itstarter/       # (rsync works too, where installed)
ssh deploy@SERVER "mkdir -p /opt/itstarter/infra/nginx"
scp -r infra/nginx/snippets deploy@SERVER:/opt/itstarter/infra/nginx/
```

Then on the server:

```bash
ssh deploy@SERVER
cd /opt/itstarter/deploy && cp .env.example .env && nano .env
```

Fill in **every** value. Generate each secret with `openssl rand -hex 24`. Store `BACKUP_PASSPHRASE`, the
database password and the admin password in a password manager: **without the passphrase, no
backup can ever be restored.**

### 1.5 Certificate, then the first deploy

1. Once DNS points to the server: `./scripts/init-certificate.sh`. The first time, certbot answers
   Let's Encrypt itself on port 80. Tip: set `LETSENCRYPT_STAGING=1` in `.env` for a first try,
   then set it back to `0`, delete the test certificate (`docker volume rm itstarter_certs`) and run
   the script again.
2. In GitHub, go to Actions → Deploy → Run workflow and choose this environment. It runs migrations,
   seeds the lessons and the admin account, starts the app and smoke-tests it. Deploying before the
   certificate exists stops right away with a clear message.
3. Open https://itstarter.store, log in as `admin` and **change the admin password**.
4. Add an outside uptime check (e.g. UptimeRobot, free) on `https://itstarter.store/api/health/ready`.

## 1b. Or: deploy straight from a git clone (no GitHub Actions)

The server builds the images itself. Same safety as above: safety backup, migrate, seed, health
check and automatic rollback.
```bash
ssh deploy@SERVER
git clone https://github.com/radytrainer/itstarter.git /opt/itstarter
cd /opt/itstarter
cp deploy/.env.example deploy/.env && nano deploy/.env   # or copy your prepared server.env here
./deploy/scripts/init-certificate.sh                        # once, after DNS points to the server
./deploy/scripts/build-and-deploy.sh                        # build + deploy this commit
```
Updating later:
```bash
cd /opt/itstarter && git pull && ./deploy/scripts/build-and-deploy.sh
```
Use a version tag (`git checkout v1.2.0`) to deploy a release. Going back means checking out the
older tag and running the script again (its images are still on the server).



**Staging:** go to Actions → Deploy → Run workflow and choose staging. It deploys the selected branch or tag.

**Production:** tag a release that passed on staging:

```bash
git tag v1.3.0 && git push origin v1.3.0      # → Deploy workflow → reviewer approves
```

Each run goes through these steps:

1. **All of CI.**
2. **Build the images once.**
3. **Copy** `deploy/` to the server.
4. **Run `deploy.sh`**, which:
   1. pulls the images;
   2. takes a **safety backup**;
   3. migrates and seeds;
   4. restarts;
   5. checks that the site answers with the new version, is ready, and serves the login page.
5. **Smoke test** the live site in a real browser: HTTPS, headers, admin login with a secure cookie, and the admin pages.

**If the new version isn't healthy, `deploy.sh` starts the previous version again by itself** and
sends an alert. To go back on purpose, deploy an older tag (Run workflow on that tag), or on the server:
`./scripts/deploy.sh v1.2.0`.

> **Migrations are never undone automatically.** Write them so the previous version still works:
> add tables and columns first, and remove old ones only in a later release. The safety backup is
> the last resort.

## 3. Backups and restoring

| What                       | When                                       | Where                                                             |
| -------------------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| Encrypted backup (AES-256) | every night 02:00, and before every deploy | `/var/backups/itstarter` (14 days) + OVH Object Storage (60 days) |
| Restore drill              | 1st of every month 03:30                   | restores the newest backup into a scratch database and checks it  |

```bash
cd /opt/itstarter/deploy
./scripts/backup.sh list               # what exists, here and off-site
./scripts/backup.sh backup             # one now
./scripts/backup.sh drill              # prove the newest backup restores (live data untouched)
./scripts/restore.sh latest            # PUT A BACKUP BACK into the live site (asks to confirm)
./scripts/restore.sh itstarter-20281002-020000.dump.enc
```

`restore.sh` first takes a safety backup. It then stops the app (students see "restarting"), restores
in one transaction (a failed restore changes nothing), clears the cache and starts the app again.

**The server is lost?** Set up a new one (§1). Put the same `BACKUP_PASSPHRASE` and S3 settings in
`.env`, deploy, then run `./scripts/restore.sh latest`: it downloads the newest backup from OVH
Object Storage.

## 4. Watching it

| Check                                     | How often | Alert                           |
| ----------------------------------------- | --------- | ------------------------------- |
| Site ready (database and cache reachable) | 5 min     | Telegram                        |
| All containers running and healthy        | 5 min     | Telegram                        |
| Disk over 85%                             | 5 min     | Telegram                        |
| Certificate expires within 14 days        | 5 min     | Telegram                        |
| No good backup in 26 h                    | 5 min     | Telegram                        |
| Server completely down                    | 1–5 min   | the outside uptime check (§1.5) |

Alerts come when a problem **starts** and when it is **fixed**, not every 5 minutes. To set up
Telegram, create a bot with @BotFather, then put `ALERT_TELEGRAM_BOT_TOKEN` and `ALERT_TELEGRAM_CHAT_ID`
in `.env`.

Logs:

```bash
docker compose -p itstarter -f docker-compose.prod.yml --env-file .env logs --tail=200 api
less /var/log/itstarter/backup.log      # backups and drills
less /var/log/itstarter/monitor.log     # checks
cat  /opt/itstarter/deploy/deploy-history.log
```

Container logs rotate at 5 × 10 MB, and the script logs rotate weekly.

## 5. Security on the server

- **HTTPS only.** HSTS lasts 1 year; TLS 1.2 and 1.3 only; HTTP redirects to HTTPS; www redirects to the bare domain.
- **The app refuses unsafe settings on a real server:** plain HTTP, insecure cookies, a missing or published database password, or a Redis password shorter than 16 characters. The seed refuses the published demo passwords.
- **Locked-down access.** SSH by key only, no root login, fail2ban, firewall with only 22/80/443, automatic security updates.
- **Secrets stay on the server.** They exist only in `/opt/itstarter/deploy/.env` (never in Git or images). Backups are encrypted before they leave the database container.
- **Docker note:** Docker publishes ports outside `ufw`. The production stack publishes only 80 and 443, so the database and Redis stay unreachable from outside.

## 6. What was tested, and how

Tested on a development PC (2026-10-02). The exact production stack ran locally as "staging" on
`https://localhost:8443` with a temporary certificate, with MinIO standing in for OVH Object Storage:

- Deploying before a certificate exists stops with a clear message.
- First deploy, upgrade (with safety backup), and **automatic rollback** of a broken version.
- HTTPS redirect, TLS 1.1 refused while 1.2 and 1.3 are accepted, security headers, the Redis password, no database or Redis ports.
- Backup → off-site copy → **restore drill**, including one with every local backup removed (downloaded off-site). A wrong passphrase fails clearly.
- **Real restore:** data added after a backup was gone after restoring, and the app came back healthy.
- Monitor: alerts on start and on recovery, with no repeats.
- Smoke test (browser) against the HTTPS site.
- `shellcheck` on every script, and `actionlint` on both workflows.
- `bootstrap-server.sh` in an Ubuntu 24.04 container, twice. Users, keys, sudo rights, the SSH
  config, folders, cron and logrotate were real; systemd, the firewall, swap and the Docker install
  were stand-ins.

Not yet tested, because it needs the real server and accounts:

- Let's Encrypt itself (both the first certificate on port 80 and renewal through Nginx).
- The GitHub Actions runs.
- `bootstrap-server.sh` on a real OVH VPS (firewall, swap, Docker install, systemd).
- Telegram delivery.
- OVH Object Storage itself (MinIO speaks the same S3 protocol).

Do these on the staging server first, and keep a short log of the results.
