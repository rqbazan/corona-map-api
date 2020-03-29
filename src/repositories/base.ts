import { ObjectID, FindOneOptions, FilterQuery } from 'mongodb'
import { sanitizeObject } from '~/utils/sanitize-object'
import { getMongoClient } from '~/connectors/mongo'

export class BaseRepository<Entitiy extends Entitiy.Base> {
  collectionName: string

  async getAll(query: FilterQuery<Entitiy> = {}, options?: FindOneOptions) {
    const client = getMongoClient()

    try {
      await client.connect()

      const db = client.db(process.env.DATABASE_NAME)

      const result = await db
        .collection<Entitiy>(this.collectionName)
        .find(query, options)
        .toArray()

      return result
    } finally {
      await client.close()
    }
  }

  async bulkUpdate(items: Entitiy[]) {
    const client = getMongoClient()

    try {
      await client.connect()

      const db = client.db(process.env.DATABASE_NAME)

      const operations = items.map(item => ({
        updateOne: {
          filter: { _id: new ObjectID(item._id) },
          update: { $set: sanitizeObject(item) }
        }
      }))

      const numOfOperations = operations?.length ?? 0

      if (numOfOperations > 0) {
        await db.collection(this.collectionName).bulkWrite(operations)
      }

      return numOfOperations
    } finally {
      await client.close()
    }
  }

  async updateById(item: Entitiy) {
    const client = getMongoClient()

    try {
      await client.connect()

      const db = client.db(process.env.DATABASE_NAME)

      const { modifiedCount } = await db
        .collection(this.collectionName)
        .updateOne(
          { _id: new ObjectID(item._id) },
          { $set: sanitizeObject(item) }
        )

      return modifiedCount
    } finally {
      await client.close()
    }
  }
}
