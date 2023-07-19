import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Badges } from '../'
import { Channel, TwitchUser } from './'

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => TwitchUser, (user) => user.messages, {
    createForeignKeyConstraints: false,
    eager: true,
  })
  user: TwitchUser

  @ManyToOne(() => Channel, (channel) => channel.messages, {
    createForeignKeyConstraints: false,
    eager: true,
  })
  channel: Channel

  @Column('text')
  message: string

  @Column('json')
  badges: Badges

  @CreateDateColumn()
  timestamp: Date
}
