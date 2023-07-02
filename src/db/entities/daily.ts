import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { DailyChannelInfo } from '../types'

@Entity()
export class Daily extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  channel: string

  @Column('json')
  data: DailyChannelInfo

  @Column('date')
  day: string
}
