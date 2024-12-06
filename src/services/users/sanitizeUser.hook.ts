import { HookContext } from '../../declarations'

const sanitizeUserHook = async (context: HookContext) => {
  const { result } = context

  if (Array.isArray(result)) {
    result.forEach((item) => delete item['password'])
  } else {
    delete result['password']
  }

  return context
}

export default sanitizeUserHook
