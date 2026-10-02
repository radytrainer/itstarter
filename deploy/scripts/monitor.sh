#!/usr/bin/env bash
# Health checks, every 5 minutes from cron. Sends a Telegram alert when a problem starts and when
# it is fixed (not every 5 minutes). DRY_RUN=1 prints instead of sending.
#   ./scripts/monitor.sh
# Also set up an outside check (e.g. UptimeRobot on https://DOMAIN/api/health/ready): if the whole
# server is down, this script is down too.
# shellcheck source=lib.sh
. "$(dirname "$0")/lib.sh"

STATE_DIR="${MONITOR_STATE_DIR:-$DEPLOY_DIR/.monitor}"
BACKUP_DIR="$(env_value BACKUP_DIR)"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/itstarter}"
mkdir -p "$STATE_DIR"
problems=()

# 1. The site answers and its database and cache are reachable.
if ! site_curl -o /dev/null "$SITE_URL/api/health/ready"; then
  problems+=("site: $SITE_URL/api/health/ready does not answer OK")
fi

# 2. Every container is running and healthy.
for service in postgres redis api web nginx; do
  id="$(compose ps -a -q "$service" 2>/dev/null | head -n 1)"
  if [[ -z "$id" ]]; then
    problems+=("container $service: not created")
    continue
  fi
  state="$(docker inspect -f '{{.State.Status}} {{if .State.Health}}{{.State.Health.Status}}{{end}}' "$id")"
  [[ "$state" == "running healthy" || "$state" == "running " ]] || problems+=("container $service: $state")
done

# 3. Disk space. "Capacity" is the second-to-last column (device names may contain spaces).
used="$(df -P / | awk 'NR==2 {gsub("%", "", $(NF-1)); print $(NF-1)}')"
[[ "$used" -lt 85 ]] || problems+=("disk: ${used}% used")

# 4. The HTTPS certificate is not about to expire (it renews 30 days before).
if [[ "$TLS_MODE" == "letsencrypt" ]]; then
  end="$(echo | openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" 2>/dev/null |
    openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)"
  if [[ -z "$end" ]]; then
    problems+=("certificate: cannot read it")
  else
    days=$((($(date -d "$end" +%s) - $(date +%s)) / 86400))
    [[ "$days" -ge 14 ]] || problems+=("certificate: expires in $days days")
  fi
fi

# 5. A backup succeeded in the last 26 hours.
if [[ -f "$BACKUP_DIR/last-success" ]]; then
  age_h=$((($(date +%s) - $(cut -d' ' -f1 "$BACKUP_DIR/last-success")) / 3600))
  [[ "$age_h" -lt 26 ]] || problems+=("backup: last good backup is ${age_h} hours old")
else
  problems+=("backup: no successful backup yet")
fi

# Alert only when WHICH checks fail changes (not when a number in the message changes).
now="$(printf '%s\n' "${problems[@]:-}" | sed '/^$/d' | sort)"
failing="$(printf '%s\n' "$now" | cut -d: -f1 | sed '/^$/d')"
before="$(cat "$STATE_DIR/failing" 2>/dev/null || true)"
if [[ "$failing" != "$before" ]]; then
  if [[ -n "$now" ]]; then
    alert "Problems: $(echo "$now" | paste -sd ';' - | sed 's/;/; /g')"
  else
    alert "All checks OK again."
  fi
  printf '%s' "$failing" >"$STATE_DIR/failing"
fi
if [[ -z "$now" ]]; then
  log "All checks OK"
else
  log "Problems: $(echo "$now" | paste -sd ';' -)"
fi
