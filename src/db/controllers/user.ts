import { FindOptionsWhere } from 'typeorm'
import { User, userRepository } from '../'
import {
  DEFAULT_ROLE,
  GetUserParams,
  NewUser,
  createRole,
  getRoleByName,
} from './'

export const createUser = async (params: NewUser) => {
  const { email, password, username } = params

  const newUser = new User()

  newUser.email = email
  newUser.password = password
  newUser.username = username

  newUser.role = Promise.resolve(
    (await getRoleByName(DEFAULT_ROLE)) ?? (await createRole(DEFAULT_ROLE, 0))
  )

  await userRepository.save(newUser)

  return newUser
}

export const getUser = async (params: GetUserParams) => {
  const queryArr: FindOptionsWhere<User>[] = []

  if ('email' in params) queryArr.push({ email: params.email })
  if ('username' in params) queryArr.push({ username: params.username })

  return userRepository.findOneBy(queryArr)
}

export const getUserByEmail = async (email: string) =>
  userRepository.findOneBy({ email })

export const getUserByUsername = async (username: string) =>
  userRepository.findOneBy({ username })

export const setUserRole = async (username: string, roleName: string) => {
  const role = await getRoleByName(roleName)
  const user = await getUserByUsername(username)

  if (!user) throw 'User not found'
  if (!role) throw 'Role not found'

  user.role = Promise.resolve(role)

  userRepository.save(user)
}
