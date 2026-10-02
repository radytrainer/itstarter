#!/usr/bin/env bash
# Backups from the host (used by cron, see bootstrap-server.sh):
#   ./scripts/backup.sh backup        encrypted backup now (+ off-site copy)
#   ./scripts/backup.sh drill         restore the newest backup into a scratch database and check it
#   ./scripts/backup.sh list          backups on the server and off-site
# To put a backup back into the live database use ./scripts/restore.sh.
# shellcheck source=lib.sh
. "$(dirname "$0")/lib.sh"

case "${1:-}" in
  backup | drill | list | fetch) ;;
  *) fail "Usage: backup.sh backup | drill [file] | list | fetch <file>" ;;
esac

if compose run --rm backup "$@"; then
  exit 0
fi
alert "Backup job '$1' FAILED on $(hostname). Check: ./scripts/backup.sh $1"
exit 1
