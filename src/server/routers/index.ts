export { adminRouter } from './admin'
export { channelsRouter } from './channels'
export { loginRouter } from './login'
export { registerRouter } from './register'
export { statusRouter } from './status'

import { getJWTSignature } from '../'
import { ResJsonParams } from './types'

export const createResJson = (params: ResJsonParams) => ({
  email: params.email,
  username: params.username,
  id: params.id,
  role: params.role,

  jwt: getJWTSignature({
    username: params.username,
    id: params.id,

    role: {
      name: params.role.name,
      level: params.role.level,
    },
  }),
})
