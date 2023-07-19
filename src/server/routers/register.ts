import { genSalt, hash } from 'bcrypt'
import { Request, Response, Router } from 'express'
import { ERRORS, ROUTES } from '../'
import { createUser, getUserByEmail, getUserByUsername } from '../../db'
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

    if (await getUserByEmail(email))
      return res.status(400).send(ERRORS.REGISTER.EMAIL_EXISTS)

    if (await getUserByUsername(username))
      return res.status(400).send(ERRORS.REGISTER.USERNAME_EXISTS)

    const newUser = await createUser({
      email,
      username,
      password: await encryptPassword(password),
    })

    const role = await newUser.role

    res.json(
      createResJson({
        id: newUser.id,
        email,
        username,

        role: {
          name: role.name,
          level: role.level,
        },
      })
    )
  } catch (err) {
    console.error(err)

    res.sendStatus(500)
  }
})
