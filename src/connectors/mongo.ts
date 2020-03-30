import { MongoClient, Db } from 'mongodb'

export function getMongoClient() {
  return new MongoClient(process.env.MONGO_URL, {
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

    return await callback(client.db(process.env.DATABASE_NAME))
  } finally {
    await client.close()
  }
}
