import moment from 'moment-timezone'
import { config } from '~/config'
import { StatisticRepository } from './repository'

export class StatisticBusiness {
  statisticRepository: StatisticRepository

  constructor(repository = new StatisticRepository()) {
    this.statisticRepository = repository
  }

  appendCreatedAt(statistic: Entitiy.Statistic) {
    return {
      ...statistic,
      createdAt: moment()
        .tz(config.TZ)
        .toDate()
    }
  }

  async insertOne(statistic: Entitiy.Statistic) {
    const newOne = this.appendCreatedAt(statistic)

    return this.statisticRepository.insertOne(newOne)
  }

  async insertMany(statistics: Entitiy.Statistic[]) {
    const newOnes = statistics.map(this.appendCreatedAt)

    return this.statisticRepository.insertMany(newOnes)
  }
}
