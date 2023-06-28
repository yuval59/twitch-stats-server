import { initDB } from './db'
import { initTwitch } from './twitch/server'

const startServer = async () => {
  await initDB()
  await initTwitch()
}

export default startServer
