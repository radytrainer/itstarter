import type { FastifyPluginAsync } from 'fastify';
import { and, desc, eq, isNull } from 'drizzle-orm';
import { z } from 'zod';
import type { ApiSuccess, NotificationView } from '@itstarter/shared';
import type { Database } from '../../db/client';
import { notifications } from '../../db/schema';
import { AppError } from '../../lib/errors';
import { parseWith } from '../../lib/validation';
import { currentUser, requireAuth } from '../../plugins/auth';

const idParams = z.object({ id: z.uuid() });
const listQuery = z.object({ unread: z.enum(['true', 'false']).optional() });

/** Notifications ("You earned 🧠 Brain Master!"). Users only ever see and change their own. */
export const notificationRoutes: FastifyPluginAsync<{ db: Database }> = async (app, { db }) => {
  app.get(
    '/notifications',
    { preHandler: requireAuth() },
    async (request): Promise<ApiSuccess<NotificationView[]>> => {
      const { unread } = parseWith(listQuery, request.query);
      const user = currentUser(request);
      const rows = await db
        .select()
        .from(notifications)
        .where(
          and(
            eq(notifications.userId, user.id),
            unread === 'true' ? isNull(notifications.readAt) : undefined,
          ),
        )
        .orderBy(desc(notifications.createdAt))
        .limit(30);
      return {
        success: true,
        data: rows.map((n) => ({
          id: n.id,
          type: n.type,
          payload: n.payload,
          readAt: n.readAt?.toISOString() ?? null,
          createdAt: n.createdAt.toISOString(),
        })),
      };
    },
  );

  app.post(
    '/notifications/:id/read',
    { preHandler: requireAuth() },
    async (request): Promise<ApiSuccess<{ read: true }>> => {
      const { id } = parseWith(idParams, request.params);
      const updated = await db
        .update(notifications)
        .set({ readAt: new Date() })
        .where(and(eq(notifications.id, id), eq(notifications.userId, currentUser(request).id)))
        .returning({ id: notifications.id });
      if (updated.length === 0) {
        throw AppError.notFound('NOTIFICATION_NOT_FOUND', 'Notification not found');
      }
      return { success: true, data: { read: true } };
    },
  );
};
