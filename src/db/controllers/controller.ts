import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { env } from '../../env'
import { schema } from './schemas'

const connection = connect({
  host: env.PLANETSCALE_HOST,
  username: env.PLANETSCALE_USER,
  password: env.PLANETSCALE_PASS,
})

const db = drizzle(connection, { schema })

export abstract class Controller {
  protected static readonly dbInstance = db
}
