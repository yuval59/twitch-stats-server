import { Badges, ByBadgeDaily, ByUserDaily, Channel } from '../'

export type GetUserParams =
  | { username: string }
  | { email: string }
  | { username: string; email: string }

export type NewUser = {
  email: string
  username: string
  password: string
}

export type NewTwitchUser = {
  username: string
  channel: Channel
  badges: Badges
}

export type NewMessage = {
  username: string
  channelName: string
  message: string
  badges: Badges
}

export type SaveDailyParams = { date: string }

export type ByChannelObject = {
  [channelName: string]: {
    messages: number
    byBadge: ByBadgeDaily
    byUser: ByUserDaily
  }
}
