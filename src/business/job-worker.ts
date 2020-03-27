import template from 'lodash.template'
import { SearchablePlace, GeoJsonSearchablePlace } from '~/models/types'
import { PlaceModel } from '~/models/place'
import { OpenStreetMapService } from '~/services/openstreetmap'

const interpolate = /{{([\s\S]+?)}}/g

function templateString(input: string) {
  return template(input, { interpolate })
}

export class JobWorkerBusiness {
  placeModel: PlaceModel

  openStreetMapService: OpenStreetMapService

  constructor(model = new PlaceModel(), service = new OpenStreetMapService()) {
    this.placeModel = model
    this.openStreetMapService = service
  }

  async setGeoJsonToAllSearchablePlaces(force = false) {
    try {
      const searchables = await this.placeModel.getSearchablePlaces(force)

      const promises = searchables.map(this.mapPlaceToGeoJsonSearchablePlace)

      const places = await Promise.all(promises)

      return this.placeModel.bulkUpdate(places)
    } catch (error) {
      console.error('setGeoJsonToAllPlaces', error)
      throw error
    }
  }

  async mapPlaceToGeoJsonSearchablePlace(
    place: SearchablePlace
  ): Promise<GeoJsonSearchablePlace> {
    const getSearchTerm = templateString(place.searchTemplate)

    const term = getSearchTerm(place)

    const data = await this.openStreetMapService.search(term)

    return {
      ...place,
      location: {
        lat: Number(data?.[0]?.lat),
        lng: Number(data?.[0]?.lon)
      },
      geojson: data?.[0]?.geojson
    }
  }
}
