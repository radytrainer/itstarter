#!/usr/bin/env bash
# Reloads Nginx so it serves a renewed certificate (daily from cron; harmless when nothing changed).
# shellcheck source=lib.sh
. "$(dirname "$0")/lib.sh"
compose exec -T nginx nginx -s reload && log "Nginx reloaded"
