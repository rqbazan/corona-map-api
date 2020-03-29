import { Response, Request } from 'restify'
import { PlaceRepository } from '~/repositories/place'

export class PlaceController {
  placeRepository: PlaceRepository

  constructor(repository = new PlaceRepository()) {
    this.placeRepository = repository
  }

  async getAll(req: Request, res: Response) {
    try {
      const places = await this.placeRepository.getAll()
      res.json(places)
    } catch (error) {
      res.json({ error: error.message })
    }
  }

  async updateById(req: Request, res: Response) {
    try {
      const affected = await this.placeRepository.updateById({
        ...req.body,
        _id: req.params.id
      })

      res.json({ affected })
    } catch (error) {
      res.json({ error: error.message })
    }
  }
}
