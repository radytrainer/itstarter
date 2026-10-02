#!/usr/bin/env bash
# Deploys one version (normally run by GitHub Actions over SSH, see docs/DEPLOYMENT.md):
#   ./scripts/deploy.sh v1.2.0
# 1. pull the images  2. safety backup  3. migrate + seed  4. restart  5. check health + version
# If the new version is not healthy, the previous version is started again (rollback).
# Migrations are never undone automatically: write them so the previous version still works
# (add columns/tables first, remove old ones in a later release). The safety backup is there too.
# SKIP_PULL=1 uses images already on this machine (local tests).
# shellcheck source=lib.sh
. "$(dirname "$0")/lib.sh"

version="${1:-}"
[[ "$version" =~ ^[A-Za-z0-9._-]{1,64}$ ]] || fail "Usage: deploy.sh <version>   (e.g. v1.2.0 or sha-1a2b3c4)"
previous="$(env_value APP_VERSION)"
lock="$DEPLOY_DIR/.deploy.lock"

exec 9>"$lock"
# One deploy at a time (flock is on every Linux server; skipped where it doesn't exist).
if command -v flock >/dev/null; then flock -n 9 || fail "Another deploy is running"; fi

compose run --rm --no-deps --entrypoint sh certbot -c "test -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem" \
  >/dev/null 2>&1 || fail "No HTTPS certificate for $DOMAIN yet: run ./scripts/init-certificate.sh first"

free_mb="$(df -Pm "$DEPLOY_DIR" | awk 'NR==2 {print $(NF-2)}')"
[[ "$free_mb" -ge 1024 ]] || fail "Only ${free_mb} MB free disk space; need 1 GB (try: docker image prune -a)"

# GitHub Actions passes the registry path of the images it just built.
if [[ -n "${IMAGE_PREFIX_OVERRIDE:-}" ]]; then set_env_value IMAGE_PREFIX "$IMAGE_PREFIX_OVERRIDE"; fi

log "Deploying $version (now running: ${previous:-nothing})"
set_env_value APP_VERSION "$version"

# Nginx starts fresh after every change: it reads its current config and the app containers' new
# addresses (otherwise it can keep answering 502). Takes about a second.
restart_nginx() {
  compose up -d --no-deps --force-recreate --wait --wait-timeout 60 nginx
}

rollback() {
  local reason="$1"
  if [[ -z "$previous" || "$previous" == "$version" ]]; then
    alert "Deploy of $version FAILED ($reason). No earlier version to go back to."
    exit 1
  fi
  log "Rolling back to $previous ($reason)"
  set_env_value APP_VERSION "$previous"
  if compose up -d --wait --wait-timeout 180 api web nginx && restart_nginx; then
    alert "Deploy of $version FAILED ($reason). Rolled back to $previous, which is running."
  else
    alert "Deploy of $version FAILED ($reason) and the rollback to $previous is NOT healthy. Check now."
  fi
  exit 1
}

if [[ "${SKIP_PULL:-0}" != 1 ]]; then
  log "Pulling images"
  compose pull api web || { set_env_value APP_VERSION "$previous"; fail "Could not pull $version"; }
fi
compose build --quiet backup

if [[ -n "$previous" ]] && compose ps --status running --services 2>/dev/null | grep -qx postgres; then
  log "Safety backup before migrating"
  compose run --rm backup backup || { set_env_value APP_VERSION "$previous"; fail "Backup failed; nothing changed"; }
fi

log "Migrating the database"
compose run --rm tools node apps/api/dist/migrate.js || rollback "migration failed"
log "Updating built-in content (seed)"
compose run --rm tools node apps/api/dist/seed.js || rollback "seed failed"

log "Starting $version"
compose up -d --wait --wait-timeout 180 --remove-orphans || rollback "containers not healthy"
restart_nginx || rollback "Nginx did not start"

log "Checking $SITE_URL"
live=""
for _ in 1 2 3 4 5 6; do
  live="$(site_curl "$SITE_URL/api/health" | sed -n 's/.*"version":"\([^"]*\)".*/\1/p')" || true
  [[ "$live" == "$version" ]] && break
  sleep 5
done
[[ "$live" == "$version" ]] || rollback "the site does not answer with version $version (got '${live:-nothing}')"
site_curl "$SITE_URL/api/health/ready" >/dev/null || rollback "database or cache not reachable"
site_curl -o /dev/null "$SITE_URL/login" || rollback "the login page does not load"

printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$version" >>"$DEPLOY_DIR/deploy-history.log"
docker image prune -f >/dev/null 2>&1 || true
log "Deployed $version — $SITE_URL"
