import { resolve } from 'node:path';
import pg from 'pg';
import { runMigrations } from '../../src/db/migrator';
import { loadTestEnv, testDatabaseUrl } from './test-db';

/** Runs once before all integration tests: recreate the test database and migrate it. */
export default async function globalSetup(): Promise<void> {
  loadTestEnv();
  const testUrl = new URL(testDatabaseUrl());
  const testDbName = testUrl.pathname.slice(1);
  if (!testDbName.endsWith('_test')) throw new Error(`Refusing to recreate "${testDbName}"`);

  const adminUrl = new URL(testUrl);
  adminUrl.pathname = '/postgres';
  const admin = new pg.Client({ connectionString: adminUrl.toString() });
  await admin.connect();
  try {
    await admin.query(`drop database if exists "${testDbName}" with (force)`);
    await admin.query(`create database "${testDbName}"`);
  } finally {
    await admin.end();
  }

  const pool = new pg.Pool({ connectionString: testUrl.toString(), max: 1 });
  try {
    await runMigrations(pool, resolve(import.meta.dirname, '../../drizzle'));
  } finally {
    await pool.end();
  }
}
