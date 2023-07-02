import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import 'reflect-metadata'
import { Between, DataSource } from 'typeorm'
import { DATABASE_DATE_FORMAT } from '../constants'
import { env } from '../env'
import { Message, User } from './entities'
import { Daily } from './entities/daily'
import { ByChannelObject, NewMessage, NewUser, SaveDailyParams } from './types'

dayjs.extend(isSameOrAfter)

const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_DATABASE,

  // synchronize: true,
  ssl: { rejectUnauthorized: true },

  entities: [Message, User, Daily],
})

export const initDB = () =>
  AppDataSource.initialize().then(() => console.log('Database connected'))

const addUser = async (params: NewUser) => {
  const { username, badges, channel } = params

  const user = new User()

  user.username = username
  user.channel = channel
  user.badges = badges

  await AppDataSource.manager.save(user)

  console.log(`user ${user.username} has been saved. user id is ${user.id}`)

  return user
}

const getUserOrCreate = async (params: NewUser) => {
  const { badges, username, channel } = params

  const user =
    (await User.findOneBy({ username, channel })) ??
    (await addUser({ username, badges, channel }))

  if (user.badges != badges) {
    user.badges = badges
    await AppDataSource.manager.save(user)
  }

  return user
}

export const addMessage = async (params: NewMessage) => {
  const { message, badges, username, channel } =
    params.channel[0] == '#'
      ? { ...params, channel: params.channel.replace('#', '') }
      : params

  const newMessage = new Message()

  const user = await getUserOrCreate({ username, badges, channel })

  newMessage.user = user
  newMessage.channel = channel
  newMessage.badges = badges
  newMessage.message = message

  await AppDataSource.manager.save(newMessage)

  console.log(`[${channel}] ${username}: ${message}`)
}

export const saveDaily = async (params: SaveDailyParams) => {
  const { date } = params

  const dateObj = dayjs(date)

  const messages = await Message.find({
    where: {
      timestamp: Between(
        new Date(dateObj.year(), dateObj.month(), dateObj.date()),
        new Date(dateObj.year(), dateObj.month(), dateObj.date() + 1)
      ),
    },
  })

  const byChannel: ByChannelObject = {}

  for (const message of messages) {
    if (!byChannel[message.channel])
      byChannel[message.channel] = {
        messages: 0,
        byBadge: {},
        byUser: {},
      }

    byChannel[message.channel].messages += 1

    byChannel[message.channel].byUser[message.user.username]
      ? (byChannel[message.channel].byUser[message.user.username] += 1)
      : (byChannel[message.channel].byUser[message.user.username] = 1)

    for (const badge in message.badges)
      byChannel[message.channel].byBadge[badge]
        ? (byChannel[message.channel].byBadge[badge] += 1)
        : (byChannel[message.channel].byBadge[badge] = 1)
  }

  for (const channel in byChannel) {
    const newDaily = new Daily()
    newDaily.channel = channel
    newDaily.day = dayjs(
      new Date(dateObj.year(), dateObj.month(), dateObj.date())
    ).format(DATABASE_DATE_FORMAT)
    newDaily.data = byChannel[channel]

    await AppDataSource.manager.save(newDaily)
  }
}
