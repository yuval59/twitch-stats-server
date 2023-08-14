import { sql } from 'drizzle-orm'
import {
  json,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

export const MessageTable = mysqlTable('message', {
  id: varchar('id', { length: 36 }).primaryKey(),

  username: varchar('username', { length: 255 }).notNull(),
  message: text('message').notNull(),
  badges: json('badges').notNull(),

  timestamp: timestamp('timestamp').default(sql`CURRENT_TIMESTAMP`),

  channelId: varchar('channelId', { length: 36 }).notNull(),
})
