import dayjs from 'dayjs'
import 'dotenv/config'
import cron from 'node-cron'
import { DATABASE_DATE_FORMAT } from './constants'
import { initDB, saveDaily } from './db'
import { initServer } from './server'
import { initTwitch } from './twitch'

cron.schedule('5 0 * * *', () => {
  const date = dayjs().subtract(1, 'day').format(DATABASE_DATE_FORMAT)
  console.log(`Saving daily info for day ${date}`)
  saveDaily({ date })
})

const start = async () => {
  await initDB()
  await initTwitch()
  await initServer()
}

start()
