import omitBy from 'lodash.omitby';
import isNil from 'lodash.isnil';
export function sanitizeObject(object) {
    return omitBy(object, isNil);
}
