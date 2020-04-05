import moment from 'moment-timezone'
import { config } from '~/config'

export function endOfDay(date: Date) {
  return moment
    .tz(date, config.TZ)
    .endOf('day')
    .toDate()
}
