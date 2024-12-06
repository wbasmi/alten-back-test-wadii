import { Application } from '../declarations'
import { Mongoose } from 'mongoose'
import { Wishlist } from '../types/models/wishlist'

const modelName = 'wishlists'

export const createWishlist = (app: Application) => {
  const mongooseClient: Mongoose = app.get('mongooseClient')

  const schema = new mongooseClient.Schema<Wishlist>(
    {
      user: {
        type: mongooseClient.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      products: [
        new mongooseClient.Schema({
          product: {
            type: mongooseClient.Schema.Types.ObjectId,
            ref: 'products',
            required: true
          }
        }, { _id: false })
      ]
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
