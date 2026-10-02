# syntax=docker/dockerfile:1
# Build context: repository root.

FROM node:22-slim AS base
WORKDIR /app

# ---- dependencies (all, for building) ----
FROM base AS deps
COPY package.json package-lock.json ./
COPY packages/shared/package.json packages/shared/
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
RUN npm ci --workspace @itstarter/api --no-audit --no-fund

# ---- build ----
FROM deps AS build
COPY tsconfig.base.json ./
COPY packages/shared packages/shared
COPY apps/api apps/api
RUN npm run build --workspace @itstarter/api

# ---- production dependencies only ----
FROM deps AS prod-deps
RUN npm ci --workspace @itstarter/api --omit=dev --no-audit --no-fund \
 && mkdir -p apps/api/node_modules

# ---- runtime ----
FROM base AS runner
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY apps/api/drizzle ./apps/api/drizzle
COPY apps/api/package.json ./apps/api/
USER node
EXPOSE 4000
HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=5 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:4000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]
CMD ["node", "--enable-source-maps", "apps/api/dist/server.js"]
