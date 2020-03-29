import { Response, Request } from 'restify'
import { populateGeoInfo } from '~/jobs/populate-geo-info'

export class JobController {
  async populateGeoInfo(req: Request, res: Response) {
    try {
      const updated = await populateGeoInfo()
      res.json({ updated })
    } catch (error) {
      res.json({ error: error.message })
    }
  }
}
