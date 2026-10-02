#!/usr/bin/env bash
# Deploy straight from a git clone on the server (no GitHub Actions needed):
#   cd /opt/itstarter && git pull && ./deploy/scripts/build-and-deploy.sh
#   ./deploy/scripts/build-and-deploy.sh v1.2.0      (optional: a version name of your choice)
# Builds the API and web images from this checkout, then runs scripts/deploy.sh with them
# (safety backup, migrate, seed, health/version check, automatic rollback).
# Building needs ~2 GB of memory: the swap file from bootstrap-server.sh covers small servers.
# shellcheck source=lib.sh
. "$(dirname "$0")/lib.sh"

REPO_DIR="$(cd "$DEPLOY_DIR/.." && pwd)"
git_() { git -C "$REPO_DIR" "$@"; }
commit="$(git_ rev-parse --short=7 HEAD)"
version="${1:-$(git_ describe --tags --exact-match 2>/dev/null || echo "sha-$commit")}"
[[ "$version" =~ ^[A-Za-z0-9._-]{1,64}$ ]] || fail "Version '$version' may only contain letters, digits, '.', '_' and '-'"
if [[ -n "$(git_ status --porcelain --untracked-files=no)" ]]; then
  log "Note: this checkout has local changes; they are included in $version"
fi

prefix="itstarter-local"
log "Building $version (commit $commit) — this takes a few minutes"
docker build --quiet -t "$prefix/api:$version" -f "$REPO_DIR/apps/api/Dockerfile" "$REPO_DIR" >/dev/null
docker build --quiet -t "$prefix/web:$version" -f "$REPO_DIR/apps/web/Dockerfile" "$REPO_DIR" >/dev/null
set_env_value IMAGE_PREFIX "$prefix"

SKIP_PULL=1 exec "$DEPLOY_DIR/scripts/deploy.sh" "$version"
