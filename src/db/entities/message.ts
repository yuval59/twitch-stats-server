import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './user'

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, (user) => user.messages, {
    createForeignKeyConstraints: false,
  })
  user: User

  @Column('text')
  message: string

  @Column('json')
  tags: string[]

  @CreateDateColumn()
  timestamp: Date
}
