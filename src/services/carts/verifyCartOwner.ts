import { NextFunction, Request, Response } from 'express'
import { Application } from '../../declarations'

export const verifyCartOwner = (app: Application) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req as any
    const { cartId } = req.body

    if (!user) {
      return res.status(403).json({ error: 'You are not authenticated' })
    }

    try {
      const cart = await app.service('carts').get(cartId)

      if (cart.userId.toString() !== user._id.toString() && user.email !== 'admin@admin.com') {
        return res.status(403).json({ error: 'You do not have permission to access this cart' })
      }

      next()
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
}
