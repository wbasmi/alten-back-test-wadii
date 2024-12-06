import { Application } from '../../declarations'
import { Request, Response } from 'express'
import { authenticate } from '@feathersjs/express'

export default function (app: Application) {
  app.post('/wishlist/add-product', authenticate('jwt'), async (req: Request, res: Response) => {
    const { wishlistId, productId } = req.body

    try {
      const result = await app.service('wishlists').addProduct(wishlistId, productId)
      res.status(200).json(result)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })

  app.post('/wishlist/remove-product', authenticate('jwt'), async (req: Request, res: Response) => {
    const { wishlistId, productId } = req.body
    try {
      const result = await app.service('wishlists').removeProduct(wishlistId, productId)
      res.json(result)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
}
