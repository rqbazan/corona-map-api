import { startOfDay, endOfDay } from 'date-fns'
import { BaseRepository } from './base'
import { useDatabase } from '~/connectors/mongo'

export class StatisticRepository extends BaseRepository<Entitiy.Statistic> {
  collectionName = 'statistics'

  getAllByCreatedAt(createdAt?: Date) {
    return useDatabase<Entitiy.Statistic[]>(async db => {
      const collection = db.collection(this.collectionName)

      if (createdAt) {
        return collection
          .find({
            createdAt: {
              $gte: startOfDay(createdAt),
              $lt: endOfDay(createdAt)
            }
          })
          .toArray()
      }

      const result = await collection
        .aggregate([
          {
            $group: {
              _id: '$createdAt',
              doc: { $push: '$$ROOT' }
            }
          },
          {
            $sort: {
              createdAt: -1
            }
          },
          {
            $limit: 1
          }
        ])
        .toArray()

      return result?.[0]?.doc ?? []
    })
  }
}
