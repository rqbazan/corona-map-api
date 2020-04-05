import { Response, Request } from 'restify'
import Joi from '@hapi/joi'
import { StatisticRepository } from './repository'
import { StatisticBusiness } from './business'
import { parseDateString } from '~/utilities/dates'
import {
  createStatisticBodySchema,
  getAllStatisticsQuerySchema
} from './validators'

export class StatisticController {
  statisticRepository: StatisticRepository

  statisticBusiness: StatisticBusiness

  constructor(repository = new StatisticRepository()) {
    this.statisticRepository = repository
    this.statisticBusiness = new StatisticBusiness(repository)
  }

  async getAll(req: Request, res: Response) {
    try {
      Joi.assert(req.query, getAllStatisticsQuerySchema)

      const rawCreatedAt = req.query.createdAt
      const createdAt = rawCreatedAt && parseDateString(rawCreatedAt)

      const statistics = await this.statisticRepository.getAllByCreatedAt(
        createdAt
      )
      res.json(statistics)
    } catch (error) {
      res.json({ error: error.details || error.message })
    }
  }

  async create(req: Request, res: Response) {
    try {
      Joi.assert(req.body, createStatisticBodySchema)

      let result

      if (Array.isArray(req.body)) {
        result = await this.statisticBusiness.insertMany(req.body)
      } else {
        result = await this.statisticBusiness.insertOne(req.body)
      }

      res.json(result)
    } catch (error) {
      res.json({ error: error.details || error.message })
    }
  }
}
