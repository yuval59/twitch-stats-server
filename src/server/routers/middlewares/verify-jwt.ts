import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { env } from '../../../env'
import { jwtDataShape } from './shapes'

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization

    if (!token) return res.sendStatus(400)

    verify(token.replace('Bearer ', ''), env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json(err)

      const parsed = jwtDataShape.safeParse(decoded)

      if (!parsed.success) return res.sendStatus(400)

      next()
    })
  } catch (err) {
    console.error(err)

    res.sendStatus(500)
  }
}
