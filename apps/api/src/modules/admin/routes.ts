import type { FastifyPluginAsync } from 'fastify';
import { count, desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import {
  activityInputSchema,
  activityPatchSchema,
  badgeInputSchema,
  courseInputSchema,
  createCohortSchema,
  createStaffSchema,
  createStudentSchema,
  importStudentsSchema,
  lessonInputSchema,
  lessonPatchSchema,
  pageQuerySchema,
  questionInputSchema,
  reorderSchema,
  updateStudentSchema,
  worldInputSchema,
  type ApiSuccess,
} from '@itstarter/shared';
import type { Database } from '../../db/client';
import { auditLogs, users } from '../../db/schema';
import { parseWith } from '../../lib/validation';
import { currentUser, requireRole } from '../../plugins/auth';
import type { AdminContentService } from './content-service';
import type { PeopleService } from './people-service';

const idParams = z.object({ id: z.uuid() });

interface AdminRouteOptions {
  db: Database;
  people: PeopleService;
  content: AdminContentService;
}

/** Everything under /api/admin is ADMIN-only. Teachers use /api/teacher (scoped to their classes). */
export const adminRoutes: FastifyPluginAsync<AdminRouteOptions> = async (
  app,
  { db, people, content },
) => {
  app.addHook('preHandler', requireRole('ADMIN'));

  const ok = <T>(data: T): ApiSuccess<T> => ({ success: true, data });
  const id = (request: { params: unknown }) => parseWith(idParams, request.params).id;

  // ---------- Audit log ----------
  app.get('/admin/audit-logs', async (request) => {
    const { page, pageSize } = parseWith(pageQuerySchema, request.query);
    const [items, [total]] = await Promise.all([
      db
        .select({
          id: auditLogs.id,
          action: auditLogs.action,
          entityType: auditLogs.entityType,
          entityId: auditLogs.entityId,
          actorUsername: users.username,
          metadata: auditLogs.metadata,
          createdAt: auditLogs.createdAt,
        })
        .from(auditLogs)
        .leftJoin(users, eq(users.id, auditLogs.actorUserId))
        .orderBy(desc(auditLogs.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db.select({ value: count() }).from(auditLogs),
    ]);
    return { success: true, data: items, meta: { page, pageSize, total: total?.value ?? 0 } };
  });

  // ---------- Students, classes, staff ----------
  app.post('/admin/students', async (request) =>
    ok(
      await people.createStudent(
        currentUser(request),
        parseWith(createStudentSchema, request.body),
      ),
    ),
  );
  app.patch('/admin/students/:id', async (request) => {
    await people.updateStudent(
      currentUser(request),
      id(request),
      parseWith(updateStudentSchema, request.body),
    );
    return ok({ updated: true });
  });
  app.delete('/admin/students/:id', async (request) => {
    await people.deleteStudent(currentUser(request), id(request));
    return ok({ deleted: true });
  });
  app.post('/admin/students/import', async (request) => {
    const { csv, dryRun } = parseWith(importStudentsSchema, request.body);
    return ok(await people.importStudents(currentUser(request), csv, dryRun, request.log));
  });
  app.post('/admin/cohorts', async (request) =>
    ok(
      await people.createCohort(currentUser(request), parseWith(createCohortSchema, request.body)),
    ),
  );
  app.get('/admin/staff', async () => ok(await people.listStaff()));
  app.post('/admin/staff', async (request) =>
    ok(await people.createStaff(currentUser(request), parseWith(createStaffSchema, request.body))),
  );

  // ---------- Courses ----------
  app.get('/admin/courses', async () => ok(await content.listCourses()));
  app.post('/admin/courses', async (request) =>
    ok(
      await content.createCourse(currentUser(request), parseWith(courseInputSchema, request.body)),
    ),
  );
  app.patch('/admin/courses/:id', async (request) =>
    ok(
      await content.updateCourse(
        currentUser(request),
        id(request),
        parseWith(courseInputSchema.partial(), request.body),
      ),
    ),
  );
  app.delete('/admin/courses/:id', async (request) =>
    ok(await content.deleteCourse(currentUser(request), id(request))),
  );

  // ---------- Worlds ----------
  app.get('/admin/courses/:id/worlds', async (request) =>
    ok(await content.listWorlds(id(request))),
  );
  app.post('/admin/courses/:id/worlds', async (request) =>
    ok(
      await content.createWorld(
        currentUser(request),
        id(request),
        parseWith(worldInputSchema, request.body),
      ),
    ),
  );
  app.post('/admin/courses/:id/worlds/reorder', async (request) =>
    ok(
      await content.reorderWorlds(
        currentUser(request),
        id(request),
        parseWith(reorderSchema, request.body).ids,
      ),
    ),
  );
  app.patch('/admin/worlds/:id', async (request) =>
    ok(
      await content.updateWorld(
        currentUser(request),
        id(request),
        parseWith(worldInputSchema.partial(), request.body),
      ),
    ),
  );
  app.delete('/admin/worlds/:id', async (request) =>
    ok(await content.deleteWorld(currentUser(request), id(request))),
  );

  // ---------- Lessons ----------
  app.get('/admin/worlds/:id/lessons', async (request) =>
    ok(await content.listLessons(id(request))),
  );
  app.post('/admin/worlds/:id/lessons', async (request) =>
    ok(
      await content.createLesson(
        currentUser(request),
        id(request),
        parseWith(lessonInputSchema, request.body),
      ),
    ),
  );
  app.post('/admin/worlds/:id/lessons/reorder', async (request) =>
    ok(
      await content.reorderLessons(
        currentUser(request),
        id(request),
        parseWith(reorderSchema, request.body).ids,
      ),
    ),
  );
  app.get('/admin/lessons/:id', async (request) => ok(await content.getLesson(id(request))));
  app.patch('/admin/lessons/:id', async (request) =>
    ok(
      await content.updateLesson(
        currentUser(request),
        id(request),
        parseWith(lessonPatchSchema, request.body),
      ),
    ),
  );
  app.delete('/admin/lessons/:id', async (request) =>
    ok(await content.deleteLesson(currentUser(request), id(request))),
  );

  // ---------- Activities ----------
  app.post('/admin/lessons/:id/activities', async (request) =>
    ok(
      await content.createActivity(
        currentUser(request),
        id(request),
        parseWith(activityInputSchema, request.body),
      ),
    ),
  );
  app.post('/admin/lessons/:id/activities/reorder', async (request) =>
    ok(
      await content.reorderActivities(
        currentUser(request),
        id(request),
        parseWith(reorderSchema, request.body).ids,
      ),
    ),
  );
  app.patch('/admin/activities/:id', async (request) =>
    ok(
      await content.updateActivity(
        currentUser(request),
        id(request),
        parseWith(activityPatchSchema, request.body),
      ),
    ),
  );
  app.delete('/admin/activities/:id', async (request) =>
    ok(await content.deleteActivity(currentUser(request), id(request))),
  );

  // ---------- Questions ----------
  app.post('/admin/activities/:id/questions', async (request) =>
    ok(
      await content.createQuestion(
        currentUser(request),
        id(request),
        parseWith(questionInputSchema, request.body),
      ),
    ),
  );
  app.put('/admin/questions/:id', async (request) =>
    ok(
      await content.updateQuestion(
        currentUser(request),
        id(request),
        parseWith(questionInputSchema, request.body),
      ),
    ),
  );
  app.delete('/admin/questions/:id', async (request) =>
    ok(await content.deleteQuestion(currentUser(request), id(request))),
  );

  // ---------- Badges ----------
  app.get('/admin/badges', async () => ok(await content.listBadges()));
  app.post('/admin/badges', async (request) =>
    ok(await content.createBadge(currentUser(request), parseWith(badgeInputSchema, request.body))),
  );
  app.patch('/admin/badges/:id', async (request) =>
    ok(
      await content.updateBadge(
        currentUser(request),
        id(request),
        parseWith(badgeInputSchema.partial(), request.body),
      ),
    ),
  );
};
