import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { env } from '../env'
import { NewMessage, NewUser } from '../types'
import { Message, User } from './entities'

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

  entities: [Message, User],
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
