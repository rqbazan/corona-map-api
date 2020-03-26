import { MetaInfoModel } from '~/models/meta-info'

export class MetaInfoController {
  constructor(model = new MetaInfoModel()) {
    this.metaInfoModel = model
  }

  /**
   * @param {import('restify').Request} req
   * @param {import('restify').Response} res
   */
  async getGeneralMetaInfo(req, res) {
    try {
      const metaInfo = await this.metaInfoModel.getGeneralMetaInfo()
      res.json(metaInfo)
    } catch (error) {
      res.json({ error: error.message })
    }
  }
}
