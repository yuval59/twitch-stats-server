import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Badges } from '../'
import { Channel, Message } from './'

@Entity()
export class TwitchUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  username: string

  @ManyToOne(() => Channel, (channel) => channel.users, {
    createForeignKeyConstraints: false,
  })
  channel: Promise<Channel>

  @Column('json')
  badges: Badges

  @OneToMany(() => Message, (message) => message.user)
  messages: Promise<Message[]>

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
