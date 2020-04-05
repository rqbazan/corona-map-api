import moment from 'moment-timezone'
import { config } from '~/config'

export function startOfDay(date: Date) {
  return moment
    .tz(date, config.TZ)
    .startOf('day')
    .toDate()
}
