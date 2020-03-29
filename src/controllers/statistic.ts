import { Response, Request } from 'restify'
import { StatisticRepository } from '~/repositories/statistic'

export class StatisticController {
  statisticRepository: StatisticRepository

  constructor(repository = new StatisticRepository()) {
    this.statisticRepository = repository
  }

  async getAll(req: Request, res: Response) {
    try {
      const statistics = await this.statisticRepository.getAll()
      res.json(statistics)
    } catch (error) {
      res.json({ error: error.message })
    }
  }
}
