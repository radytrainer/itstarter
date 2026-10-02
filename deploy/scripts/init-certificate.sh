#!/usr/bin/env bash
# Gets the HTTPS certificate. Run once on a new server, after DNS points to it and BEFORE the first
# deploy:   ./scripts/init-certificate.sh
# - First time (Nginx not running yet): certbot answers Let's Encrypt itself on port 80.
# - Nginx already running (e.g. the domain changed): through Nginx, then Nginx reloads.
# Renewals are automatic afterwards (certbot service, through Nginx; cron reloads Nginx daily).
# Settings (deploy/.env): DOMAIN, LETSENCRYPT_EMAIL, LETSENCRYPT_STAGING=1 to test against Let's
# Encrypt's test servers first, TLS_MODE=self-signed for a local test (temporary certificate only).
# shellcheck source=lib.sh
. "$(dirname "$0")/lib.sh"

[[ -n "$DOMAIN" ]] || fail "Set DOMAIN in $ENV_FILE"
live="/etc/letsencrypt/live/$DOMAIN"
certbot_sh() { compose run --rm --no-deps --entrypoint sh certbot -c "$1"; }

if [[ "$TLS_MODE" == "self-signed" ]]; then
  log "TLS_MODE=self-signed: creating a temporary certificate for $DOMAIN (local test only)"
  certbot_sh "mkdir -p '$live' && openssl req -x509 -nodes -newkey rsa:2048 -days 30 \
    -keyout '$live/privkey.pem' -out '$live/fullchain.pem' -subj '/CN=$DOMAIN' \
    -addext 'subjectAltName=DNS:$DOMAIN,DNS:www.$DOMAIN' 2>/dev/null"
  exit 0
fi

if certbot_sh "test -f /etc/letsencrypt/renewal/$DOMAIN.conf" >/dev/null 2>&1; then
  log "A Let's Encrypt certificate for $DOMAIN already exists; nothing to do (it renews itself)."
  exit 0
fi

email="$(env_value LETSENCRYPT_EMAIL)"
[[ -n "$email" ]] || fail "Set LETSENCRYPT_EMAIL in $ENV_FILE (Let's Encrypt sends expiry warnings there)"
args=(certonly -d "$DOMAIN" -d "www.$DOMAIN" --email "$email" --agree-tos --no-eff-email --non-interactive)
[[ "$(env_value LETSENCRYPT_STAGING)" == 1 ]] && args+=(--staging)
# Remove a leftover temporary certificate, which would block the real one.
certbot_sh "rm -rf '$live' '/etc/letsencrypt/archive/$DOMAIN'"

if compose ps --status running --services 2>/dev/null | grep -qx nginx; then
  log "Asking Let's Encrypt for $DOMAIN (through the running Nginx)"
  compose run --rm --no-deps --entrypoint certbot certbot "${args[@]}" --webroot -w /var/www/acme
  compose exec -T nginx nginx -s reload
else
  log "Asking Let's Encrypt for $DOMAIN (certbot answers on port 80 itself)"
  compose run --rm --no-deps -p "$(env_value HTTP_PORT | grep . || echo 80):80" \
    --entrypoint certbot certbot "${args[@]}" --standalone
fi
log "Certificate ready. Renewals use Nginx from now on; next: deploy a version."
