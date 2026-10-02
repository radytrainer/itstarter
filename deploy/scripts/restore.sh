#!/usr/bin/env bash
# Puts a backup back into the LIVE database (e.g. after a mistake or on a new server):
#   ./scripts/restore.sh latest          or   ./scripts/restore.sh itstarter-20281002-020000.dump.enc
# Takes a safety backup first, stops the app (students see "restarting"), restores, clears the
# cache and starts the app again. Asks you to type the domain to confirm.
# shellcheck source=lib.sh
. "$(dirname "$0")/lib.sh"

file="${1:-}"
[[ -n "$file" ]] || fail "Usage: restore.sh <backup file|latest>   (see ./scripts/backup.sh list)"

if [[ "${YES:-0}" != 1 ]]; then
  echo "This REPLACES all data on $DOMAIN with the backup '$file'."
  echo "Everything students did after that backup will be lost (a safety backup is taken first)."
  read -r -p "Type the domain ($DOMAIN) to continue: " answer
  [[ "$answer" == "$DOMAIN" ]] || fail "Cancelled"
fi

log "Safety backup of the current data"
compose run --rm backup backup || fail "Safety backup failed; nothing changed"

log "Stopping the app"
compose stop web api

restored=0
compose run --rm backup restore "$file" --yes-replace-live-database && restored=1

log "Clearing the cache"
# shellcheck disable=SC2016 # $REDIS_PASSWORD is expanded inside the Redis container
compose exec -T redis sh -c 'REDISCLI_AUTH="$REDIS_PASSWORD" redis-cli FLUSHALL' >/dev/null

log "Starting the app"
compose up -d --wait --wait-timeout 180 api web

if [[ "$restored" == 1 ]]; then
  log "Restore finished: $SITE_URL"
else
  alert "Restore of $file FAILED; the app is running with the data it had before."
  exit 1
fi
