import { Role, roleRepository } from '../'

export const createRole = async (name: string, level: number) => {
  const oldRole = await roleRepository.findOneBy({ name: name })

  if (oldRole) return oldRole

  const newRole = new Role()

  newRole.name = name
  newRole.level = level

  await roleRepository.save(newRole)

  return newRole
}

export const getRoleByName = async (name: string) =>
  roleRepository.findOneBy({ name })
