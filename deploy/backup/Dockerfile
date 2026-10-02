# Backup / restore tool: PostgreSQL 17 client + OpenSSL (encryption) + rclone (OVH Object Storage).
FROM alpine:3.21
RUN apk add --no-cache bash coreutils findutils postgresql17-client openssl rclone tzdata
COPY backup.sh /usr/local/bin/backup.sh
RUN chmod +x /usr/local/bin/backup.sh
ENTRYPOINT ["/usr/local/bin/backup.sh"]
CMD ["help"]
