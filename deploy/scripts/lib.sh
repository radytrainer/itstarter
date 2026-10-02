#!/usr/bin/env bash
# Shared helpers for the deploy scripts. Source it: . "$(dirname "$0")/lib.sh"
set -euo pipefail

DEPLOY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ENV_FILE:-$DEPLOY_DIR/.env}"
[[ -f "$ENV_FILE" ]] || {
  echo "Missing $ENV_FILE — copy deploy/.env.example and fill it in." >&2
  exit 1
}

# Read the settings (DOMAIN, APP_VERSION, …) without running anything else from the file.
# A missing key gives an empty value (not an error that would stop the script).
env_value() {
  { grep -E "^$1=" "$ENV_FILE" || true; } | tail -n 1 | cut -d= -f2- | sed -e "s/^['\"]//" -e "s/['\"]$//"
}
DOMAIN="$(env_value DOMAIN)"
PUBLIC_PORT_SUFFIX="$(env_value PUBLIC_PORT_SUFFIX)"
COMPOSE_PROJECT="${COMPOSE_PROJECT:-$(env_value COMPOSE_PROJECT)}"
COMPOSE_PROJECT="${COMPOSE_PROJECT:-itstarter}"
# "letsencrypt" on a real server; "self-signed" for a local HTTPS test.
TLS_MODE="$(env_value TLS_MODE)"
TLS_MODE="${TLS_MODE:-letsencrypt}"
# shellcheck disable=SC2034 # used by the scripts that source this file
SITE_URL="https://${DOMAIN}${PUBLIC_PORT_SUFFIX}"

compose() {
  local profiles=()
  [[ "$TLS_MODE" == "letsencrypt" ]] && profiles=(--profile tls)
  docker compose -p "$COMPOSE_PROJECT" -f "$DEPLOY_DIR/docker-compose.prod.yml" \
    --env-file "$ENV_FILE" "${profiles[@]}" "$@"
}

log() { printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" >&2; }
fail() {
  log "ERROR: $*"
  exit 1
}

# curl for our own site (accepts the temporary certificate of a local HTTPS test).
site_curl() {
  local insecure=()
  [[ "$TLS_MODE" == "self-signed" ]] && insecure=(--insecure)
  curl --silent --show-error --fail --max-time 10 "${insecure[@]}" "$@"
}

set_env_value() {
  # Replace (or add) KEY=value in the env file, keeping everything else as it is.
  local key="$1" value="$2" tmp
  tmp="$(mktemp)"
  grep -vE "^$key=" "$ENV_FILE" >"$tmp" || true
  printf '%s=%s\n' "$key" "$value" >>"$tmp"
  cat "$tmp" >"$ENV_FILE"
  rm -f "$tmp"
}

# Sends an alert to Telegram when configured (ALERT_TELEGRAM_BOT_TOKEN + ALERT_TELEGRAM_CHAT_ID).
alert() {
  local text="[$DOMAIN] $*" token chat
  token="$(env_value ALERT_TELEGRAM_BOT_TOKEN)"
  chat="$(env_value ALERT_TELEGRAM_CHAT_ID)"
  log "ALERT: $*"
  if [[ "${DRY_RUN:-0}" == 1 || -z "$token" || -z "$chat" ]]; then return 0; fi
  curl --silent --max-time 10 -o /dev/null \
    --data-urlencode "chat_id=$chat" --data-urlencode "text=$text" \
    "https://api.telegram.org/bot$token/sendMessage" || log "Could not send the alert"
}
