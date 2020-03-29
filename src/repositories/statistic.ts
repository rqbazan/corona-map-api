import { BaseRepository } from './base'

export class StatisticRepository extends BaseRepository<Entitiy.Statistic> {
  collectionName = 'statistics'
}
