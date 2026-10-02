#!/usr/bin/env bash
# Encrypted PostgreSQL backups, off-site copies, and restore drills.
# Runs inside the "backup" container (see deploy/docker-compose.prod.yml):
#
#   backup.sh backup               dump → encrypt → /backups (+ OVH Object Storage), prune old ones
#   backup.sh list                 backups on the server and off-site
#   backup.sh fetch <file|latest>  download an off-site backup to /backups
#   backup.sh drill [file|latest]  restore into a scratch database and check it (live data untouched)
#   backup.sh restore <file> --yes-replace-live-database
#                                  replace the live database (stop the API first: scripts/restore.sh)
#
# Backups are encrypted with AES-256 (key derived from BACKUP_PASSPHRASE with PBKDF2). Without the
# passphrase a backup cannot be read — keep it in a password manager, not only on the server.
set -euo pipefail

BACKUP_DIR=/backups
KEEP_DAYS="${BACKUP_KEEP_DAYS:-14}"
REMOTE_KEEP_DAYS="${BACKUP_REMOTE_KEEP_DAYS:-60}"
PREFIX="itstarter"
SCRATCH_DB="${PGDATABASE}_restore_check"
OPENSSL_ARGS=(-aes-256-cbc -pbkdf2 -iter 200000 -md sha256)

