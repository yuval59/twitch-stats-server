import { addMessage, initDB } from './db'

const startServer = async () => {
  await initDB()

  addMessage({
    username: 'yuval59',
    message: 'test',
    tags: [],
  })
}

export default startServer
