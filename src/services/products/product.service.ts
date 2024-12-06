import type { Application } from '../../declarations'
import { createProduct } from '../../models/product.schema'
import { MongooseServiceOptions, Service } from 'feathers-mongoose'
import { Product } from '../../types/models/product'
import { Params } from '@feathersjs/feathers'
import hooks from './product.hooks'

declare module '../../declarations' {
  interface ServiceTypes {
    products: ProductService
  }
}

export class ProductService extends Service {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options)
  }

  async get(id: string, params?: Params): Promise<Product> {
    const product = await this.Model.findOne({ id }).exec()
    if (!product) {
      throw new Error('Product not found')
    }

    return product.toObject<Product>()
  }

  async patch(id: string, data: Partial<Product>, params?: Params): Promise<Product> {
    const product = await this.Model.findOneAndUpdate({ id }, data, { new: true }).exec()
    if (!product) {
      throw new Error('Product not found')
    }

    return product.toObject<Product>()
  }

  async remove(id: string, params?: Params): Promise<Product> {
    const product = await this.Model.findOneAndDelete({ id }).exec()
    if (!product) {
      throw new Error('Product not found')
    }

    return product.toObject<Product>()
  }

  async update(id: string, data: Product, params?: Params): Promise<Product> {
    const product = await this.Model.findOneAndReplace({ id }, data, { new: true }).exec()
    if (!product) {
      throw new Error('Product not found')
    }

    return product.toObject<Product>()
  }
}

export const productService = (app: Application) => {
  const options = {
    paginate: app.get('paginate'),
    Model: createProduct(app)
  }

  app.use('products', new ProductService(options, app))
  app.service('products').hooks(hooks)
}
