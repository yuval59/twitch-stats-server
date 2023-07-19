import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrAfter)

import { Between } from 'typeorm'
import { Daily, dailyRepository, messageRepository } from '../'
import { FORMATS } from '../../constants'
import { ByChannelObject, SaveDailyParams } from './'

export const saveDaily = async (params: SaveDailyParams) => {
  const { date } = params

  const dateObj = dayjs(date)

  const messages = await messageRepository.find({
    where: {
      timestamp: Between(
        new Date(dateObj.year(), dateObj.month(), dateObj.date()),
        new Date(dateObj.year(), dateObj.month(), dateObj.date() + 1)
      ),
    },
  })

  const byChannel: ByChannelObject = {}

  for (const message of messages) {
    if (!byChannel[message.channel.name])
      byChannel[message.channel.name] = {
        messages: 0,
        byBadge: {},
        byUser: {},
      }

    byChannel[message.channel.name].messages += 1

    byChannel[message.channel.name].byUser[message.user.username]
      ? (byChannel[message.channel.name].byUser[message.user.username] += 1)
      : (byChannel[message.channel.name].byUser[message.user.username] = 1)

    for (const badge in message.badges)
      byChannel[message.channel.name].byBadge[badge]
        ? (byChannel[message.channel.name].byBadge[badge] += 1)
        : (byChannel[message.channel.name].byBadge[badge] = 1)
  }

  for (const channel in byChannel) {
    const newDaily = new Daily()

    newDaily.channel = channel
    newDaily.day = dayjs(
      new Date(dateObj.year(), dateObj.month(), dateObj.date())
    ).format(FORMATS.DATABASE_DATE_FORMAT)

    newDaily.byUser = byChannel[channel].byUser
    newDaily.byBadge = byChannel[channel].byBadge
    newDaily.messages = byChannel[channel].messages

    await dailyRepository.save(newDaily)
  }
}
