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
  state="$(docker inspect -f '{{.State.Status}} {{if .State.Health}}{{.State.Health.Status}}{{end}}' \
    "$(compose ps -q "$service" 2>/dev/null | head -n 1)" 2>/dev/null || echo 'missing')"
  [[ "$state" == "running healthy" || "$state" == "running " ]] || problems+=("container $service: ${state:-missing}")
done

# 3. Disk space.
used="$(df -P / | awk 'NR==2 {gsub("%", "", $5); print $5}')"
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

# Alert only on changes.
now="$(printf '%s\n' "${problems[@]:-}" | sed '/^$/d' | sort)"
before="$(cat "$STATE_DIR/problems" 2>/dev/null || true)"
if [[ "$now" != "$before" ]]; then
  if [[ -n "$now" ]]; then
    alert "Problems: $(echo "$now" | paste -sd ';' - | sed 's/;/; /g')"
  else
    alert "All checks OK again."
  fi
  printf '%s' "$now" >"$STATE_DIR/problems"
fi
if [[ -z "$now" ]]; then
  log "All checks OK"
else
  log "Problems: $(echo "$now" | paste -sd ';' -)"
fi
