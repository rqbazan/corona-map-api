import { template as _template } from 'lodash'
import { OpenStreetMapService } from '~/services/open-street-map'
import { PlaceRepository } from './repository'

const interpolate = /{{([\s\S]+?)}}/g

const template = (input: string) => _template(input, { interpolate })

export class PlaceBusiness {
  placeRepository: PlaceRepository

  openStreetService: OpenStreetMapService

  constructor(
    repository = new PlaceRepository(),
    service = new OpenStreetMapService()
  ) {
    this.placeRepository = repository
    this.openStreetService = service
  }

  private async mapPlaceToGeoJsonSearchablePlace(
    place: Entitiy.Place
  ): Promise<Entitiy.Place> {
    const getSearchTerm = template(place.searchTemplate)

    const term = getSearchTerm(place)

    const data = await this.openStreetService.search(term)
    const first = data?.[0] ?? ({} as OpenStreetMap.Item)

    return {
      ...place,
      center: [first.lat, first.lon].map(Number),
      geojson: first.geojson as Entitiy.Place['geojson']
    }
  }

  async populateGeoInfo() {
    const searchables = await this.getAllWithoutGeoJson()

    const promises = searchables.map(item =>
      this.mapPlaceToGeoJsonSearchablePlace(item)
    )

    const places = await Promise.all(promises)

    return this.placeRepository.bulkUpdate(places)
  }

  async getAllWithoutGeoJson() {
    const query = {
      $or: [{ geojson: { $exists: false } }, { geojson: null }]
    }

    return this.placeRepository.findAll(query)
  }
}
