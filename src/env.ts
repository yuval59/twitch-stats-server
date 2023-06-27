import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASS: z.string(),
    DB_PORT: z.string(),
    DB_DATABASE: z.string(),
  },
  runtimeEnv: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_PORT: process.env.DB_PORT,
    DB_DATABASE: process.env.DB_DATABASE,
  },
})
