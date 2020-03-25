// @ts-check
import { MainBusiness } from '~/business/main'

export class MainController {
  constructor(business = new MainBusiness()) {
    this.business = business
  }

  /**
   *
   * @param {import('restify').Request} req
   * @param {import('restify').Response} res
   */
  async handle(req, res) {
    try {
      const ok = await this.business.execute()
      res.json({ ok })
    } catch (error) {
      res.json({ error: error.message })
    }
  }
}
