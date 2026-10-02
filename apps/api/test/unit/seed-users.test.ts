import { describe, expect, it } from 'vitest';
import { DEV_PASSWORDS, resolveSeedUsers } from '../../src/db/seed/users';

describe('resolveSeedUsers', () => {
  it('development: admin + demo teacher + demo student with dev passwords', () => {
    const users = resolveSeedUsers({ NODE_ENV: 'development' });
    expect(users.map((u) => [u.username, u.role])).toEqual([
      ['admin', 'ADMIN'],
      ['teacher.demo', 'TEACHER'],
      ['student.demo', 'STUDENT'],
    ]);
    expect(users[0]?.password).toBe(DEV_PASSWORDS.admin);
  });

  it('production: refuses to seed without an admin password', () => {
    expect(() => resolveSeedUsers({ NODE_ENV: 'production' })).toThrow(/SEED_ADMIN_PASSWORD/);
  });

  it('production: refuses a short admin password', () => {
    expect(() =>
      resolveSeedUsers({ NODE_ENV: 'production', SEED_ADMIN_PASSWORD: 'short' }),
    ).toThrow(/at least 12/);
  });

  it('production: only the admin, never demo accounts by default', () => {
    const users = resolveSeedUsers({
      NODE_ENV: 'production',
      SEED_ADMIN_PASSWORD: 'a-very-long-secret-1',
      SEED_ADMIN_USERNAME: 'itadmin',
    });
    expect(users).toEqual([
      {
        username: 'itadmin',
        displayName: 'Administrator',
        role: 'ADMIN',
        password: 'a-very-long-secret-1',
      },
    ]);
  });

  it('production: demo accounts on request still need real passwords', () => {
    expect(() =>
      resolveSeedUsers({
        NODE_ENV: 'production',
        SEED_ADMIN_PASSWORD: 'a-very-long-secret-1',
        SEED_DEMO_USERS: 'true',
      }),
    ).toThrow(/SEED_TEACHER_PASSWORD/);
  });

  it('SEED_DEMO_USERS=false skips demo accounts in development', () => {
    expect(resolveSeedUsers({ NODE_ENV: 'development', SEED_DEMO_USERS: 'false' })).toHaveLength(1);
  });
});

describe('resolveSeedUsers on a real server (Phase 16)', () => {
  const real = { NODE_ENV: 'production', APP_ORIGIN: 'https://itstarter.example.edu.kh' };

  it('refuses the development passwords published in this repository', () => {
    expect(() => resolveSeedUsers({ ...real, SEED_ADMIN_PASSWORD: DEV_PASSWORDS.admin })).toThrow(
      /published development password/,
    );
  });

  it('accepts a private password', () => {
    const users = resolveSeedUsers({ ...real, SEED_ADMIN_PASSWORD: 'a-private-admin-password-42' });
    expect(users.map((u) => u.username)).toEqual(['admin']);
  });

  it('allows the dev passwords on the local Docker stack (localhost)', () => {
    expect(() =>
      resolveSeedUsers({
        NODE_ENV: 'production',
        APP_ORIGIN: 'http://localhost:8088',
        SEED_ADMIN_PASSWORD: DEV_PASSWORDS.admin,
      }),
    ).not.toThrow();
  });
});
