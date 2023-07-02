import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Badges } from '../types'
import { User } from './user'

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, (user) => user.messages, {
    createForeignKeyConstraints: false,
    eager: true,
  })
  user: User

  @Column('varchar')
  channel: string

  @Column('text')
  message: string

  @Column('json')
  badges: Badges

  @CreateDateColumn()
  timestamp: Date
}
