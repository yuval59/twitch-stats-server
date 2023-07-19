import { z } from 'zod'
import { ERRORS, PASSWORD_PARAMS, USERNAME_PARAMS } from '../'

export const newChannelBodyShape = z.object({
  channelName: z.string(),
})

export const registerBodyShape = z.object({
  email: z.string().email(ERRORS.REGISTER.BODY.EMAIL.NOT_VALID),

  username: z
    .string()
    .min(USERNAME_PARAMS.MIN_LENGTH, ERRORS.REGISTER.BODY.USERNAME.TOO_SHORT)
    .max(USERNAME_PARAMS.MAX_LENGTH, ERRORS.REGISTER.BODY.USERNAME.TOO_LONG),

  password: z
    .string()
    .min(PASSWORD_PARAMS.MIN_LENGTH, ERRORS.REGISTER.BODY.PASSWORD.TOO_SHORT)
    .max(PASSWORD_PARAMS.MAX_LENGTH, ERRORS.REGISTER.BODY.PASSWORD.TOO_LONG)
    .regex(RegExp('(?=.*[a-z])'), ERRORS.REGISTER.BODY.PASSWORD.NO_LOWERCASE)
    .regex(RegExp('(?=.*[A-Z])'), ERRORS.REGISTER.BODY.PASSWORD.NO_UPPERCASE)
    .regex(RegExp('(?=.*\\d)'), ERRORS.REGISTER.BODY.PASSWORD.NO_DIGIT),
})

export const loginBodyShape = z.object({
  username: z.string(),
  password: z.string(),
})

export const roleChangeBodyShape = z.object({
  username: z.string(),
  roleName: z.string(),
})
