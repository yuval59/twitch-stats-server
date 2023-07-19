import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Role } from './'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', {
    unique: true,
  })
  email: string

  @Column('varchar', {
    unique: true,
  })
  username: string

  @Column('varchar')
  password: string

  @ManyToOne(() => Role, (role) => role.users, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  role: Promise<Role>

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
