import { describe, expect, it } from 'vitest';
import { checkNewPassword, loginRequestSchema, normalizeUsername } from '@itstarter/shared';
import { generateTemporaryPassword } from '../../src/lib/temp-password';
import { sessionCookie } from '../../src/plugins/auth';
import { hashToken } from '../../src/modules/auth/sessions';
import { testConfig } from './helpers';

describe('checkNewPassword', () => {
  const ctx = { username: 'sokha', currentPassword: 'old-password-1' };

  it('accepts a long enough new password', () => {
    expect(checkNewPassword('mango-river-sky', ctx)).toEqual([]);
  });

  it('explains every problem', () => {
    expect(checkNewPassword('short', ctx)).toEqual(['TOO_SHORT']);
    expect(checkNewPassword('SOKHA', { username: 'sokhapass' })).toEqual(['TOO_SHORT']);
    expect(checkNewPassword(' Sokha12 ', { username: 'sokha12' })).toEqual(['SAME_AS_USERNAME']);
    expect(checkNewPassword('old-password-1', ctx)).toEqual(['SAME_AS_CURRENT']);
    expect(checkNewPassword('x'.repeat(129), ctx)).toEqual(['TOO_LONG']);
  });
});

describe('login input', () => {
  it('normalises usernames (case, spaces)', () => {
    expect(normalizeUsername('  Student.Demo ')).toBe('student.demo');
  });

  it('rejects missing or oversized fields', () => {
    expect(loginRequestSchema.safeParse({ username: '', password: 'x' }).success).toBe(false);
    expect(loginRequestSchema.safeParse({ username: 'a', password: '' }).success).toBe(false);
    expect(loginRequestSchema.safeParse({ username: 'a'.repeat(51), password: 'x' }).success).toBe(
      false,
    );
    expect(loginRequestSchema.safeParse({ username: 'a' }).success).toBe(false);
  });
});

describe('generateTemporaryPassword', () => {
  it('produces word-word-1234 passwords that pass the password rules', () => {
    for (let i = 0; i < 200; i += 1) {
      const password = generateTemporaryPassword();
      expect(password).toMatch(/^[a-z]+-[a-z]+-\d{4}$/);
      expect(checkNewPassword(password, { username: 'student' })).toEqual([]);
    }
  });

  it('is not predictable', () => {
    const passwords = new Set(Array.from({ length: 200 }, generateTemporaryPassword));
    expect(passwords.size).toBeGreaterThan(195);
  });
});

describe('session cookie', () => {
  it('uses the __Host- prefix when secure', () => {
    expect(sessionCookie(true)).toEqual({ name: '__Host-its_session', secure: true });
    expect(sessionCookie(false)).toEqual({ name: 'its_session', secure: false });
  });

  it('is secure by default only in production', () => {
    expect(testConfig({ NODE_ENV: 'production' }).COOKIE_SECURE).toBe(true);
    expect(testConfig({ NODE_ENV: 'development' }).COOKIE_SECURE).toBe(false);
    expect(testConfig({ NODE_ENV: 'production', COOKIE_SECURE: 'false' }).COOKIE_SECURE).toBe(
      false,
    );
  });

  it('stores only a SHA-256 hash of the token', () => {
    expect(hashToken('abc')).toBe(
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    );
  });
});
