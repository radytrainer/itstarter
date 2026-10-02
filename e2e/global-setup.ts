import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

/**
 * Before each run, give every browser project its own fresh student (see reset-test-students.mjs),
 * so tests never depend on what an earlier run or another device did.
 * Runs in a separate Node process: database/Redis clients crash under Playwright's module loader
 * on some Node 22 versions.
 */
export default function globalSetup() {
  execFileSync(process.execPath, [resolve(import.meta.dirname, 'reset-test-students.mjs')], {
    stdio: 'inherit',
  });
}
