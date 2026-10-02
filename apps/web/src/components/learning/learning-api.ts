import type {
  ActivityCompleteResult,
  AnswerResult,
  ApiResponse,
  LessonCompleteResult,
} from '@itstarter/shared';
import { apiRequest } from '@/lib/api-client';

/** Browser calls used by the lesson player. All return ApiResponse (never throw). */
export const learningApi = {
  start: (lessonId: string) =>
    apiRequest<{ status: string }>('POST', `/api/lessons/${lessonId}/start`),

  answer: (activityId: string, questionId: string, answer: unknown, durationMs: number) =>
    apiRequest<AnswerResult>('POST', `/api/activities/${activityId}/answer`, {
      questionId,
      answer,
      durationMs: Math.min(Math.round(durationMs), 60 * 60 * 1000),
    }),

  saveCreation: (activityId: string, content: Record<string, string>) =>
    apiRequest<ActivityCompleteResult>('PUT', `/api/activities/${activityId}/creation`, {
      content,
    }),

  /** Active seconds since the last report (keepalive: also works while the page closes). */
  reportTime: (lessonId: string, seconds: number) =>
    apiRequest<{ recorded: true }>(
      'POST',
      `/api/lessons/${lessonId}/time`,
      { seconds },
      { keepalive: true },
    ),

  completeActivity: (activityId: string) =>
    apiRequest<ActivityCompleteResult>('POST', `/api/activities/${activityId}/complete`),

  completeLesson: (
    lessonId: string,
    timeSpentSeconds: number,
  ): Promise<ApiResponse<LessonCompleteResult>> =>
    apiRequest<LessonCompleteResult>('POST', `/api/lessons/${lessonId}/complete`, {
      timeSpentSeconds: Math.min(Math.round(timeSpentSeconds), 4 * 60 * 60),
    }),
};
