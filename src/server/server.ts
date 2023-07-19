import cors from 'cors'
import express from 'express'
import { env } from '../env'
import {
  adminRouter,
  channelsRouter,
  loginRouter,
  registerRouter,
  statusRouter,
} from './routers'

const app = express()

app.use(cors(), express.json())

app.use(statusRouter)
app.use(channelsRouter)
app.use(adminRouter)
app.use(registerRouter)
app.use(loginRouter)

export const initServer = () => {
  app.listen(env.SERVER_PORT)

  console.log(`Server is running on port ${env.SERVER_PORT}`)
}
