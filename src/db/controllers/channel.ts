import { Channel, channelRepository } from '../'

export const createChannel = async (name: string) => {
  const newChannel = new Channel()

  newChannel.name = name

  await channelRepository.save(newChannel)

  return newChannel
}

export const getChannels = () => channelRepository.find()

export const getChannel = async (name: string) =>
  channelRepository.findOneBy({ name })
