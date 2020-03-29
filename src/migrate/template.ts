/* eslint-disable */
import { useDatabase } from '~/connectors/mongo'

export async function up() {
  useDatabase(async db => {})
}

export async function down() {
  throw Error('not implemented')
}
