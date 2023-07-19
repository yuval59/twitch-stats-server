import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ByBadgeDaily, ByUserDaily } from '../'

@Entity()
export class Daily {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  channel: string

  @Column('bigint')
  messages: number

  @Column('json')
  byUser: ByUserDaily

  @Column('json')
  byBadge: ByBadgeDaily

  @Column('date')
  day: string
}
