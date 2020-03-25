// @ts-check
import { JobWorkerBusiness } from '~/business/job-worker'

export class JobWorkerController {
  constructor(business = new JobWorkerBusiness()) {
    this.business = business
  }

  /**
   * @param {import('restify').Request} req
   * @param {import('restify').Response} res
   */
  async setGeoJsonToAllSearchablePlaces(req, res) {
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
