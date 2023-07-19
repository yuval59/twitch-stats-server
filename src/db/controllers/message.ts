import {
  Message,
  getChannel,
  getTwitchUserOrCreate,
  messageRepository,
} from '../'
import { NewMessage } from './'

export const addMessage = async (params: NewMessage) => {
  const { message, badges, username, channelName } =
    params.channelName[0] == '#'
      ? { ...params, channelName: params.channelName.replace('#', '') }
      : params

  const channel = await getChannel(channelName)

  if (!channel) return

  const newMessage = new Message()

  const user = await getTwitchUserOrCreate({ username, badges, channel })

  newMessage.user = user
  newMessage.channel = channel
  newMessage.badges = badges
  newMessage.message = message

  await messageRepository.save(newMessage)

  console.log(`[${channelName}] ${username}: ${message}`)
}
