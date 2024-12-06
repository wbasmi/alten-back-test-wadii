import { Application } from '../declarations'
import { Mongoose } from 'mongoose'
import { Cart } from '../types/models/cart'

const modelName = 'carts'

export const createCart = (app: Application) => {
  const mongooseClient: Mongoose = app.get('mongooseClient')

  const schema = new mongooseClient.Schema<Cart>(
    {
      user: {
        type: mongooseClient.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      items: [
        new mongooseClient.Schema({
          product: {
            type: mongooseClient.Schema.Types.ObjectId,
            ref: 'products',
            required: true
          },
          quantity: { type: Number, required: true }
        }, { _id: false })
      ],
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
