import tmi from 'tmi.js'
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
})

client.on(
  'message',
  (
    channel: string,
    tags: tmi.ChatUserstate,
    message: string,
    self: boolean
  ) => {
    if (self || tags['message-type'] != 'chat') return

    try {
      addMessage({
        message,
        channelName: channel,
        badges: tags.badges ?? {},
        username: tags.username ?? '',
      })
    } catch (err) {
      console.error(err)
    }
  }
)

export const initTwitch = async () => {
  await client.connect()

  console.log(`Connected to the Twitch API`)
}

export const addTwitchChannel = async (...channelNames: string[]) => {
  try {
    for (const channelName of channelNames) await client.join(channelName)

    await client.disconnect()
    await client.connect()

    console.log(`Connected to channels ${channelNames}`)
  } catch (err) {
    console.error(err)
  }
}
