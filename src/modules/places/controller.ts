import { Response, Request } from 'restify'
import { PlaceRepository } from './repository'
import { PlaceBusiness } from './business'

export class PlaceController {
  placeRepository: PlaceRepository

  placeBusiness: PlaceBusiness

  constructor(repository = new PlaceRepository()) {
    this.placeRepository = repository
    this.placeBusiness = new PlaceBusiness(repository)
  }

  async getAll(req: Request, res: Response) {
    try {
      const places = await this.placeRepository.findAll()
      res.json(places)
    } catch (error) {
      res.json({ error: error.message })
    }
  }

  async populateGeoInfo(req: Request, res: Response) {
    try {
      const updated = await this.placeBusiness.populateGeoInfo()
      res.json({ updated })
    } catch (error) {
      res.json({ error: error.message })
    }
  }
}