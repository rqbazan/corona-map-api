import { Response, Request } from 'restify'
import { JobWorkerBusiness } from '~/business/job-worker'

export class JobWorkerController {
  business: JobWorkerBusiness

  constructor(business = new JobWorkerBusiness()) {
    this.business = business
  }

  async setGeoJsonToAllSearchablePlaces(req: Request, res: Response) {
    try {
      const force = Boolean(req.query.force)
      const operations = await this.business.setGeoJsonToAllSearchablePlaces(
        force
      )
      res.json({ operations })
    } catch (error) {
      res.json({ error: error.message })
    }
  }
}
