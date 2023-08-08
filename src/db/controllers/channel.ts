import { eq } from 'drizzle-orm'
import { uuid } from 'uuidv4'
import { Controller } from './controller'
import { ChannelTable } from './schemas'
import { Channel } from './types'

export class ChannelController extends Controller {
  static createChannel = async (name: string) => {
    await this.dbInstance.insert(ChannelTable).values({
      id: uuid(),
      name,
    })
  }

  static getChannels = (): Promise<Channel[]> =>
    this.dbInstance.select().from(ChannelTable)

  static getChannelByName = (name: string): Promise<Channel | undefined> =>
    this.dbInstance.query.ChannelTable.findFirst({
      where: eq(ChannelTable.name, name),
    })
}
