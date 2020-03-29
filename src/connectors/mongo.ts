import { MongoClient, Db } from 'mongodb'

export function getMongoClient() {
  return new MongoClient(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

export async function useDatabase(
  callback: (db: Db) => Promise<void>,
  client = getMongoClient()
) {
  try {
    await client.connect()
    await callback(client.db(process.env.DATABASE_NAME))
  } finally {
    await client.close()
  }
}
