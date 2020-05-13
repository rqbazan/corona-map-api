import moment from 'moment-timezone'
import fp from 'lodash/fp'
import { parseDateString } from '~/utilities/dates'
import { config } from '~/config'
import { PlaceRepository } from '~/modules/places/repository'
import { ApplicationError } from '~/modules/errors'
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

  async assertIfPlacesDoesNotExists(statistics: Entitiy.Statistic[]) {
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

      if (diff.length > 1) {
        throw new ApplicationError(`${diff} are not valid place slugs`)
      } else {
        throw new ApplicationError(`${diff} is not a valid place slug`)
      }
    }
  }

  async assertIfOnePlaceDoesNotExists(statistic: Entitiy.Statistic) {
    const place = await this.placeRepository.findOne({
      slug: statistic.placeSlug
    })

    if (!place) {
      throw new ApplicationError(
        `${statistic.placeSlug} is not a valid place slug`
      )
    }
  }

  async insertOne(statistic: Entitiy.Statistic) {
    await this.assertIfOnePlaceDoesNotExists(statistic)

    const newOne = this.appendReportedAt(statistic)

    return this.statisticRepository.insertOne(newOne)
  }

  async insertMany(statistics: Entitiy.Statistic[]) {
    await this.assertIfPlacesDoesNotExists(statistics)

    const newOnes = statistics.map(this.appendReportedAt)

    return this.statisticRepository.insertMany(newOnes)
  }

  async updateMany(statistics: Entitiy.Statistic[]) {
    await this.assertIfPlacesDoesNotExists(statistics)

    return this.statisticRepository.bulkUpdate(statistics)
  }

  async updateOne(statistic: Entitiy.Statistic) {
    await this.assertIfOnePlaceDoesNotExists(statistic)

    return this.statisticRepository.updateById(statistic)
  }
}
