import { Response, Request } from 'restify'
import Joi from '@hapi/joi'
import { parseDateString } from '~/utilities/dates'
import { sendControllerError } from '~/modules/errors'
import { StatisticRepository } from './repository'
import { StatisticBusiness } from './business'
import {
  createStatisticBodySchema,
  updateStatisticBodySchema,
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

      const rawReportedAt = req.query.reportedAt
      const reportedAt = rawReportedAt && parseDateString(rawReportedAt)

      const statistics = await this.statisticRepository.getAllByReportedAt(
        reportedAt
      )
      res.json(statistics)
    } catch (error) {
      sendControllerError(res, error)
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
      sendControllerError(res, error)
    }
  }

  async update(req: Request, res: Response) {
    try {
      Joi.assert(req.body, updateStatisticBodySchema)

      let result

      if (Array.isArray(req.body)) {
        result = await this.statisticBusiness.updateMany(req.body)
      } else {
        result = await this.statisticBusiness.updateOne(req.body)
      }

      res.json(result)
    } catch (error) {
      sendControllerError(res, error)
    }
  }
}
