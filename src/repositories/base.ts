import { ObjectID, FindOneOptions, FilterQuery } from 'mongodb'
import { sanitizeObject } from '~/utils/sanitize-object'
import { useDatabase } from '~/connectors/mongo'

export class BaseRepository<Entitiy extends Entitiy.Base> {
  collectionName: string

  async getAll(query: FilterQuery<Entitiy> = {}, options?: FindOneOptions) {
    return useDatabase(db =>
      db
        .collection<Entitiy>(this.collectionName)
        .find(query, options)
        .toArray()
    )
  }

  async bulkUpdate(items: Entitiy[]) {
    const operations = items.map(item => ({
      updateOne: {
        filter: { _id: new ObjectID(item._id) },
        update: { $set: sanitizeObject(item) }
      }
    }))

    return useDatabase(async db => {
      const len = operations?.length ?? 0

      if (len > 0) {
        await db.collection(this.collectionName).bulkWrite(operations)
      }

      return len
    })
  }

  async updateById(item: Entitiy) {
    return useDatabase(async db => {
      const { modifiedCount } = await db
        .collection(this.collectionName)
        .updateOne(
          { _id: new ObjectID(item._id) },
          { $set: sanitizeObject(item) }
        )

      return modifiedCount
    })
  }
}
