import { Response, Request } from 'restify'
import { MetaInfoModel } from '~/models/meta-info'

export class MetaInfoController {
  metaInfoModel: MetaInfoModel

  constructor(model = new MetaInfoModel()) {
    this.metaInfoModel = model
  }

  async getGeneralMetaInfo(req: Request, res: Response) {
    try {
      const metaInfo = await this.metaInfoModel.getGeneralMetaInfo()
      res.json(metaInfo)
    } catch (error) {
      res.json({ error: error.message })
    }
  }
}
