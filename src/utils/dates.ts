import moment from 'moment-timezone'
import { config } from '~/config'

export function endOfDay(date: Date) {
  return moment
    .tz(date, config.TZ)
    .endOf('day')
    .toDate()
}

export function parseDate(date: string, pattern = config.DAY_PATTERN) {
  return moment.tz(date, pattern, config.TZ).toDate()
}

export function startOfDay(date: Date) {
  return moment
    .tz(date, config.TZ)
    .startOf('day')
    .toDate()
}
