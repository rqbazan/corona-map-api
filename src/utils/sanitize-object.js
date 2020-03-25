import omitBy from 'lodash.omitby'
import isNil from 'lodash.isnil'

/**
 * @param {object} object
 * @returns {object}
 */
export function sanitizeObject(object) {
  return omitBy(object, isNil)
}
