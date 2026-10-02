import type { Redis } from 'ioredis';
import {
  checkNewPassword,
  ErrorCode,
  isReservedUsername,
  type AuthUser,
  type RegisterRequest,
} from '@itstarter/shared';
import type { Database } from '../../db/client';
import { students, users } from '../../db/schema';
import { ROLE_SEEDS } from '../../db/seed/data/foundation';
import { AppError } from '../../lib/errors';
import { hashPassword } from '../../lib/password';
import { FixedWindowLimiter, type LimitStatus } from '../../lib/rate-limiter';
import { audit, isUniqueViolation } from '../admin/audit';
import type { SessionService, SessionUser } from './sessions';

/**
 * Per IP: a whole class signs up together from one school network (one shared IP), so this is
 * generous; it still stops one machine from creating hundreds of accounts.
 */
export const REGISTER_IP_LIMIT = { limit: 40, windowSeconds: 60 * 60 };
/** Whole site: a ceiling on sign-ups per hour, whatever the IPs (bot waves). */
export const REGISTER_GLOBAL_LIMIT = { limit: 300, windowSeconds: 60 * 60 };

const STUDENT_ROLE_ID = ROLE_SEEDS.find((r) => r.code === 'STUDENT')!.id;

interface Logger {
  info(obj: object, msg: string): void;
  warn(obj: object, msg: string): void;
}

export interface RegisterResult {
  user: AuthUser;
  token: string;
  expiresAt: Date;
}

/**
 * Students create their own account: name, username, password. They start without a class; an
 * admin puts them in one later (Admin → Students → "No class"). They are signed in at once.
 */
export class RegistrationService {
  private readonly perIp: FixedWindowLimiter;
  private readonly global: FixedWindowLimiter;

  constructor(
    private readonly db: Database,
    redis: Redis,
    private readonly sessions: SessionService,
    private readonly open: boolean,
  ) {
    this.perIp = new FixedWindowLimiter(
      redis,
      'register:ip',
      REGISTER_IP_LIMIT.limit,
      REGISTER_IP_LIMIT.windowSeconds,
    );
    this.global = new FixedWindowLimiter(
      redis,
      'register:all',
      REGISTER_GLOBAL_LIMIT.limit,
      REGISTER_GLOBAL_LIMIT.windowSeconds,
    );
  }

  get isOpen(): boolean {
    return this.open;
  }

  async register(
    input: RegisterRequest,
    context: { ip: string; userAgent?: string },
    log: Logger,
  ): Promise<RegisterResult> {
    if (!this.open) {
      throw new AppError(
        403,
        ErrorCode.REGISTRATION_CLOSED,
        'New accounts are made by your teacher. Please ask them for your username.',
      );
    }
    // A filled-in hidden field means a bot: refuse quietly, like any invalid form.
    if (input.website) {
      log.warn({ event: 'auth.register_bot', ip: context.ip }, 'Sign-up honeypot filled');
      throw new AppError(400, ErrorCode.VALIDATION_ERROR, 'Please check the form and try again.');
    }

    // Every attempt counts (successful or not), so the limits also slow down username probing.
    // Redis down: fail closed, like login.
    const [ip, all] = await this.guard(() =>
      Promise.all([this.perIp.hit(context.ip), this.global.hit('site')]),
    );
    if (!ip.allowed || !all.allowed) {
      log.warn(
        { event: 'auth.register_rate_limited', scope: ip.allowed ? 'site' : 'ip', ip: context.ip },
        'Sign-up rate limit reached',
      );
      throw rateLimited(ip.allowed ? all : ip);
    }

    const problems = checkNewPassword(input.password, { username: input.username });
    if (problems.length > 0) {
      throw new AppError(400, ErrorCode.WEAK_PASSWORD, 'Please choose a different password.', {
        problems,
      });
    }
    if (isReservedUsername(input.username)) throw usernameTaken();

    const passwordHash = await hashPassword(input.password);
    let userId: string;
    try {
      userId = await this.db.transaction(async (tx) => {
        const [user] = await tx
          .insert(users)
          .values({
            username: input.username,
            displayName: input.displayName,
            passwordHash,
            roleId: STUDENT_ROLE_ID,
            locale: input.locale ?? 'en',
            // They chose their own password: nothing to change.
            mustChangePassword: false,
          })
          .returning({ id: users.id });
        await tx.insert(students).values({ userId: user!.id, cohortId: null });
        const self = { id: user!.id, role: 'STUDENT' } as SessionUser;
        await audit(tx, self, 'student.self_registered', 'user', user!.id, {
          username: input.username,
        });
        return user!.id;
      });
    } catch (err) {
      if (isUniqueViolation(err)) throw usernameTaken();
      throw err;
    }

    const { token, expiresAt } = await this.sessions.create(userId, 'STUDENT', context.userAgent);
    log.info({ event: 'auth.registered', userId }, 'Student signed up');
    return {
      token,
      expiresAt,
      user: {
        id: userId,
        username: input.username,
        displayName: input.displayName,
        role: 'STUDENT',
        locale: input.locale ?? 'en',
        mustChangePassword: false,
      },
    };
  }

  private async guard<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch {
      throw new AppError(
        503,
        ErrorCode.SERVICE_UNAVAILABLE,
        'Sign-up is not available right now. Please try again in a moment.',
      );
    }
  }
}

const usernameTaken = () =>
  new AppError(409, ErrorCode.USERNAME_TAKEN, 'That username is already taken. Try another one.');

function rateLimited(status: LimitStatus) {
  const minutes = Math.ceil(status.retryAfterSeconds / 60);
  return new AppError(
    429,
    ErrorCode.RATE_LIMITED,
    `Too many new accounts from here. Please wait ${minutes} minute${minutes === 1 ? '' : 's'} and try again.`,
    { retryAfterSeconds: status.retryAfterSeconds },
  );
}
