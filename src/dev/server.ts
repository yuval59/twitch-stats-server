// This is for running only the server while developing
// Don't write actual code in here

import { initDB } from '../db'
import { initServer } from '../server'

const start = async () => {
  await initDB()
  await initServer()
}

start()
