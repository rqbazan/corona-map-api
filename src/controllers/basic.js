// @ts-check
import BasicModel from '~/models/basic'

export default class BasicController {
  constructor(model = new BasicModel()) {
    this.model = model
  }

  /**
   *
   * @param {import('restify').Request} req
   * @param {import('restify').Response} res
   */
  async getText(req, res) {
    try {
      const text = await this.model.getText()
      res.json(text)
    } catch (error) {
      res.json({ error: error.message })
    }
  }
}
