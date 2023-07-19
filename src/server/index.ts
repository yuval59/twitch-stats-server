export {
  ERRORS,
  JWT_EXPIRATION,
  PASSWORD_PARAMS,
  ROUTES,
  USERNAME_PARAMS,
} from './constants'
export { initServer } from './server'

import { sign } from 'jsonwebtoken'
import { env } from '../env'
import { JWT_EXPIRATION } from './constants'
import { JwtParams } from './types'

export const getJWTSignature = (params: JwtParams) =>
  sign(params, env.JWT_SECRET, { expiresIn: JWT_EXPIRATION })
