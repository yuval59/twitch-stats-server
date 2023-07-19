export const ROUTES = {
  STATUS: '/status',
  CHANNELS: '/channels',
  REGISTER: '/register',
  LOGIN: '/login',
  ADMIN: {
    BASE: '/admin',
    ROLE_CHANGE: '/user',
  },
} as const

export const JWT_EXPIRATION = '2h' as const

export const PASSWORD_PARAMS = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 30,
} as const

export const USERNAME_PARAMS = {
  MIN_LENGTH: 6,
  MAX_LENGTH: 30,
} as const

export const ERRORS = {
  REGISTER: {
    EMAIL_EXISTS: 'A user with this email address already exists.',
    USERNAME_EXISTS: 'A user with this username already exists.',

    BODY: {
      EMAIL: {
        NOT_VALID: 'Email must be a valid email address',
      },

      USERNAME: {
        TOO_SHORT: `Username must be at least ${USERNAME_PARAMS.MIN_LENGTH} digits long`,
        TOO_LONG: `Username must be at most ${USERNAME_PARAMS.MAX_LENGTH} digits long`,
      },

      PASSWORD: {
        TOO_SHORT: `Password must be at least ${PASSWORD_PARAMS.MIN_LENGTH} digits long`,
        TOO_LONG: `Password must be at most ${PASSWORD_PARAMS.MAX_LENGTH} digits long`,
        NO_LOWERCASE: 'Password must include a lowercase letter',
        NO_UPPERCASE: 'Password must include an uppercase letter',
        NO_DIGIT: 'Password must include a digit',
      },
    },
  },

  LOGIN: {
    USER_NOT_FOUND: 'User not found',
    INCORRECT_PASSWORD: 'Incorrect password',
  },
} as const
