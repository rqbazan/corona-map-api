import { Response, Request } from 'restify'
import { StatisticRepository } from '~/repositories/statistic'
import { parseDate } from '~/utils/parse-date'

export class StatisticController {
  statisticRepository: StatisticRepository

  constructor(repository = new StatisticRepository()) {
    this.statisticRepository = repository
  }

  async getAll(req: Request, res: Response) {
    try {
      const rawValue = req.query.createdAt
      const createdAt = rawValue && parseDate(rawValue)

      const statistics = await this.statisticRepository.getAllByCreatedAt(
        createdAt
      )
      res.json(statistics)
    } catch (error) {
      res.json({ error: error.message })
    }
  }
}
