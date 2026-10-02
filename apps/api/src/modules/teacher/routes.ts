import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import {
  progressListQuerySchema,
  studentListQuerySchema,
  type ApiSuccess,
  type ProgressReport,
  type StudentPerformance,
} from '@itstarter/shared';
import { parseWith } from '../../lib/validation';
import { currentUser, requireRole } from '../../plugins/auth';
import type { PeopleService } from '../admin/people-service';
import type { PerformanceService } from '../performance/service';
import type { ProgressReportService } from './progress-report';
import type { StudentDetail, StudentSummary, TeacherService } from './service';

const studentParamsSchema = z.object({ id: z.uuid() });
const exportQuerySchema = progressListQuerySchema.extend({
  lang: z.enum(['en', 'km']).default('en'),
});

export const teacherRoutes: FastifyPluginAsync<{
  teacher: TeacherService;
  people: PeopleService;
  progressReport: ProgressReportService;
  performance: PerformanceService;
}> = async (app, { teacher, people, progressReport, performance }) => {
  // Every route in this file: TEACHER (own cohorts only) or ADMIN (everyone).
  app.addHook('preHandler', requireRole('TEACHER', 'ADMIN'));

  app.get('/teacher/students', async (request): Promise<ApiSuccess<StudentSummary[]>> => {
    const query = parseWith(studentListQuerySchema, request.query);
    const { items, meta } = await teacher.listStudents(currentUser(request), query);
    return { success: true, data: items, meta };
  });

  /** Learning progress of every student in scope: overall, per world, score, activity. */
  app.get('/teacher/progress', async (request): Promise<ApiSuccess<ProgressReport>> => {
    const query = parseWith(progressListQuerySchema, request.query);
    const { report, meta } = await progressReport.report(currentUser(request), query);
    return { success: true, data: report, meta };
  });

  /** The same report as a CSV file (all matching students). */
  app.get('/teacher/progress/export', async (request, reply) => {
    const { lang, ...query } = parseWith(exportQuerySchema, request.query);
    const csv = await progressReport.exportCsv(currentUser(request), query, lang);
    const day = new Date().toISOString().slice(0, 10);
    return reply
      .header('Content-Type', 'text/csv; charset=utf-8')
      .header('Content-Disposition', `attachment; filename="learning-progress-${day}.csv"`)
      .header('Cache-Control', 'no-store')
      .send(csv);
  });

  app.get('/teacher/students/:id', async (request): Promise<ApiSuccess<StudentDetail>> => {
    const { id } = parseWith(studentParamsSchema, request.params);
    return { success: true, data: await teacher.studentDetail(currentUser(request), id) };
  });

  /** Performance & commitment of one student (same class scope as the detail page). */
  app.get(
    '/teacher/students/:id/performance',
    async (request): Promise<ApiSuccess<StudentPerformance>> => {
      const { id } = parseWith(studentParamsSchema, request.params);
      return { success: true, data: await performance.forStaff(currentUser(request), id) };
    },
  );

  app.get('/teacher/cohorts', async (request) => ({
    success: true,
    data: await people.listCohorts(currentUser(request)),
  }));

  app.post(
    '/teacher/students/:id/reset-password',
    async (request): Promise<ApiSuccess<{ username: string; temporaryPassword: string }>> => {
      const { id } = parseWith(studentParamsSchema, request.params);
      const result = await teacher.resetStudentPassword(currentUser(request), id, request.log);
      return { success: true, data: result };
    },
  );
};
