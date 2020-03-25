import { PlaceModel } from '~/models/place'

export class PlaceController {
  constructor(model = new PlaceModel()) {
    this.placeModel = model
  }

  /**
   * @param {import('restify').Request} req
   * @param {import('restify').Response} res
   */
  async getAllPlaces(req, res) {
    try {
      const places = await this.placeModel.getAllPlaces()
      res.json(places)
    } catch (error) {
      res.json({ error: error.message })
    }
  }

  /**
   * @param {import('restify').Request} req
   * @param {import('restify').Response} res
   */
  async getSearchablePlaces(req, res) {
    try {
      const force = Boolean(req.query.force)
      const places = await this.placeModel.getSearchablePlaces(force)
      res.json(places)
    } catch (error) {
      res.json({ error: error.message })
    }
  }

  /**
   * @param {import('restify').Request} req
   * @param {import('restify').Response} res
   */
  async partialUpdate(req, res) {
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
