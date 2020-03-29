import _template from 'lodash.template'
import { PlaceRepository } from '~/repositories/place'
import { OpenStreetMapService } from '~/services/open-street-map'

const interpolate = /{{([\s\S]+?)}}/g

const template = (input: string) => _template(input, { interpolate })

const placeRepository = new PlaceRepository()

const openStreetService = new OpenStreetMapService()

async function mapPlaceToGeoJsonSearchablePlace(
  place: Entitiy.Place
): Promise<Entitiy.Place> {
  const getSearchTerm = template(place.searchTemplate)

  const term = getSearchTerm(place)

  const data = await openStreetService.search(term)
  const first = data?.[0] ?? ({} as OpenStreetMap.Item)

  return {
    ...place,
    center: [first.lat, first.lon].map(Number),
    geojson: first.geojson as Entitiy.Place['geojson']
  }
}

export async function populateGeoInfo() {
  const searchables = await placeRepository.getAllWithoutGeoJson()

  const promises = searchables.map(mapPlaceToGeoJsonSearchablePlace)

  const places = await Promise.all(promises)

  return placeRepository.bulkUpdate(places)
}
