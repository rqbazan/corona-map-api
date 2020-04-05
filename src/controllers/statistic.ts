import { Response, Request } from 'restify'
import Joi from '@hapi/joi'
import { StatisticRepository } from '~/repositories/statistic'
import { parseDate } from '~/utils/parse-date'
import { createStatisticBodySchema } from '~/validators/create-statistic'
import { getAllStatisticsQuerySchema } from '~/validators/get-all-statistics'

export class StatisticController {
  statisticRepository: StatisticRepository

  constructor(repository = new StatisticRepository()) {
    this.statisticRepository = repository
  }

  async getAll(req: Request, res: Response) {
    try {
      Joi.assert(req.query, getAllStatisticsQuerySchema)

      const rawCreatedAt = req.query.createdAt
      const createdAt = rawCreatedAt && parseDate(rawCreatedAt)

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
        result = await this.statisticRepository.insertMany(req.body)
      } else {
        result = await this.statisticRepository.insertOne(req.body)
      }

      res.json(result)
    } catch (error) {
      res.json({ error: error.details || error.message })
    }
  }
}
