import { eq } from 'drizzle-orm'
import { uuid } from 'uuidv4'
import { DEFAULT_ROLE } from './constants'
import { Controller } from './controller'
import { RoleController } from './role'
import { UserTable } from './schemas'
import { NewUser, User } from './types'

export class UserController extends Controller {
  static createUser = async (params: NewUser) => {
    const { email, password, username } = params

    const id = uuid()

    const role =
      (await RoleController.getRoleByName(DEFAULT_ROLE)) ??
      (await RoleController.createRole(DEFAULT_ROLE, 0))

    await this.dbInstance.insert(UserTable).values({
      id,
      email,
      password,
      username,
      roleId: role.id,
    })

    return { id }
  }

  static getUserById = <IncludeRole extends boolean = true>(
    id: string,
    includeRole = true
  ): Promise<User<IncludeRole> | undefined> =>
    this.dbInstance.query.UserTable.findFirst({
      where: eq(UserTable.id, id),
      with: {
        role: includeRole ? true : undefined,
      },
    })

  static getUserByEmail = <IncludeRole extends boolean = true>(
    email: string,
    includeRole = true
  ): Promise<User<IncludeRole> | undefined> =>
    this.dbInstance.query.UserTable.findFirst({
      where: eq(UserTable.email, email),
      with: {
        role: includeRole ? true : undefined,
      },
    })

  static getUserByUsername = <IncludeRole extends boolean = true>(
    username: string,
    includeRole = true
  ): Promise<User<IncludeRole> | undefined> =>
    this.dbInstance.query.UserTable.findFirst({
      where: eq(UserTable.username, username),
      with: {
        role: includeRole ? true : undefined,
      },
    })

  static setUserRole = async (username: string, roleName: string) => {
    const role = await RoleController.getRoleByName(roleName)

    if (!role) throw 'Role not found'

    await this.dbInstance
      .update(UserTable)
      .set({ roleId: role.id })
      .where(eq(UserTable.username, username))
  }
}
