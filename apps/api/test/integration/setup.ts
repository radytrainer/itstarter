import { loadTestEnv, testDatabaseUrl, testRedisUrl } from './test-db';

loadTestEnv();
process.env.DATABASE_URL = testDatabaseUrl();
process.env.REDIS_URL = testRedisUrl();
process.env.LOG_LEVEL = 'silent';
process.env.NODE_ENV = 'test';
