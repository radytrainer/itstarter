import Fastify, { type FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import { CSRF_HEADER } from '@itstarter/shared';
import type { AppConfig } from './config/env';
import type { AppDeps } from './deps';
import { Cache } from './lib/cache';
import { registerAuth, sessionCookie } from './plugins/auth';
import { registerCsrfProtection } from './plugins/csrf';
import { registerErrorHandlers } from './plugins/error-handler';
import { AdminContentService } from './modules/admin/content-service';
import { PeopleService } from './modules/admin/people-service';
import { adminRoutes } from './modules/admin/routes';
import { analyticsRoutes } from './modules/analytics/routes';
import { AnalyticsService } from './modules/analytics/service';
import { authRoutes } from './modules/auth/routes';
import { contentRoutes } from './modules/content/routes';
import { ContentService } from './modules/content/service';
import { notificationRoutes } from './modules/gamification/routes';
import { learningRoutes } from './modules/learning/routes';
import { LearningService } from './modules/learning/service';
import { ProgressService } from './modules/progress/service';
import { AuthService } from './modules/auth/service';
import { SessionService } from './modules/auth/sessions';
import { healthRoutes } from './modules/health/routes';
import { ProgressReportService } from './modules/teacher/progress-report';
import { PerformanceService } from './modules/performance/service';
import { teacherRoutes } from './modules/teacher/routes';
import { TeacherService } from './modules/teacher/service';

/** Fields that must never appear in logs. */
const REDACT_PATHS = [
  'req.headers.authorization',
  'req.headers.cookie',
  'res.headers["set-cookie"]',
  '*.password',
  '*.currentPassword',
  '*.newPassword',
  '*.temporaryPassword',
  '*.token',
];

const SESSION_CLEANUP_INTERVAL_MS = 60 * 60 * 1000;

export async function buildApp(config: AppConfig, deps: AppDeps): Promise<FastifyInstance> {
  const usePrettyLogs = config.NODE_ENV === 'development';

  const app = Fastify({
    logger: {
      level: config.LOG_LEVEL,
      redact: { paths: REDACT_PATHS, censor: '[redacted]' },
      ...(usePrettyLogs
        ? { transport: { target: 'pino-pretty', options: { singleLine: true } } }
        : {}),
    },
    trustProxy: config.TRUST_PROXY,
    bodyLimit: 1024 * 1024,
  });

  await app.register(helmet, {
    // JSON API: no HTML is served, so lock everything down.
    contentSecurityPolicy: { directives: { defaultSrc: ["'none'"], frameAncestors: ["'none'"] } },
  });
  await app.register(cors, {
    // An array makes the plugin answer only matching origins (a string is sent to everyone).
    origin: [config.APP_ORIGIN],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['content-type', CSRF_HEADER],
  });

  registerErrorHandlers(app);

  // Every route, recorded as it is registered: the security tests check that each one is guarded.
  const routeList: { method: string; url: string }[] = [];
  app.addHook('onRoute', (route) => {
    for (const method of [route.method].flat()) {
      if (method !== 'HEAD') routeList.push({ method, url: route.url });
    }
  });
  app.decorate('routeList', routeList);

  // Treat an empty JSON body as "no body" (some clients send the header anyway), but keep
  // Fastify's own parser, with its prototype-poisoning protection, for everything else.
  const parseJson = app.getDefaultJsonParser('error', 'error');
  app.removeContentTypeParser('application/json');
  app.addContentTypeParser('application/json', { parseAs: 'string' }, (request, body, done) => {
    if (body === '') return done(null, undefined);
    parseJson(request, body as string, done);
  });

  // Services
  const sessions = new SessionService(deps.db, deps.redis, app.log);
  const auth = new AuthService(deps.db, deps.redis, sessions);

  const cache = new Cache(deps.redis, app.log);
  const content = new ContentService(deps.db, cache);
  const progress = new ProgressService(deps.db, cache, content);
  const teacher = new TeacherService(deps.db, sessions, progress);
  const people = new PeopleService(deps.db, sessions);
  const progressReport = new ProgressReportService(deps.db);
  const performance = new PerformanceService(deps.db);
  const adminContent = new AdminContentService(deps.db, cache);
  const analytics = new AnalyticsService(deps.db, cache);
  const learning = new LearningService(deps.db, deps.redis, cache, content, app.log);
  const cookie = sessionCookie(config.COOKIE_SECURE);

  // Order matters: reject cross-site writes before doing any session work.
  registerCsrfProtection(app, config.APP_ORIGIN);
  await registerAuth(app, sessions, cookie);

  await app.register(healthRoutes, { prefix: '/api', deps, version: config.APP_VERSION });
  await app.register(authRoutes, { prefix: '/api', auth, cookie });
  await app.register(contentRoutes, { prefix: '/api', content, progress, performance });
  await app.register(learningRoutes, { prefix: '/api', learning });
  await app.register(notificationRoutes, { prefix: '/api', db: deps.db });
  await app.register(teacherRoutes, {
    prefix: '/api',
    teacher,
    people,
    progressReport,
    performance,
  });
  await app.register(adminRoutes, { prefix: '/api', db: deps.db, people, content: adminContent });
  await app.register(analyticsRoutes, { prefix: '/api', analytics });

  if (config.NODE_ENV !== 'test') {
    let timer: NodeJS.Timeout | undefined;
    app.addHook('onReady', async () => {
      timer = setInterval(() => {
        sessions
          .cleanup()
          .then((n) => n > 0 && app.log.info({ deleted: n }, 'Expired sessions cleaned up'))
          .catch((err: unknown) => app.log.warn({ err }, 'Session cleanup failed'));
      }, SESSION_CLEANUP_INTERVAL_MS);
      timer.unref();
    });
    app.addHook('onClose', async () => clearInterval(timer));
  }

  return app;
}

declare module 'fastify' {
  interface FastifyInstance {
    /** Every registered route (method + URL), for the route-guard security test. */
    routeList: { method: string; url: string }[];
  }
}
