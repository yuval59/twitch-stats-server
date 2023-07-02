import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Badges } from '../types'
import { Message } from './message'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  username: string

  @Column('varchar')
  channel: string

  @Column('json')
  badges: Badges

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
