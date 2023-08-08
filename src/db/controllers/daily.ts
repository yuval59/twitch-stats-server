import dayjs from 'dayjs'
import { uuid } from 'uuidv4'
import { ChannelController } from './channel'
import { Controller } from './controller'
import { MessageController } from './message'
import { DailyTable } from './schemas'
import { ByChannelObject } from './types'

export class DailyController extends Controller {
  static saveDaily = async (date: dayjs.Dayjs) => {
    const dateObj = dayjs(date)

    const messages = await MessageController.getMessagesBetween(
      new Date(dateObj.year(), dateObj.month(), dateObj.date()),
      new Date(dateObj.year(), dateObj.month(), dateObj.date() + 1)
    )

    const byChannel: ByChannelObject = {}

    for (const message of messages) {
      if (!byChannel[message.channel.name])
        byChannel[message.channel.name] = {
          messages: 0,
          byBadge: {},
          byUser: {},
        }

      byChannel[message.channel.name].messages += 1

      byChannel[message.channel.name].byUser[message.username]
        ? (byChannel[message.channel.name].byUser[message.username] += 1)
        : (byChannel[message.channel.name].byUser[message.username] = 1)

      for (const badge in message.badges)
        byChannel[message.channel.name].byBadge[badge]
          ? (byChannel[message.channel.name].byBadge[badge] += 1)
          : (byChannel[message.channel.name].byBadge[badge] = 1)
    }

    for (const channelName in byChannel) {
      const channel = await ChannelController.getChannelByName(channelName)

      if (!channel) continue

      await this.dbInstance.insert(DailyTable).values({
        id: uuid(),
        channelId: channel.id,
        byBadge: byChannel[channelName].byBadge,
        byUser: byChannel[channelName].byUser,
        messages: byChannel[channelName].messages,
        day: new Date(dateObj.year(), dateObj.month(), dateObj.date()),
      })
    }
  }
}
