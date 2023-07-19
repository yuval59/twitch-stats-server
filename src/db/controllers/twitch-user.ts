import { TwitchUser, twitchUserRepository } from '../'
import { NewTwitchUser } from './'

const createTwitchUser = async (params: NewTwitchUser) => {
  const { username, badges, channel } = params

  const newTwitchUser = new TwitchUser()

  newTwitchUser.username = username
  newTwitchUser.channel = Promise.resolve(channel)
  newTwitchUser.badges = badges

  await twitchUserRepository.save(newTwitchUser)

  console.log(
    `user ${newTwitchUser.username} has been saved. user id is ${newTwitchUser.id}`
  )

  return newTwitchUser
}

export const getTwitchUserOrCreate = async (params: NewTwitchUser) => {
  const { badges, username, channel } = params

  const user =
    channel.users.find((user) => user.username == username) ??
    (await createTwitchUser(params))

  if (JSON.stringify(user.badges) != JSON.stringify(badges)) {
    user.badges = badges
    await twitchUserRepository.save(user)
  }

  return user
}
