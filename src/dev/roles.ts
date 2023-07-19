// This is for syncing roles while developing
// Don't write actual code in here

import { createRole, initDB } from '../db'

const run = async () => {
  await initDB()

  await createRole('user', 0)
  await createRole('admin', 1)
}

run()
