import { MongoClient, Db } from 'mongodb'
import { config } from '~/config'

export function getMongoClient() {
  return new MongoClient(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

export async function useDatabase<T>(
  callback: (db: Db) => Promise<T>,
  client = getMongoClient()
) {
  try {
    await client.connect()

    return await callback(client.db(config.DATABASE_NAME))
  } finally {
    await client.close()
  }
}
