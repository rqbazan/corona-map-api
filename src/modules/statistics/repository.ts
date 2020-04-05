import { useDatabase } from '~/connectors/mongo'
import { BaseRepository } from '~/modules/base-repository'
import { startOfDay, endOfDay } from '~/utilities/dates'

export class StatisticRepository extends BaseRepository<Entitiy.Statistic> {
  static COLLECTION_NAME = 'statistics'

  collectionName = StatisticRepository.COLLECTION_NAME

  getAllByCreatedAt(createdAt?: Date) {
    return useDatabase<Entitiy.Statistic[]>(async db => {
      const collection = db.collection(this.collectionName)

      if (createdAt) {
        const findQuery = {
          createdAt: {
            $gte: startOfDay(createdAt),
            $lt: endOfDay(createdAt)
          }
        }

        return collection.find(findQuery).toArray()
      }

      const aggregateQuery = [
        {
          $group: {
            _id: '$createdAt',
            doc: { $push: '$$ROOT' }
          }
        },
        {
          $sort: {
            _id: -1
          }
        },
        {
          $limit: 1
        }
      ]

      const result = await collection.aggregate(aggregateQuery).toArray()

      return result?.[0]?.doc ?? []
    })
  }
}
