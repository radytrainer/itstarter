import type { FastifyPluginAsync } from 'fastify';
import {
  changePasswordRequestSchema,
  loginRequestSchema,
  updateMeRequestSchema,
  type ApiSuccess,
  type AuthUser,
} from '@itstarter/shared';
import { parseWith } from '../../lib/validation';
import {
  clearSessionCookie,
  currentUser,
  requireAuth,
  setSessionCookie,
  type SessionCookie,
} from '../../plugins/auth';
import type { AuthService } from './service';

interface AuthRouteOptions {
  auth: AuthService;
  cookie: SessionCookie;
}

export const authRoutes: FastifyPluginAsync<AuthRouteOptions> = async (app, { auth, cookie }) => {
  app.post('/auth/login', async (request, reply): Promise<ApiSuccess<{ user: AuthUser }>> => {
    const body = parseWith(loginRequestSchema, request.body);
    const result = await auth.login(
      body,
      { ip: request.ip, userAgent: request.headers['user-agent'] },
      request.log,
    );
    setSessionCookie(reply, cookie, result.token, result.expiresAt);
    return { success: true, data: { user: result.user } };
  });

  /** Always succeeds, so a stale page can't get stuck; clears the cookie either way. */
  app.post('/auth/logout', async (request, reply): Promise<ApiSuccess<{ loggedOut: true }>> => {
    await auth.logout(request.cookies[cookie.name], request.auth, request.log);
    clearSessionCookie(reply, cookie);
    return { success: true, data: { loggedOut: true } };
  });

  app.get(
    '/auth/me',
    { preHandler: requireAuth({ allowPendingPasswordChange: true }) },
    async (request): Promise<ApiSuccess<{ user: AuthUser }>> => {
      const { sessionId: _sessionId, expiresAt: _expiresAt, ...user } = currentUser(request);
      return { success: true, data: { user } };
    },
  );

  app.patch(
    '/me',
    { preHandler: requireAuth({ allowPendingPasswordChange: true }) },
    async (request): Promise<ApiSuccess<{ user: AuthUser }>> => {
      const body = parseWith(updateMeRequestSchema, request.body);
      const user = await auth.updateMe(currentUser(request), body);
      return { success: true, data: { user } };
    },
  );

  app.post(
    '/auth/change-password',
    { preHandler: requireAuth({ allowPendingPasswordChange: true }) },
    async (request): Promise<ApiSuccess<{ user: AuthUser }>> => {
      const body = parseWith(changePasswordRequestSchema, request.body);
      const user = await auth.changePassword(currentUser(request), body, request.log);
      return { success: true, data: { user } };
    },
  );
};
