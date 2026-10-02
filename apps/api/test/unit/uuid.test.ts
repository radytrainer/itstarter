import { describe, expect, it } from 'vitest';
import { uuidv7 } from '../../src/lib/uuid';

const UUID_V7 = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

describe('uuidv7', () => {
  it('has the version 7 and RFC variant bits', () => {
    for (let i = 0; i < 100; i += 1) expect(uuidv7()).toMatch(UUID_V7);
  });

  it('encodes the timestamp in the first 48 bits', () => {
    const now = Date.UTC(2028, 0, 15, 8, 30);
    const id = uuidv7(now);
    const ms = parseInt(id.replaceAll('-', '').slice(0, 12), 16);
    expect(ms).toBe(now);
  });

  it('sorts by creation time across milliseconds', () => {
    const ids = [1_000, 2_000, 3_000, 1_790_000_000_000].map((ms) => uuidv7(ms));
    expect([...ids].sort()).toEqual(ids);
  });

  it('is unique', () => {
    const ids = new Set(Array.from({ length: 10_000 }, () => uuidv7()));
    expect(ids.size).toBe(10_000);
  });
});
