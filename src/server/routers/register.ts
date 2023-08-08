import { genSalt, hash } from 'bcrypt'
import { Request, Response, Router } from 'express'
import { ERRORS, ROUTES } from '../'
import { UserController } from '../../db'
import { createResJson } from './'
import { registerBodyShape } from './shapes'

const encryptPassword = async (plaintextPass: string) =>
  hash(plaintextPass, await genSalt())

export const registerRouter = Router()

registerRouter.post(ROUTES.REGISTER, async (req: Request, res: Response) => {
  try {
    const parsed = registerBodyShape.safeParse(req.body)

    if (!parsed.success)
      return res
        .status(400)
        .send(
          parsed.error.issues.length > 1
            ? parsed.error.issues
            : parsed.error.issues[0]
        )

    const { email, password, username } = parsed.data

    if (await UserController.getUserByEmail(email))
      return res.status(400).send(ERRORS.REGISTER.EMAIL_EXISTS)

    if (await UserController.getUserByUsername(username))
      return res.status(400).send(ERRORS.REGISTER.USERNAME_EXISTS)

    await UserController.createUser({
      email,
      username,
      password: await encryptPassword(password),
    })

    const newUser = await UserController.getUserByUsername(username)

    if (!newUser) throw 'What the hell'

    res.json(
      createResJson({
        id: newUser.id,
        email,
        username,

        role: {
          name: newUser.role.name,
          level: newUser.role.level,
        },
      })
    )
  } catch (err) {
    console.error(err)

    res.sendStatus(500)
  }
})
