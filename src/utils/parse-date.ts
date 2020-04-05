import moment from 'moment-timezone'
import { config } from '~/config'

export function parseDate(date: string, pattern = config.DAY_PATTERN) {
  return moment.tz(date, pattern, config.TZ).toDate()
}
