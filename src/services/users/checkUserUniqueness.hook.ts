import { HookContext } from '../../declarations'
import { User } from '../../types/models/user'
import { Paginated } from '@feathersjs/feathers'
import { BadRequest } from '@feathersjs/errors'

const checkUserUniquenessHook = async (context: HookContext) => {
  const { data, app } = context
  const { username, email } = data

  const users: User[] | Paginated<User> = await app.service('users').find({
    query: {
      $or: [{ username }, { email }]
    }
  })

  if ((users as User[]).length > 0) {
    throw new BadRequest('Username or email already exists')
  }

  return context
}

export default checkUserUniquenessHook