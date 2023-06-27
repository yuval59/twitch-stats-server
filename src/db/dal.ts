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

export const addUser = async (params: NewUser) => {
  const { username, tags } = params

  const user = new User()

  user.username = username
  user.tags = tags

  await AppDataSource.manager.save(user)

  console.log(`user ${user.username} has been saved. user id is ${user.id}`)

  return user
}

const getUserOrCreate = async (params: NewUser) => {
  const { tags, username } = params

  const user =
    (await User.findOneBy({ username })) ?? (await addUser({ username, tags }))

  if (user.tags != tags) {
    user.tags = tags
    await AppDataSource.manager.save(user)
  }

  return user
}

export const addMessage = async (params: NewMessage) => {
  const { message, tags, username } = params

  const newMessage = new Message()

  const user = await getUserOrCreate({ username, tags })

  newMessage.user = user
  newMessage.message = message
  newMessage.tags = tags

  await AppDataSource.manager.save(newMessage)

  console.log(`message has been saved. message id is ${newMessage.id}`)
}
