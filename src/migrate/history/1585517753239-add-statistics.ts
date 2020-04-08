import { useDatabase } from '~/connectors/mongo'
import { parseDateString } from '~/utilities/dates'
import statistics from '../seeders/statistcs.json'

const collectionName = 'statistics'

export async function up() {
  const data = statistics.map(item => ({
    ...item,
    reportedAt: parseDateString(item.reportedAt)
  }))

  useDatabase(async db => {
    await db.collection(collectionName).insertMany(data)
  })
}

export async function down() {
  useDatabase(async db => {
    await db.collection(collectionName).deleteMany({})
  })
}
