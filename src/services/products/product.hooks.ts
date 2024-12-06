import { authenticate } from '@feathersjs/authentication'
import { verifyAdmin } from '../../lib/auth/verifyAdmin'

export default {
  before: {
    get: [authenticate('jwt'), verifyAdmin],
    find: [authenticate('jwt')],
    create: [authenticate('jwt'), verifyAdmin],
    update: [authenticate('jwt'), verifyAdmin],
    patch: [authenticate('jwt'), verifyAdmin],
    remove: [authenticate('jwt'), verifyAdmin],
  }
}
