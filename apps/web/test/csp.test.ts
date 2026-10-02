import { describe, expect, it } from 'vitest';
import { contentSecurityPolicy, newNonce } from '../src/lib/csp';

describe('Content-Security-Policy', () => {
  it('production: scripts only with this page’s nonce; no eval, no framing, no plugins', () => {
    const policy = contentSecurityPolicy('abc123', false);
    expect(policy).toContain("script-src 'self' 'nonce-abc123' 'strict-dynamic'");
    expect(policy).not.toContain('unsafe-eval');
    expect(policy).not.toMatch(/script-src[^;]*unsafe-inline/);
    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).toContain("object-src 'none'");
    expect(policy).toContain("base-uri 'self'");
    expect(policy).toContain("form-action 'self'");
  });

  it('dev allows hot reload only in development', () => {
    expect(contentSecurityPolicy('n', true)).toContain("'unsafe-eval'");
  });

  it('a fresh, unguessable nonce every time', () => {
    const nonces = new Set(Array.from({ length: 50 }, newNonce));
    expect(nonces.size).toBe(50);
    expect([...nonces][0]).toMatch(/^[A-Za-z0-9+/]{22}==$/);
  });
});
