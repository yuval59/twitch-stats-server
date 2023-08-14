import { sql } from 'drizzle-orm'
import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const ChannelTable = mysqlTable('channel', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),

  created_at: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updated_at: timestamp('updated_at').onUpdateNow(),
})
