import { eq } from 'drizzle-orm'
import { uuid } from 'uuidv4'
import { Controller } from './controller'
import { RoleTable } from './schemas'
import { Role } from './types'

export class RoleController extends Controller {
  static createRole = async (
    name: string,
    level: number
  ): Promise<{ id: string }> => {
    // The reason I return the object with the id is Drizzle doesn't support insert returning in MySQL, and this simplifies the user creation process
    const id = uuid()

    await this.dbInstance.insert(RoleTable).values({
      id,
      name,
      level,
    })

    return { id }
  }

  static getRoleByName = async (name: string): Promise<Role | undefined> =>
    this.dbInstance.query.RoleTable.findFirst({
      where: eq(RoleTable.name, name),
    })
}
