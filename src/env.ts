import { createEnv } from '@t3-oss/env-core'
import 'dotenv/config'
import { z } from 'zod'

export const env = createEnv({
  server: {
    // API params
    PORT: z.string().transform((port) => parseInt(port)),
    JWT_SECRET: z.string(),

    // Database params
    PLANETSCALE_HOST: z.string(),
    PLANETSCALE_USER: z.string(),
    PLANETSCALE_PASS: z.string(),
    PLANETSCALE_DB: z.string(),

    // Twitch params
    TWITCH_OAUTH_TOKEN: z.string(),
    TWITCH_USERNAME: z.string(),
  },

  runtimeEnv: process.env,
})
