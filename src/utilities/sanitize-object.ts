import omitBy from 'lodash.omitby'
import isNil from 'lodash.isnil'

export function sanitizeObject<T extends object>(object: T) {
  return omitBy<T>(object, isNil)
}
