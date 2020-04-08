import { omitBy, isNil } from 'lodash'

export function sanitizeObject<T extends object>(object: T) {
  return omitBy<T>(object, isNil)
}
