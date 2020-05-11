import { ObjectID, FindOneOptions, FilterQuery, ObjectId } from 'mongodb'
import { sanitizeObject } from '~/utilities/sanitize-object'
import { useDatabase } from '~/connectors/mongo'

export class BaseRepository<Entitiy extends Entitiy.Base> {
  collectionName: string

  async findOne(query: FilterQuery<Entitiy> = {}, options?: FindOneOptions) {
    return useDatabase(db =>
      db.collection<Entitiy>(this.collectionName).findOne(query, options)
    )
  }

  async findAll(query: FilterQuery<Entitiy> = {}, options?: FindOneOptions) {
    return useDatabase(db =>
      db
        .collection<Entitiy>(this.collectionName)
        .find(query, options)
        .toArray()
    )
  }

  async bulkUpdate(items: Entitiy[]) {
    const operations = items.map(({ _id, ...item }) => ({
      updateOne: {
        filter: { _id: new ObjectID(_id) },
        update: { $set: sanitizeObject(item) }
      }
    }))

    return useDatabase(async db => {
      const { modifiedCount } = await db
        .collection(this.collectionName)
        .bulkWrite(operations)

      const result = await db
        .collection(this.collectionName)
        .find({ _id: { $in: items.map(item => new ObjectID(item._id)) } })
        .toArray()

      return {
        updated: modifiedCount,
        data: result as Entitiy[]
      }
    })
  }

  async updateById({ _id, ...item }: Entitiy) {
    return useDatabase(async db => {
      const query = { _id: new ObjectID(_id) }

      const { modifiedCount } = await db
        .collection(this.collectionName)
        .updateOne(query, { $set: sanitizeObject(item) })

      const result = await db.collection(this.collectionName).findOne(query)

      return {
        updated: modifiedCount,
        data: result as Entitiy
      }
    })
  }

  async insertMany(entities: Entitiy[]) {
    return useDatabase(async db => {
      const { insertedIds, insertedCount } = await db
        .collection(this.collectionName)
        .insertMany(entities)

      const result = await db
        .collection(this.collectionName)
        .find({ _id: { $in: Object.values(insertedIds) } })
        .toArray()

      return {
        inserted: insertedCount,
        data: result as Entitiy[]
      }
    })
  }

  async insertOne(data: Entitiy) {
    return useDatabase(async db => {
      const { insertedId, insertedCount } = await db
        .collection(this.collectionName)
        .insertOne(data)

      const result = await db
        .collection(this.collectionName)
        .find(insertedId)
        .toArray()

      return {
        inserted: insertedCount,
        data: result?.[0] as Entitiy
      }
    })
  }

  async deleteManyByIds(ids: string[]) {
    return useDatabase(async db =>
      db.collection(this.collectionName).deleteMany({
        _id: { $in: ids.map(id => new ObjectId(id)) }
      })
    )
  }
}
