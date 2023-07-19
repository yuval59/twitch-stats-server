import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Channel, Daily, Message, Role, TwitchUser, User, entitiesArr } from '.'
import { env } from '../env'

const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_DATABASE,

  ssl: { rejectUnauthorized: true },

  entities: entitiesArr,
})

export const initDB = async () => {
  await AppDataSource.initialize()

  console.log('Database connected')
}

export const channelRepository = AppDataSource.getRepository(Channel)
export const messageRepository = AppDataSource.getRepository(Message)
export const userRepository = AppDataSource.getRepository(User)
export const twitchUserRepository = AppDataSource.getRepository(TwitchUser)
export const dailyRepository = AppDataSource.getRepository(Daily)
export const roleRepository = AppDataSource.getRepository(Role)
