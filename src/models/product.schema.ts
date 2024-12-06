import { Application } from '../declarations'
import { Mongoose } from 'mongoose'
import { Product } from '../types/models/product'

const modelName = 'products'

export const createProduct = (app: Application) => {
  const mongooseClient: Mongoose = app.get('mongooseClient')

  const schema = new mongooseClient.Schema<Product>(
    {
      id: { type: Number, required: true },
      code: { type: String, required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
      category: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      internalReference: { type: String, required: true },
      shellId: { type: Number, required: true },
      inventoryStatus: { type: String, enum: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'], required: true },
      rating: { type: Number, required: true }
    },
    {
      timestamps: true
    }
  )

  if (mongooseClient.modelNames().includes(modelName)) {
    ;(mongooseClient as any).deleteModel(modelName)
  }

  return mongooseClient.model(modelName, schema)
}
