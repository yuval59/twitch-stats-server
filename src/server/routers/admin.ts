import { Request, Response, Router } from 'express'
import { ROUTES } from '../'
import { setUserRole } from '../../db'
import { roleChange } from './middlewares'
import { roleChangeBodyShape } from './shapes'

export const adminRouter = Router()

adminRouter.patch(
  ROUTES.ADMIN.BASE + ROUTES.ADMIN.ROLE_CHANGE,
  [roleChange],
  async (req: Request, res: Response) => {
    try {
      const parsedBody = roleChangeBodyShape.safeParse(req.body)

      if (!parsedBody.success) return res.sendStatus(400)

      const { roleName, username } = parsedBody.data

      await setUserRole(username, roleName)

      res.json({ status: 'OK' })
    } catch (err) {
      console.error(err)

      res.sendStatus(500)
    }
  }
)
