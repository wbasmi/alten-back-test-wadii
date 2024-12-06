import type { Application } from '../../declarations'
import { createUser } from '../../models/user.schema'
import { MongooseServiceOptions, Service } from 'feathers-mongoose'
import bcrypt from 'bcryptjs'

import hooks from './user.hooks'
import userEndpoints from './user.endpoints'

declare module '../../declarations' {
  interface ServiceTypes {
    users: UsersService
  }
}

export class UsersService extends Service {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options)
  }

  async create(data: any, params?: any) {
    const { password, ...restData } = data

    const hashedPassword = await bcrypt.hash(password, 10)

    return super.create({ ...restData, password: hashedPassword }, params)
  }
}

export const usersService = (app: Application) => {
  const options = {
    Model: createUser(app)
  }

  app.use('users', new UsersService(options, app))
  app.service('users').hooks(hooks)

  userEndpoints(app)
}
