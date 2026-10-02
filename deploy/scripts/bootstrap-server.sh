#!/usr/bin/env bash
# One-time setup of a fresh OVHcloud VPS (Ubuntu 24.04). Run as root, once:
#   SSH_PUBKEY="ssh-ed25519 AAAA... you@laptop" bash bootstrap-server.sh
# What it does (safe to run again):
#   - updates the system, turns on automatic security updates
#   - time zone Asia/Phnom_Penh, a 2 GB swap file on small servers
#   - installs Docker (official packages)
#   - creates the "deploy" user (SSH key only, may run Docker), then turns off SSH passwords and root login
#   - firewall: only SSH, HTTP and HTTPS; fail2ban against SSH password guessing
#   - folders /opt/itstarter, /var/backups/itstarter, /var/log/itstarter
#   - scheduled jobs: nightly backup, monthly restore drill, monitoring, certificate reload, cleanup
set -euo pipefail

DEPLOY_USER="${DEPLOY_USER:-deploy}"
APP_DIR=/opt/itstarter
SSH_PUBKEY="${SSH_PUBKEY:-}"

[[ "$(id -u)" == 0 ]] || { echo "Run as root (sudo -i)." >&2; exit 1; }
# shellcheck source=/dev/null
. /etc/os-release
[[ "$ID" == ubuntu ]] || { echo "Written for Ubuntu (this is $PRETTY_NAME)." >&2; exit 1; }
say() { printf '\n==> %s\n' "$*"; }

say "System updates"
export DEBIAN_FRONTEND=noninteractive
apt-get update -q
apt-get upgrade -yq
apt-get install -yq ca-certificates curl gnupg ufw fail2ban unattended-upgrades openssl jq util-linux
dpkg-reconfigure -f noninteractive unattended-upgrades

say "Time zone and swap"
timedatectl set-timezone Asia/Phnom_Penh
if ! swapon --show | grep -q .; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile >/dev/null && swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >>/etc/fstab
  sysctl -q vm.swappiness=10 && echo 'vm.swappiness=10' >/etc/sysctl.d/99-itstarter.conf
fi

say "Docker"
if ! command -v docker >/dev/null; then
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $VERSION_CODENAME stable" \
    >/etc/apt/sources.list.d/docker.list
  apt-get update -q
  apt-get install -yq docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi
systemctl enable --now docker

say "User $DEPLOY_USER"
id "$DEPLOY_USER" >/dev/null 2>&1 || adduser --disabled-password --gecos "" "$DEPLOY_USER"
usermod -aG docker "$DEPLOY_USER"
install -d -m 700 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"
keys="/home/$DEPLOY_USER/.ssh/authorized_keys"
touch "$keys"
if [[ -n "$SSH_PUBKEY" ]] && ! grep -qF "$SSH_PUBKEY" "$keys"; then echo "$SSH_PUBKEY" >>"$keys"; fi
chown "$DEPLOY_USER:$DEPLOY_USER" "$keys" && chmod 600 "$keys"

say "SSH: keys only, no root login"
if [[ -s "$keys" ]]; then
  cat >/etc/ssh/sshd_config.d/99-itstarter.conf <<'SSHD'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
SSHD
  sshd -t && systemctl reload ssh
else
  echo "!! No SSH key for $DEPLOY_USER yet: SSH passwords and root login are still ON."
  echo "!! Run again with SSH_PUBKEY=\"...\" to lock them down."
fi

say "Firewall and fail2ban"
ufw default deny incoming >/dev/null
ufw default allow outgoing >/dev/null
ufw allow OpenSSH >/dev/null
ufw allow 80/tcp >/dev/null
ufw allow 443/tcp >/dev/null
ufw --force enable >/dev/null
# Docker publishes only ports 80/443 (the database and Redis are not published at all).
systemctl enable --now fail2ban

say "Folders"
install -d -m 755 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "$APP_DIR" /var/log/itstarter
# Encrypted backups; the deploy user's monitor reads the last-success marker.
install -d -m 700 -o "$DEPLOY_USER" -g "$DEPLOY_USER" /var/backups/itstarter

say "Scheduled jobs"
cat >/etc/cron.d/itstarter <<CRON
# IT Starter 2028 — times are Asia/Phnom_Penh. Output goes to /var/log/itstarter/*.log
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
# Nightly encrypted backup (+ off-site copy)
0 2 * * *   $DEPLOY_USER  cd $APP_DIR/deploy && ./scripts/backup.sh backup >> /var/log/itstarter/backup.log 2>&1
# Restore drill on the 1st of every month
30 3 1 * *  $DEPLOY_USER  cd $APP_DIR/deploy && ./scripts/backup.sh drill >> /var/log/itstarter/backup.log 2>&1
# Health checks every 5 minutes
*/5 * * * * $DEPLOY_USER  cd $APP_DIR/deploy && ./scripts/monitor.sh >> /var/log/itstarter/monitor.log 2>&1
# Pick up a renewed certificate
15 4 * * *  $DEPLOY_USER  cd $APP_DIR/deploy && ./scripts/reload-nginx.sh >> /var/log/itstarter/monitor.log 2>&1
# Remove unused images every Sunday
0 5 * * 0   root          docker image prune -af --filter "until=336h" > /dev/null 2>&1
CRON
chmod 644 /etc/cron.d/itstarter

cat >/etc/logrotate.d/itstarter <<'ROTATE'
/var/log/itstarter/*.log {
  weekly
  rotate 8
  compress
  missingok
  notifempty
}
ROTATE

say "Done"
cat <<NEXT
Next steps (docs/DEPLOYMENT.md):
  1. Point DNS for the domain (A record) to this server.
  2. As $DEPLOY_USER: put deploy/ in $APP_DIR (the GitHub deploy does this) and create deploy/.env.
  3. ./scripts/init-certificate.sh, then deploy a version from GitHub Actions.
NEXT
