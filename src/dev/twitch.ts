// This is for running twitch only while developing
// Don't write actual code in here

import { ChannelController } from '../db'
import { addTwitchChannel, initTwitch } from '../twitch'

const run = async () => {
  await initTwitch()

  addTwitchChannel(
    ...(await ChannelController.getChannels()).map(({ name }) => name)
  )
}

run()
