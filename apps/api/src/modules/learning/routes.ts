import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import {
  answerRequestSchema,
  completeLessonRequestSchema,
  lessonTimeRequestSchema,
  creationRequestSchema,
  type ActivityCompleteResult,
  type AnswerResult,
  type ApiSuccess,
  type LessonCompleteResult,
  type LessonPlay,
  type PlayActivity,
} from '@itstarter/shared';
import { parseWith } from '../../lib/validation';
import { currentUser, requireAuth, requireRole } from '../../plugins/auth';
import type { LearningService } from './service';

const idParams = z.object({ id: z.uuid() });

export const learningRoutes: FastifyPluginAsync<{ learning: LearningService }> = async (
  app,
  { learning },
) => {
  // Reading: any signed-in user (staff can preview). Answers are never included.
  app.get(
    '/lessons/:id',
    { preHandler: requireAuth() },
    async (request): Promise<ApiSuccess<LessonPlay>> => {
      const { id } = parseWith(idParams, request.params);
      return { success: true, data: await learning.lessonForPlay(currentUser(request), id) };
    },
  );

  app.get(
    '/activities/:id',
    { preHandler: requireAuth() },
    async (request): Promise<ApiSuccess<PlayActivity>> => {
      const { id } = parseWith(idParams, request.params);
      return { success: true, data: await learning.activityForPlay(currentUser(request), id) };
    },
  );

  // Writing progress: students only, and always for themselves (the session decides who).
  app.post(
    '/lessons/:id/start',
    { preHandler: requireRole('STUDENT') },
    async (request): Promise<ApiSuccess<{ status: string }>> => {
      const { id } = parseWith(idParams, request.params);
      return { success: true, data: await learning.startLesson(currentUser(request), id) };
    },
  );

  app.post(
    '/lessons/:id/complete',
    { preHandler: requireRole('STUDENT') },
    async (request): Promise<ApiSuccess<LessonCompleteResult>> => {
      const { id } = parseWith(idParams, request.params);
      const body = parseWith(completeLessonRequestSchema, request.body ?? {});
      return {
        success: true,
        data: await learning.completeLesson(currentUser(request), id, body.timeSpentSeconds),
      };
    },
  );

  /** Active time while a lesson is open (sent about once a minute, and when leaving). */
  app.post(
    '/lessons/:id/time',
    { preHandler: requireRole('STUDENT') },
    async (request): Promise<ApiSuccess<{ recorded: true }>> => {
      const { id } = parseWith(idParams, request.params);
      const { seconds } = parseWith(lessonTimeRequestSchema, request.body);
      await learning.recordLessonTime(currentUser(request), id, seconds);
      return { success: true, data: { recorded: true } };
    },
  );

  app.post(
    '/activities/:id/answer',
    { preHandler: requireRole('STUDENT') },
    async (request): Promise<ApiSuccess<AnswerResult>> => {
      const { id } = parseWith(idParams, request.params);
      const body = parseWith(answerRequestSchema, request.body);
      return { success: true, data: await learning.answer(currentUser(request), id, body) };
    },
  );

  app.put(
    '/activities/:id/creation',
    { preHandler: requireRole('STUDENT') },
    async (request): Promise<ApiSuccess<ActivityCompleteResult>> => {
      const { id } = parseWith(idParams, request.params);
      const body = parseWith(creationRequestSchema, request.body);
      return { success: true, data: await learning.saveCreation(currentUser(request), id, body) };
    },
  );

  app.post(
    '/activities/:id/complete',
    { preHandler: requireRole('STUDENT') },
    async (request): Promise<ApiSuccess<ActivityCompleteResult>> => {
      const { id } = parseWith(idParams, request.params);
      return { success: true, data: await learning.completeActivity(currentUser(request), id) };
    },
  );
};
