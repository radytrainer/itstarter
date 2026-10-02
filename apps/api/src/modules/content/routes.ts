import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import type {
  ApiSuccess,
  AwardView,
  CourseDetail,
  CourseSummary,
  Dashboard,
  StudentPerformance,
  WorldDetail,
} from '@itstarter/shared';
import { AppError } from '../../lib/errors';
import { parseWith } from '../../lib/validation';
import { currentUser, requireAuth, requireRole } from '../../plugins/auth';
import type { PerformanceService } from '../performance/service';
import type { ProgressService } from '../progress/service';
import type { ContentService } from './service';

const idParams = z.object({ id: z.uuid() });

interface Options {
  content: ContentService;
  progress: ProgressService;
  performance: PerformanceService;
}

export const contentRoutes: FastifyPluginAsync<Options> = async (
  app,
  { content, progress, performance },
) => {
  app.get(
    '/courses',
    { preHandler: requireAuth() },
    async (): Promise<ApiSuccess<CourseSummary[]>> => ({
      success: true,
      data: await content.listCourses(),
    }),
  );

  app.get(
    '/courses/:id',
    { preHandler: requireAuth() },
    async (request): Promise<ApiSuccess<CourseDetail>> => {
      const { id } = parseWith(idParams, request.params);
      const course = await content.courseStructure(id);
      // Course overview without student data (each world's own page has the student's status).
      const worlds = course.worlds.map(({ lessons, ...w }) => ({
        ...w,
        lessonsTotal: lessons.length,
        lessonsCompleted: 0,
        percent: 0,
      }));
      return { success: true, data: { ...course, worlds } };
    },
  );

  app.get(
    '/worlds/:id',
    { preHandler: requireAuth() },
    async (request): Promise<ApiSuccess<WorldDetail>> => {
      const { id } = parseWith(idParams, request.params);
      return { success: true, data: await progress.world(currentUser(request), id) };
    },
  );

  // Students only: their own dashboard. Teachers see student progress via /teacher routes.
  app.get(
    '/progress',
    { preHandler: requireRole('STUDENT') },
    async (request): Promise<ApiSuccess<Dashboard>> => ({
      success: true,
      data: await progress.dashboard(currentUser(request)),
    }),
  );

  /** Students only: their own performance and learning habit ("My progress"). */
  app.get(
    '/progress/performance',
    { preHandler: requireRole('STUDENT') },
    async (request): Promise<ApiSuccess<StudentPerformance>> => ({
      success: true,
      data: await performance.forStudent(currentUser(request).id),
    }),
  );

  app.get(
    '/badges',
    { preHandler: requireAuth() },
    async (request): Promise<ApiSuccess<AwardView[]>> => ({
      success: true,
      data: await progress.badges(currentUser(request)),
    }),
  );

  app.get(
    '/achievements',
    { preHandler: requireAuth() },
    async (request): Promise<ApiSuccess<AwardView[]>> => ({
      success: true,
      data: await progress.achievements(currentUser(request)),
    }),
  );

  /** For staff home: the default course (students use /progress). */
  app.get(
    '/courses/default',
    { preHandler: requireAuth() },
    async (request): Promise<ApiSuccess<{ id: string }>> => {
      const user = currentUser(request);
      const id = await progress.courseIdFor(user.role === 'STUDENT' ? user.id : null);
      if (!id) throw AppError.notFound('COURSE_NOT_FOUND', 'No published course yet');
      return { success: true, data: { id } };
    },
  );
};
