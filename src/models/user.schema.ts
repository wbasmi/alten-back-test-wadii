import { Application } from '../declarations'
import { Mongoose } from 'mongoose'
import { User } from '../types/models/user'

const modelName = 'users'

export const createUser = (app: Application) => {
  const mongooseClient: Mongoose = app.get('mongooseClient')

  const schema = new mongooseClient.Schema<User>(
    {
      username: { type: String, required: true },
      firstname: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true }
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
