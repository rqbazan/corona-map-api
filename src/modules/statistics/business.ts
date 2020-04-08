import moment from 'moment-timezone'
import fp from 'lodash/fp'
import { parseDateString } from '~/utilities/dates'
import { config } from '~/config'
import { PlaceRepository } from '../places/repository'
import { StatisticRepository } from './repository'

export class StatisticBusiness {
  statisticRepository: StatisticRepository

  placeRepository: PlaceRepository

  constructor(
    statisticRepository = new StatisticRepository(),
    placeRepository = new PlaceRepository()
  ) {
    this.statisticRepository = statisticRepository
    this.placeRepository = placeRepository
  }

  appendReportedAt(statistic: Entitiy.Statistic) {
    if (statistic.reportedAt) {
      return {
        ...statistic,
        reportedAt: parseDateString(statistic.reportedAt.toString())
      }
    }

    return {
      ...statistic,
      reportedAt: moment()
        .tz(config.TZ)
        .toDate()
    }
  }

  async insertOne(statistic: Entitiy.Statistic) {
    const place = await this.placeRepository.findOne({
      slug: statistic.placeSlug
    })

    if (!place) {
      throw Error(`"${statistic.placeSlug}" is not a valid place slug`)
    }

    const newOne = this.appendReportedAt(statistic)

    return this.statisticRepository.insertOne(newOne)
  }

  async insertMany(statistics: Entitiy.Statistic[]) {
    const statisticPlaceSlugs = fp.flow(
      fp.uniqBy<Entitiy.Statistic>('placeSlug'),
      fp.map('placeSlug')
    )(statistics)

    const places = await this.placeRepository.findAll({
      slug: { $in: statisticPlaceSlugs }
    })

    if (statisticPlaceSlugs.length !== places.length) {
      const placeSlugs = fp.flow(
        fp.uniqBy<Entitiy.Place>('slug'),
        fp.map('slug')
      )(places)

      // statisticPlaceSlugs - placeSlugs
      const diff = fp.difference(statisticPlaceSlugs, placeSlugs)

      throw Error(`${diff} are not valid place slugs`)
    }

    const newOnes = statistics.map(this.appendReportedAt)

    return this.statisticRepository.insertMany(newOnes)
  }
}