# Messages go to stderr, so functions can return values on stdout.
log() { printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" >&2; }
fail() {
  log "ERROR: $*"
  exit 1
}

# One work folder per run, always removed; a drill's scratch database is always dropped.
TMP="$(mktemp -d)"
DROP_SCRATCH=0
cleanup() {
  rm -rf "$TMP"
  if [[ "$DROP_SCRATCH" == 1 ]]; then
    psql -q -d postgres -c "drop database if exists \"$SCRATCH_DB\"" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

[[ -n "${BACKUP_PASSPHRASE:-}" ]] || fail "BACKUP_PASSPHRASE is not set"
[[ ${#BACKUP_PASSPHRASE} -ge 20 ]] || fail "BACKUP_PASSPHRASE must be at least 20 characters"

# ---------- Off-site storage (S3-compatible: OVH Object Storage) ----------
remote_enabled() { [[ -n "${S3_BUCKET:-}" ]]; }
if remote_enabled; then
  : "${S3_ENDPOINT:?S3_ENDPOINT is required with S3_BUCKET}"
  : "${S3_ACCESS_KEY_ID:?S3_ACCESS_KEY_ID is required with S3_BUCKET}"
  : "${S3_SECRET_ACCESS_KEY:?S3_SECRET_ACCESS_KEY is required with S3_BUCKET}"
  # rclone reads its whole configuration from these variables (nothing written to disk).
  export RCLONE_CONFIG_OFFSITE_TYPE=s3
  export RCLONE_CONFIG_OFFSITE_PROVIDER=Other
  export RCLONE_CONFIG_OFFSITE_ENDPOINT="$S3_ENDPOINT"
  export RCLONE_CONFIG_OFFSITE_REGION="${S3_REGION:-}"
  export RCLONE_CONFIG_OFFSITE_ACCESS_KEY_ID="$S3_ACCESS_KEY_ID"
  export RCLONE_CONFIG_OFFSITE_SECRET_ACCESS_KEY="$S3_SECRET_ACCESS_KEY"
  export RCLONE_CONFIG_OFFSITE_FORCE_PATH_STYLE=true
  export RCLONE_CONFIG_OFFSITE_NO_CHECK_BUCKET=true
fi
REMOTE="offsite:${S3_BUCKET:-}"
# Quiet tools: only real problems are printed.
export RCLONE_LOG_LEVEL=ERROR
export PGOPTIONS='-c client_min_messages=warning'

latest_local() { find "$BACKUP_DIR" -maxdepth 1 -name "${PREFIX}-*.dump.enc" -printf '%f\n' | sort | tail -n 1; }
latest_remote() { rclone lsf "$REMOTE" --include "${PREFIX}-*.dump.enc" | sort | tail -n 1; }

resolve() {
  # A file name or "latest" → a file in /backups (downloads it if it is only off-site).
  local name="${1:-latest}"
  if [[ "$name" == "latest" ]]; then
    name="$(latest_local)"
    if [[ -z "$name" ]] && remote_enabled; then name="$(latest_remote)"; fi
    [[ -n "$name" ]] || fail "No backups found"
  fi
  if [[ ! -f "$BACKUP_DIR/$name" ]]; then
    remote_enabled || fail "$name is not in $BACKUP_DIR"
    log "Downloading $name from off-site storage"
    rclone copy "$REMOTE/$name" "$BACKUP_DIR" --no-traverse
    rclone copy "$REMOTE/$name.sha256" "$BACKUP_DIR" --no-traverse
  fi
  (cd "$BACKUP_DIR" && sha256sum -c --quiet "$name.sha256") || fail "$name is damaged (checksum mismatch)"
  printf '%s' "$name"
}

decrypt_to() {
  openssl enc -d "${OPENSSL_ARGS[@]}" -pass env:BACKUP_PASSPHRASE -in "$BACKUP_DIR/$1" -out "$2" ||
    fail "Cannot decrypt $1 (wrong BACKUP_PASSPHRASE?)"
}

# ---------- Commands ----------
cmd_backup() {
  local stamp file tmp="$TMP" size
  stamp="$(date '+%Y%m%d-%H%M%S')"
  file="${PREFIX}-${stamp}.dump.enc"

  log "Dumping database $PGDATABASE"
  pg_dump --format=custom --compress=6 --no-owner --file="$tmp/db.dump"
  pg_restore --list "$tmp/db.dump" >/dev/null || fail "The dump cannot be read back"

  openssl enc -e "${OPENSSL_ARGS[@]}" -salt -pass env:BACKUP_PASSPHRASE \
    -in "$tmp/db.dump" -out "$BACKUP_DIR/$file.partial"
  mv "$BACKUP_DIR/$file.partial" "$BACKUP_DIR/$file"
  (cd "$BACKUP_DIR" && sha256sum "$file" >"$file.sha256")
  size="$(du -h "$BACKUP_DIR/$file" | cut -f1)"
  log "Saved $file ($size, encrypted)"

  if remote_enabled; then
    log "Copying to off-site storage ($S3_BUCKET)"
    rclone copy "$BACKUP_DIR/$file" "$REMOTE" --no-traverse
    rclone copy "$BACKUP_DIR/$file.sha256" "$REMOTE" --no-traverse
    rclone delete "$REMOTE" --min-age "${REMOTE_KEEP_DAYS}d" --include "${PREFIX}-*"
  else
    log "Off-site storage not configured (S3_BUCKET empty): backup kept on this server only"
  fi

  find "$BACKUP_DIR" -maxdepth 1 -name "${PREFIX}-*" -mtime +"$KEEP_DAYS" -print -delete |
    sed 's/^/Removed old backup: /' >&2
  # Read by scripts/monitor.sh: alert when the last good backup is too old.
  printf '%s %s\n' "$(date '+%s')" "$file" >"$BACKUP_DIR/last-success"
  log "Backup finished"
}

cmd_list() {
  log "On this server ($BACKUP_DIR):"
  find "$BACKUP_DIR" -maxdepth 1 -name "${PREFIX}-*.dump.enc" -printf '  %f  %s bytes\n' | sort
  if remote_enabled; then
    log "Off-site ($S3_BUCKET):"
    rclone lsl "$REMOTE" --include "${PREFIX}-*.dump.enc" | sort -k4 | sed 's/^/  /'
  fi
}

cmd_fetch() {
  remote_enabled || fail "Off-site storage is not configured"
  local name="${1:-latest}"
  [[ "$name" != "latest" ]] || name="$(latest_remote)"
  rclone copy "$REMOTE/$name" "$BACKUP_DIR" --no-traverse
  rclone copy "$REMOTE/$name.sha256" "$BACKUP_DIR" --no-traverse
  (cd "$BACKUP_DIR" && sha256sum -c "$name.sha256")
}

count_rows() {
  psql --dbname="$1" -At -c "select
    (select count(*) from users) || ' ' ||
    (select count(*) from lessons where deleted_at is null) || ' ' ||
    (select count(*) from questions) || ' ' ||
    (select count(*) from student_activity_attempts) || ' ' ||
    (select count(*) from xp_transactions)"
}

cmd_drill() {
  local name tmp="$TMP"
  name="$(resolve "${1:-latest}")"
  DROP_SCRATCH=1

  log "Restore drill with $name (into $SCRATCH_DB; live data is not touched)"
  decrypt_to "$name" "$tmp/db.dump"
  psql -q -d postgres -c "drop database if exists \"$SCRATCH_DB\"" -c "create database \"$SCRATCH_DB\""
  pg_restore --no-owner --exit-on-error --dbname="$SCRATCH_DB" "$tmp/db.dump"

  read -r users lessons questions attempts xp <<<"$(count_rows "$SCRATCH_DB")"
  read -r live_users live_lessons live_questions live_attempts live_xp <<<"$(count_rows "$PGDATABASE")"
  log "Restored: $users users, $lessons lessons, $questions questions, $attempts answers, $xp XP entries"
  log "Live now: $live_users users, $live_lessons lessons, $live_questions questions, $live_attempts answers, $live_xp XP entries"
  [[ "$users" -gt 0 && "$lessons" -gt 0 && "$questions" -gt 0 ]] || fail "The restored database is empty"
  # Live data only grows between a backup and now (students keep learning).
  [[ "$attempts" -le "$live_attempts" && "$xp" -le "$live_xp" ]] ||
    fail "The backup has MORE data than live — check which database is which"
  printf '%s %s\n' "$(date '+%s')" "$name" >"$BACKUP_DIR/last-drill"
  log "Restore drill PASSED"
}

cmd_restore() {
  local name="${1:-}" tmp
  [[ -n "$name" && "${2:-}" == "--yes-replace-live-database" ]] ||
    fail "Usage: backup.sh restore <file|latest> --yes-replace-live-database"
  name="$(resolve "$name")"
  tmp="$TMP"
  decrypt_to "$name" "$tmp/db.dump"
  log "Replacing the live database $PGDATABASE with $name"
  pg_restore --clean --if-exists --no-owner --exit-on-error --single-transaction \
    --dbname="$PGDATABASE" "$tmp/db.dump"
  log "Restore finished: $(count_rows "$PGDATABASE" | awk '{print $1" users, "$2" lessons, "$4" answers"}')"
}

case "${1:-help}" in
  backup) cmd_backup ;;
  list) cmd_list ;;
  fetch) cmd_fetch "${2:-latest}" ;;
  drill) cmd_drill "${2:-latest}" ;;
  restore) cmd_restore "${2:-}" "${3:-}" ;;
  *) sed -n '2,13p' "$0" | sed 's/^# \{0,1\}//' ;;
esac
