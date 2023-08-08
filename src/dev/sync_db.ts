// This is for syncing the database while developing
// Don't write actual code in here

import { env } from '../env'

import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { migrate } from 'drizzle-orm/planetscale-serverless/migrator'
import { schema } from '../db/controllers/schemas'

const connection = connect({
  host: env.PLANETSCALE_HOST,
  username: env.PLANETSCALE_USER,
  password: env.PLANETSCALE_PASS,
})

const db = drizzle(connection, { schema })

const run = async () => {
  await migrate(db, { migrationsFolder: 'drizzle' })

  console.log('Database migrated successfully')
}

run()
