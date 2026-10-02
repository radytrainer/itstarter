import { z } from 'zod';

export const dependencyStatusSchema = z.object({
  status: z.enum(['up', 'down']),
  latencyMs: z.number().nonnegative(),
});

export const livenessSchema = z.object({
  status: z.literal('ok'),
  service: z.string(),
  version: z.string(),
  uptimeSeconds: z.number().nonnegative(),
});

export const readinessSchema = z.object({
  status: z.enum(['ok', 'degraded']),
  checks: z.object({
    database: dependencyStatusSchema,
    redis: dependencyStatusSchema,
  }),
});

export type DependencyStatus = z.infer<typeof dependencyStatusSchema>;
export type Liveness = z.infer<typeof livenessSchema>;
export type Readiness = z.infer<typeof readinessSchema>;
