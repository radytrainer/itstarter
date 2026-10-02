import type { FastifyInstance, FastifyReply, FastifyRequest, preHandlerHookHandler } from 'fastify';
import cookie from '@fastify/cookie';
import { ErrorCode, type Role } from '@itstarter/shared';
import { AppError } from '../lib/errors';
import type { SessionService, SessionUser } from '../modules/auth/sessions';

declare module 'fastify' {
  interface FastifyRequest {
    /** The signed-in user, or null. Set by the auth plugin on every request. */
    auth: SessionUser | null;
  }
}

export interface SessionCookie {
  name: string;
  secure: boolean;
}

/** `__Host-` makes browsers refuse the cookie unless it is Secure, host-only and Path=/. */
export function sessionCookie(secure: boolean): SessionCookie {
  return { name: secure ? '__Host-its_session' : 'its_session', secure };
}

export function setSessionCookie(
  reply: FastifyReply,
  cookieConfig: SessionCookie,
  token: string,
  expiresAt: Date,
) {
  reply.setCookie(cookieConfig.name, token, {
    httpOnly: true,
    secure: cookieConfig.secure,
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

export function clearSessionCookie(reply: FastifyReply, cookieConfig: SessionCookie) {
  reply.clearCookie(cookieConfig.name, {
    httpOnly: true,
    secure: cookieConfig.secure,
    sameSite: 'lax',
    path: '/',
  });
}

export async function registerAuth(
  app: FastifyInstance,
  sessions: SessionService,
  cookieConfig: SessionCookie,
): Promise<void> {
  await app.register(cookie);
  app.decorateRequest('auth', null);

  app.addHook('onRequest', async (request) => {
    const token = request.cookies[cookieConfig.name];
    request.auth = token ? await sessions.resolve(token) : null;
  });
}

interface RequireAuthOptions {
  /** Let users who must change their password through (only /auth/me, /change-password, /logout). */
  allowPendingPasswordChange?: boolean;
}

function assertAuthenticated(
  request: FastifyRequest,
  options: RequireAuthOptions = {},
): SessionUser {
  const user = request.auth;
  if (!user) {
    throw new AppError(401, ErrorCode.UNAUTHENTICATED, 'Please log in to continue.');
  }
  if (user.mustChangePassword && !options.allowPendingPasswordChange) {
    throw new AppError(
      403,
      ErrorCode.PASSWORD_CHANGE_REQUIRED,
      'Please choose a new password first.',
    );
  }
  return user;
}

/** preHandler: any signed-in user. */
export function requireAuth(options: RequireAuthOptions = {}): preHandlerHookHandler {
  return async (request) => {
    assertAuthenticated(request, options);
  };
}

/** preHandler: signed in AND one of the given roles. */
export function requireRole(...allowed: Role[]): preHandlerHookHandler {
  return async (request) => {
    const user = assertAuthenticated(request);
    if (!allowed.includes(user.role)) {
      throw new AppError(403, ErrorCode.FORBIDDEN, 'You do not have access to this page.');
    }
  };
}

/** For handlers behind requireAuth/requireRole: the user is guaranteed to be there. */
export function currentUser(request: FastifyRequest): SessionUser {
  if (!request.auth)
    throw new AppError(401, ErrorCode.UNAUTHENTICATED, 'Please log in to continue.');
  return request.auth;
}
