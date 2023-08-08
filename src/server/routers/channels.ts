import { Request, Response, Router } from 'express'
import { ROUTES } from '../'
import { ChannelController } from '../../db'
import { addTwitchChannel } from '../../twitch'
import { levelRequired, verifyJWT } from './middlewares'
import { newChannelBodyShape } from './shapes'

export const channelsRouter = Router()

channelsRouter.get(
  ROUTES.CHANNELS,
  [verifyJWT],
  async (req: Request, res: Response) => {
    try {
      res.json({
        channels: await ChannelController.getChannels(),
      })
    } catch (err) {
      console.error(err)

      res.sendStatus(500)
    }
  }
)

channelsRouter.post(
  ROUTES.CHANNELS,
  [levelRequired(1)],
  async (req: Request, res: Response) => {
    try {
      const parsed = newChannelBodyShape.safeParse(req.body)

      if (!parsed.success) return res.sendStatus(400)

      const { channelName } = parsed.data

      const gotChannel = await ChannelController.getChannelByName(channelName)

      if (gotChannel)
        return res.json({ status: 'Success', channel: gotChannel })

      const channel = await ChannelController.createChannel(channelName)

      addTwitchChannel(channelName)

      res.json({ status: 'Success', channel })
    } catch (err) {
      console.error(err)

      res.sendStatus(500)
    }
  }
)
