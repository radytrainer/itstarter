import { loadLocalEnv } from './config/load-local-env';
import { loadConfig } from './config/env';
import { attachConnectionErrorHandlers, closeDeps, createDeps } from './deps';
import { buildApp } from './app';

loadLocalEnv(import.meta.dirname);

const config = loadConfig();
const deps = createDeps(config);
const app = await buildApp(config, deps);
attachConnectionErrorHandlers(deps, app.log);

const shutdown = async (signal: string) => {
  app.log.info({ signal }, 'Shutting down');
  await app.close();
  await closeDeps(deps);
  process.exit(0);
};
process.once('SIGTERM', () => void shutdown('SIGTERM'));
process.once('SIGINT', () => void shutdown('SIGINT'));

try {
  await app.listen({ host: config.API_HOST, port: config.API_PORT });
} catch (err) {
  app.log.fatal({ err }, 'Failed to start API');
  await closeDeps(deps);
  process.exit(1);
}
