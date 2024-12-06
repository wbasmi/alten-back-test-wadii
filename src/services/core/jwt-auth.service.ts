import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { LocalStrategy } from '@feathersjs/authentication-local'
import { Application } from '../../declarations'
import authEndpoints from './auth.endpoints'

declare module '../../declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}

class UserLocalStrategy extends LocalStrategy {
  async findEntity(username: string) {
    const user = await (this.app?.service('users') as any).Model.find({ email: username })

    return user[0]
  }

  async getEntity(data: any) {
    delete data.password
    return data
  }
}

export default (app: Application) => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new UserLocalStrategy())

  app.use('authentication', authentication)
  authEndpoints(app)
}
