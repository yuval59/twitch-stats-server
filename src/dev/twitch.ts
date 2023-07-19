// This is for running twitch only while developing
// Don't write actual code in here

import { getChannels, initDB } from '../db'
import { addTwitchChannel, initTwitch } from '../twitch'

const run = async () => {
  await initDB()
  await initTwitch()

  addTwitchChannel(...(await getChannels()).map(({ name }) => name))
}

run()
