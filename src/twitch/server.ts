import tmi from 'tmi.js'
import { CHANNELS } from '../constants'
import { addMessage } from '../db'
import { env } from '../env'

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },

  //Get OAUTH at https://twitchapps.com/tmi/
  identity: {
    username: env.TWITCH_USERNAME,
    password: env.TWITCH_OAUTH_TOKEN,
  },
  channels: CHANNELS,
})

export const initTwitch = () =>
  client
    .connect()
    .catch((error) => console.error(error))
    .then(() => console.log(`Connected`))

client.on('message', (channel, tags, message, self) => {
  if (self || tags['message-type'] != 'chat') return

  addMessage({
    message,
    channel,
    badges: tags.badges ?? {},
    username: tags.username ?? '',
  })
})
