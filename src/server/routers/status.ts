import { Request, Response, Router } from 'express'
import { ROUTES } from '../'

export const statusRouter = Router()

statusRouter.get(ROUTES.STATUS, [], async (req: Request, res: Response) => {
  console.log('Status OK')

  res.json({ status: 'OK', coolsies: 'COOLSIES' })
})
