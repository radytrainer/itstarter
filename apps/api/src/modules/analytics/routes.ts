import type { FastifyPluginAsync } from 'fastify';
import {
  analyticsQuerySchema,
  type AnalyticsActivities,
  type AnalyticsEngagement,
  type AnalyticsOverview,
  type AnalyticsWorlds,
  type ApiSuccess,
} from '@itstarter/shared';
import { parseWith } from '../../lib/validation';
import { currentUser, requireRole } from '../../plugins/auth';
import type { AnalyticsService } from './service';

/**
 * Aggregate reports (counts and averages only). ADMIN sees everyone; TEACHER sees only
 * their own classes. Optional filters: ?cohortId=…&days=7|30|90.
 */
export const analyticsRoutes: FastifyPluginAsync<{ analytics: AnalyticsService }> = async (
  app,
  { analytics },
) => {
  app.addHook('preHandler', requireRole('TEACHER', 'ADMIN'));

  app.get('/admin/analytics/overview', async (request): Promise<ApiSuccess<AnalyticsOverview>> => {
    const query = parseWith(analyticsQuerySchema, request.query);
    return { success: true, data: await analytics.overview(currentUser(request), query) };
  });

  app.get(
    '/admin/analytics/engagement',
    async (request): Promise<ApiSuccess<AnalyticsEngagement>> => {
      const query = parseWith(analyticsQuerySchema, request.query);
      return { success: true, data: await analytics.engagement(currentUser(request), query) };
    },
  );

  app.get('/admin/analytics/worlds', async (request): Promise<ApiSuccess<AnalyticsWorlds>> => {
    const query = parseWith(analyticsQuerySchema, request.query);
    return { success: true, data: await analytics.worlds(currentUser(request), query) };
  });

  app.get(
    '/admin/analytics/activities',
    async (request): Promise<ApiSuccess<AnalyticsActivities>> => {
      const query = parseWith(analyticsQuerySchema, request.query);
      return { success: true, data: await analytics.activities(currentUser(request), query) };
    },
  );
};
