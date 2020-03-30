import { toDate } from 'date-fns-tz'

export function parseDate(isoDate: string) {
  return toDate(isoDate, { timeZone: 'America/Lima' })
}
