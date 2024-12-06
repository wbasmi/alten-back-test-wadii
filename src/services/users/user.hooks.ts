import checkUserUniquenessHook from './checkUserUniqueness.hook'
import sanitizeUserHook from './sanitizeUser.hook'
import createWishlistForNewlyUserHook from './createWishlistForNewlyUser.hook'
import removeWishlistForDeletedUserHook from './removeWishlistForDeletedUser.hook'

export default {
  after: {
    all: [sanitizeUserHook],
    create: [createWishlistForNewlyUserHook],
    remove: [removeWishlistForDeletedUserHook]
  },
  before: {
    create: [checkUserUniquenessHook]
  }
}
