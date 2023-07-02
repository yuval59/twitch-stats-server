// This is for running twitch only while developing
// Don't write actual code in here

import { initDB } from '../db'
import { initTwitch } from '../twitch/server'

const start = async () => {
  await initDB()
  await initTwitch()
}

start()
