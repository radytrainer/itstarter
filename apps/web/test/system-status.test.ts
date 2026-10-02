import { describe, expect, it } from 'vitest';
import { getSystemStatus } from '../src/lib/system-status';

function fakeFetch(status: number, body: unknown): typeof fetch {
  return async () => new Response(JSON.stringify(body), { status });
}

const checks = (database: 'up' | 'down', redis: 'up' | 'down') => ({
  database: { status: database, latencyMs: 1 },
  redis: { status: redis, latencyMs: 1 },
});

describe('getSystemStatus', () => {
  it('reports everything up when the API is ready', async () => {
    const result = await getSystemStatus(
      'http://api',
      fakeFetch(200, { success: true, data: { status: 'ok', checks: checks('up', 'up') } }),
    );
    expect(result).toEqual({ web: 'up', api: 'up', database: 'up', redis: 'up' });
  });

  it('reads dependency details from a 503 response', async () => {
    const result = await getSystemStatus(
      'http://api',
      fakeFetch(503, {
        success: false,
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: 'x',
          details: { status: 'degraded', checks: checks('down', 'up') },
        },
      }),
    );
    expect(result).toEqual({ web: 'up', api: 'up', database: 'down', redis: 'up' });
  });

  it('marks the API down when it cannot be reached', async () => {
    const failing: typeof fetch = async () => {
      throw new TypeError('fetch failed');
    };
    const result = await getSystemStatus('http://api', failing);
    expect(result).toEqual({ web: 'up', api: 'down', database: 'unknown', redis: 'unknown' });
  });

  it('treats an unexpected body as unknown dependencies', async () => {
    const result = await getSystemStatus('http://api', fakeFetch(200, { hello: 'world' }));
    expect(result).toEqual({ web: 'up', api: 'up', database: 'unknown', redis: 'unknown' });
  });
});
