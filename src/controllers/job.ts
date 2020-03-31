import { Response, Request } from 'restify'
import { PopupateGeoInfo } from '~/jobs/populate-geo-info'

export class JobController {
  async populateGeoInfo(req: Request, res: Response) {
    try {
      const job = new PopupateGeoInfo()
      const updated = await job.populateGeoInfo()
      res.json({ updated })
    } catch (error) {
      res.json({ error: error.message })
    }
  }
}
