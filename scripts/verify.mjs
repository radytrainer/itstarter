// Runs the same checks as CI, in the same order, and prints a summary.
//   npm run verify            static checks, unit + integration tests with coverage, audit
//   npm run verify -- --e2e   also the browser tests (the Docker stack must be running)
// Integration tests need PostgreSQL + Redis: `npm run docker:deps` (or the full stack).
import { spawnSync } from 'node:child_process';

const withE2e = process.argv.includes('--e2e');

const steps = [
  ['Formatting', 'npm run format:check'],
  ['Lint', 'npm run lint'],
  ['Types', 'npm run typecheck'],
  ['Web tests + coverage', 'npm run test:coverage -w @itstarter/web'],
  ['API unit + integration tests + coverage', 'npm run test:coverage -w @itstarter/api'],
  ['Production dependency audit', 'npm audit --omit=dev --audit-level=moderate'],
  ...(withE2e ? [['Browser tests (E2E)', 'npm run test:e2e']] : []),
];

const results = [];
for (const [name, command] of steps) {
  console.log(`\n━━━ ${name} ━━━  (${command})\n`);
  const started = Date.now();
  const { status } = spawnSync(command, { stdio: 'inherit', shell: true });
  results.push({ name, ok: status === 0, seconds: Math.round((Date.now() - started) / 1000) });
}

console.log('\n━━━ Summary ━━━');
for (const r of results) console.log(`${r.ok ? '✔' : '✘'} ${r.name.padEnd(42)} ${r.seconds}s`);
if (!withE2e) console.log('ℹ Browser tests not run (add -- --e2e with the Docker stack running).');
const failed = results.filter((r) => !r.ok).length;
console.log(failed === 0 ? '\nAll checks passed.' : `\n${failed} check(s) failed.`);
process.exit(failed === 0 ? 0 : 1);
