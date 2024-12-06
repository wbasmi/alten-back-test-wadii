import { HookContext } from '@feathersjs/feathers'

const createWishlistForNewlyUserHook = async (context: HookContext) => {
  const { app, result } = context
  const { _id } = result

  await app.service('wishlists').create({ user: _id })

  return context
}

export default createWishlistForNewlyUserHook
