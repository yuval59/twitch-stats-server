import '@total-typescript/ts-reset'

import dayjs from 'dayjs'
import cron from 'node-cron'
import { DATABASE_DATE_FORMAT } from './constants'
import { ChannelController, DailyController } from './db'
import { initServer } from './server'
import { addTwitchChannel, initTwitch } from './twitch'

cron.schedule('5 0 * * *', () => {
  const date = dayjs().subtract(1, 'day')
  console.log(`Saving daily info for day ${date.format(DATABASE_DATE_FORMAT)}`)
  DailyController.saveDaily(date)
})

const start = async () => {
  await initTwitch()

  addTwitchChannel(
    ...(await ChannelController.getChannels()).map(({ name }) => name)
  )

  initServer()
}

start()
