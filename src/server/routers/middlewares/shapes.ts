import dayjs from 'dayjs'
import { z } from 'zod'

export const jwtDataShape = z.object({
  id: z.string(),
  username: z.string(),

  role: z.object({
    name: z.string(),
    level: z.number(),
  }),

  iat: z.number().transform((epoch) => dayjs(epoch)),
  exp: z.number().transform((epoch) => dayjs(epoch)),
})
