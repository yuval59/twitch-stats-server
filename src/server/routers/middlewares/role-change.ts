import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { RoleController, UserController } from '../../../db'
import { env } from '../../../env'
import { roleChangeBodyShape } from '../shapes'
import { jwtDataShape } from './shapes'

export const roleChange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization

    if (!token) return res.sendStatus(400)

    verify(
      token.replace('Bearer ', ''),
      env.JWT_SECRET,
      async (err, decoded) => {
        if (err) return res.status(401).json(err)

        const parsedJWT = jwtDataShape.safeParse(decoded)
        const parsedBody = roleChangeBodyShape.safeParse(req.body)

        if (!parsedJWT.success)
          return res.status(400).json(parsedJWT.error.issues)
        if (!parsedBody.success)
          return res.status(400).json(parsedBody.error.issues)

        const { roleName, username } = parsedBody.data

        const role = await RoleController.getRoleByName(roleName)
        const user = await UserController.getUserByUsername(username)
        const selfLevel = parsedJWT.data.role.level

        if (!role || !user) return res.sendStatus(400)

        if (role.level > selfLevel || !(user.role.level < selfLevel))
          return res.sendStatus(403)

        next()
      }
    )
  } catch (err) {
    console.error(err)

    res.sendStatus(500)
  }
}
