import dayjs from 'dayjs'
import cron from 'node-cron'
import { FORMATS } from './constants'
import { getChannels, initDB, saveDaily } from './db'
import { initServer } from './server'
import { addTwitchChannel, initTwitch } from './twitch'

cron.schedule('5 0 * * *', () => {
  const date = dayjs().subtract(1, 'day').format(FORMATS.DATABASE_DATE_FORMAT)
  console.log(`Saving daily info for day ${date}`)
  saveDaily({ date })
})

const start = async () => {
  await initDB()
  await initTwitch()

  addTwitchChannel(...(await getChannels()).map(({ name }) => name))

  initServer()
}

start()
