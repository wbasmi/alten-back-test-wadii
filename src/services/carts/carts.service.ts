import type { Application } from '../../declarations'
import hooks from './cart.hooks'
import { createCart } from '../../models/cart.schema'
import customCartEndpoints from './carts.endpoints'
import { MongooseServiceOptions, Service } from 'feathers-mongoose'

declare module '../../declarations' {
  interface ServiceTypes {
    carts: CartsService
  }
}

export class CartsService extends Service {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options)
  }

  async addProduct(id: string, productId: string) {
    const cart = await this.get(id)
    cart.items.push({ product: productId, quantity: 1 })
    return this.update(id, cart)
  }

  async removeProduct(id: string, productId: string) {
    const cart = await this.get(id)
    cart.items = cart.items.filter((p: any) => p.product.toString() !== productId)
    return this.update(id, cart)
  }

  async updateProductQuantity(id: string, productId: string, quantity: number) {
    const cart = await this.get(id)

    console.log(cart.items)
    const product = cart.items.find((p: any) => p.product.toString() === productId)
    if (product) {
      product.quantity = quantity
    }
    return this.update(id, cart)
  }

  async clearCart(id: string) {
    const cart = await this.get(id)
    cart.items = []
    return this.update(id, cart)
  }
}

export const cartsService = (app: Application) => {
  const options = {
    Model: createCart(app)
  }

  app.use('carts', new CartsService(options, app))
  app.service('carts').hooks(hooks)

  customCartEndpoints(app)
}
