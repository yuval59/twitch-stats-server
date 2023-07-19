import { compareSync } from 'bcrypt'
import { Request, Response, Router } from 'express'
import { ERRORS, ROUTES } from '../'
import { getUserByUsername } from '../../db'
import { createResJson } from './'
import { loginBodyShape } from './shapes'

export const loginRouter = Router()

loginRouter.post(ROUTES.LOGIN, async (req: Request, res: Response) => {
  try {
    const parsed = loginBodyShape.safeParse(req.body)

    if (!parsed.success) return res.sendStatus(400)

    const { password, username } = parsed.data

    const user = await getUserByUsername(username)

    if (!user) return res.status(404).send(ERRORS.LOGIN.USER_NOT_FOUND)

    if (!compareSync(password, user.password))
      return res.status(401).send(ERRORS.LOGIN.INCORRECT_PASSWORD)

    const role = await user.role

    res.json(
      createResJson({
        username,
        id: user.id,
        email: user.email,

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
