import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Message, TwitchUser } from './'

@Entity()
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', {
    unique: true,
  })
  name: string

  @OneToMany(() => Message, (message) => message.channel)
  messages: Promise<Message[]>

  @OneToMany(() => TwitchUser, (user) => user.channel, {
    eager: true,
  })
  users: TwitchUser[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
