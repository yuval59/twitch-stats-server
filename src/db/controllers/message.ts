import { between } from 'drizzle-orm'
import { uuid } from 'uuidv4'
import { ChannelController } from './channel'
import { Controller } from './controller'
import { MessageTable } from './schemas'
import { Message, NewMessage } from './types'

export class MessageController extends Controller {
  static addMessage = async (params: NewMessage) => {
    const { message, badges, username, channelName } =
      params.channelName[0] == '#'
        ? { ...params, channelName: params.channelName.replace('#', '') }
        : params

    const channel = await ChannelController.getChannelByName(channelName)

    if (!channel) return

    await this.dbInstance.insert(MessageTable).values({
      id: uuid(),
      badges,
      message,
      username,
      channelId: channel.id,
    })

    console.log(`[${channelName}] ${username}: ${message}`)
  }

  static getMessagesBetween = async (
    minDate: Date,
    maxDate: Date
  ): Promise<Message<true>[]> => {
    const res = await this.dbInstance.query.MessageTable.findMany({
      where: between(MessageTable.timestamp, minDate, maxDate),
      with: {
        channel: true,
      },
    })

    return res as Message<true>[]
  }
}
