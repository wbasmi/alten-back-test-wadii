import { Application } from '../../declarations'
import { Request, Response } from 'express'
import { authenticate } from '@feathersjs/express'

export default function (app: Application) {
  app.post(
    '/cart/add-product',
    authenticate('jwt'),
    // verifyCartOwner(app),
    async (req: Request, res: Response) => {
      const { cartId, productId } = req.body
      try {
        const result = await app.service('carts').addProduct(cartId, productId)
        res.json(result)
      } catch (error: any) {
        res.status(500).json({ error: error.message })
      }
    }
  )

  app.post(
    '/cart/remove-product',
    authenticate('jwt'),
    // verifyCartOwner(app),
    async (req: Request, res: Response) => {
      const { cartId, productId } = req.body
      try {
        const result = await app.service('carts').removeProduct(cartId, productId)
        res.json(result)
      } catch (error: any) {
        res.status(500).json({ error: error.message })
      }
    }
  )

  app.post(
    '/cart/update-product-quantity',
    authenticate('jwt'),
    // verifyCartOwner(app),
    async (req: Request, res: Response) => {
      const { cartId, productId, quantity } = req.body
      try {
        const result = await app.service('carts').updateProductQuantity(cartId, productId, quantity)
        res.json(result)
      } catch (error: any) {
        res.status(500).json({ error: error.message })
      }
    }
  )

  app.post(
    '/cart/clear-cart',
    authenticate('jwt'),
    // verifyCartOwner(app),
    async (req: Request, res: Response) => {
      const { cartId } = req.body
      try {
        const result = await app.service('carts').clearCart(cartId)
        res.json(result)
      } catch (error: any) {
        res.status(500).json({ error: error.message })
      }
    }
  )
}
