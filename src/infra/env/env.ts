import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  PGADMIN_DEFAULT_EMAIL: z.string(),
  PGADMIN_DEFAULT_PASSWORD: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_AT_EXPIRES: z.string(),
  JWT_RT_EXPIRES: z.string(),
});

export type Env = z.infer<typeof envSchema>;
