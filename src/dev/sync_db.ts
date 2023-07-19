// This is for syncing the database while developing
// Don't write actual code in here

import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { entitiesArr } from '../db'
import { env } from '../env'

const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_DATABASE,

  synchronize: true,
  ssl: { rejectUnauthorized: true },

  entities: entitiesArr,
})

const initDB = async () => {
  await AppDataSource.initialize()

  console.log('Database connected')
}

const run = async () => {
  await initDB()
}

run()
