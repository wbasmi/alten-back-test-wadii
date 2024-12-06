// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'
import { productService } from './products/product.service'
import mongooseService from './common/mongoose.service'
import { ServiceSwaggerOptions } from 'feathers-swagger'
import jwtAuthentication from './core/jwt-auth.service'
import { usersService } from './users/users.service'
import { wishlistsService } from './wishlists/wishlists.service'
import { cartsService } from './carts/carts.service'

declare module '@feathersjs/feathers' {
  interface ServiceOptions {
    docs?: ServiceSwaggerOptions
  }
}

export const services = (app: Application) => {
  // All services will be registered here

  app.configure(jwtAuthentication)
  app.configure(mongooseService)

  app.configure(productService)
  app.configure(usersService)
  app.configure(wishlistsService)
  app.configure(cartsService)
}
