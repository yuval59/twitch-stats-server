import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './'

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', {
    unique: true,
  })
  name: string

  @Column('int')
  level: number

  @OneToMany(() => User, (user) => user.role)
  users: Promise<User[]>

  @CreateDateColumn()
  created_at: Date
}
