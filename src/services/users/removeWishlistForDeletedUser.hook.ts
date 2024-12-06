import { HookContext } from '@feathersjs/feathers'

const removeWishlistForDeletedUserHook = async (context: HookContext) => {
  const { app, _id } = context

  await app.service('wishlists').remove(null, { query: { user: _id } })

  return context
}

export default removeWishlistForDeletedUserHook
