export type NewUser = {
  username: string
  channel: string
  badges: Badges
}

export type NewMessage = {
  username: string
  channel: string
  message: string
  badges: Badges
}

export type Badges = {
  admin?: string | undefined
  bits?: string | undefined
  broadcaster?: string | undefined
  partner?: string | undefined
  global_mod?: string | undefined
  moderator?: string | undefined
  vip?: string | undefined
  subscriber?: string | undefined
  staff?: string | undefined
  turbo?: string | undefined
  premium?: string | undefined
  founder?: string | undefined
  ['bits-leader']?: string | undefined
  ['sub-gifter']?: string | undefined
  [other: string]: string | undefined
}
