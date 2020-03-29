import { useDatabase } from '~/connectors/mongo'
import places from '../seeders/places.json'

const collectionName = 'places'

export async function up() {
  useDatabase(async db => {
    await db.collection(collectionName).insertMany(places)
  })
}

export async function down() {
  useDatabase(async db => {
    await db.collection(collectionName).deleteMany({})
  })
}
