import { Response, Request } from 'restify'
import { PlaceModel } from '~/models/place'

export class PlaceController {
  placeModel: PlaceModel

  constructor(model = new PlaceModel()) {
    this.placeModel = model
  }

  async getAllPlaces(req: Request, res: Response) {
    try {
      const places = await this.placeModel.getAllPlaces()
      res.json(places)
    } catch (error) {
      res.json({ error: error.message })
    }
  }

  async getSearchablePlaces(req: Request, res: Response) {
    try {
      const force = Boolean(req.query.force)
      const places = await this.placeModel.getSearchablePlaces(force)
      res.json(places)
    } catch (error) {
      res.json({ error: error.message })
    }
  }

  async partialUpdate(req: Request, res: Response) {
    try {
      const affected = await this.placeModel.updateById({
        ...req.body,
        _id: req.params.id
      })

      res.json({ affected })
    } catch (error) {
      res.json({ error: error.message })
    }
  }
}
