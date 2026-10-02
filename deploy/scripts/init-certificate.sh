#!/usr/bin/env bash
# Gets the first HTTPS certificate. Run once on a new server, after DNS points to it:
#   ./scripts/init-certificate.sh
# Nginx needs a certificate to start, and Let's Encrypt needs Nginx running to check the domain,
# so: 1) a temporary self-signed certificate, 2) start Nginx, 3) ask Let's Encrypt, 4) reload.
# The certbot service then renews it automatically (cron reloads Nginx daily).
# Settings (deploy/.env): DOMAIN, LETSENCRYPT_EMAIL, LETSENCRYPT_STAGING=1 to test without
# hitting Let's Encrypt's rate limits, TLS_MODE=self-signed for a local test (stops after step 1).
# shellcheck source=lib.sh
. "$(dirname "$0")/lib.sh"

[[ -n "$DOMAIN" ]] || fail "Set DOMAIN in $ENV_FILE"
live="/etc/letsencrypt/live/$DOMAIN"

has_real_cert() {
  compose run --rm --no-deps --entrypoint sh certbot -c \
    "test -f /etc/letsencrypt/renewal/$DOMAIN.conf" >/dev/null 2>&1
}

if [[ "$TLS_MODE" == "letsencrypt" ]] && has_real_cert; then
  log "A Let's Encrypt certificate for $DOMAIN already exists; nothing to do (it renews itself)."
  exit 0
fi

log "Creating a temporary self-signed certificate for $DOMAIN"
compose run --rm --no-deps --entrypoint sh certbot -c "
  mkdir -p '$live' &&
  openssl req -x509 -nodes -newkey rsa:2048 -days 30 \
    -keyout '$live/privkey.pem' -out '$live/fullchain.pem' \
    -subj '/CN=$DOMAIN' -addext 'subjectAltName=DNS:$DOMAIN,DNS:www.$DOMAIN' 2>/dev/null"

if [[ "$TLS_MODE" == "self-signed" ]]; then
  log "TLS_MODE=self-signed: keeping the temporary certificate (local test only)."
  exit 0
fi

email="$(env_value LETSENCRYPT_EMAIL)"
[[ -n "$email" ]] || fail "Set LETSENCRYPT_EMAIL in $ENV_FILE (Let's Encrypt sends expiry warnings there)"
staging=()
[[ "$(env_value LETSENCRYPT_STAGING)" == 1 ]] && staging=(--staging)

log "Starting Nginx so Let's Encrypt can check the domain"
compose up -d nginx

log "Asking Let's Encrypt for $DOMAIN and www.$DOMAIN"
compose run --rm --no-deps --entrypoint sh certbot -c \
  "rm -rf '$live' '/etc/letsencrypt/archive/$DOMAIN' '/etc/letsencrypt/renewal/$DOMAIN.conf'"
compose run --rm --no-deps --entrypoint certbot certbot certonly \
  --webroot -w /var/www/acme -d "$DOMAIN" -d "www.$DOMAIN" \
  --email "$email" --agree-tos --no-eff-email --non-interactive "${staging[@]}"

compose exec nginx nginx -s reload
compose up -d certbot
log "HTTPS is ready: $SITE_URL"
