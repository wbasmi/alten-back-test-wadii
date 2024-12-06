import type { Application } from '../../declarations'
import { MongooseServiceOptions, Service } from 'feathers-mongoose'

import hooks from './wishlist.hooks'
import { createWishlist } from '../../models/wishlist.schema'
import customWishlistEndpoints from './wishlist.endpoints'

declare module '../../declarations' {
  interface ServiceTypes {
    wishlists: WishlistService
  }
}

export class WishlistService extends Service {
  constructor(options: Partial<MongooseServiceOptions>) {
    super(options)
  }

  async addProduct(id: string, productId: string) {
    const wishlist = await this.get(id)
    wishlist.products = (wishlist.products || []).concat({ product: productId })
    return this.update(id, wishlist)
  }

  async removeProduct(id: string, productId: string) {
    const wishlist = await this.get(id)
    wishlist.products = wishlist.products.filter((p: any) => p.product.toString() !== productId)
    return this.update(id, wishlist)
  }
}

export const wishlistsService = (app: Application) => {
  const options = {
    Model: createWishlist(app)
  }

  app.use('wishlists', new WishlistService(options))
  app.service('wishlists').hooks(hooks)

  customWishlistEndpoints(app)
}
