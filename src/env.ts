import { createEnv } from '@t3-oss/env-core'
import 'dotenv/config'
import { z } from 'zod'

export const env = createEnv({
  server: {
    // API params
    PORT: z.string().transform((port) => parseInt(port)),
    JWT_SECRET: z.string(),

    // Database params
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASS: z.string(),
    DB_PORT: z.string().transform((port) => parseInt(port)),
    DB_DATABASE: z.string(),

    // Twitch params
    TWITCH_OAUTH_TOKEN: z.string(),
    TWITCH_USERNAME: z.string(),
  },

  runtimeEnv: process.env,
})
