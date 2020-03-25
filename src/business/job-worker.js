import template from 'lodash.template'
import { PlaceModel } from '~/models/place'
import { OpenStreetMapService } from '~/services/openstreetmap'

const interpolate = /{{([\s\S]+?)}}/g

/**
 * @param {string} input
 * @returns {(x: any) => string}
 */
function templateString(input) {
  return template(input, { interpolate })
}

export class JobWorkerBusiness {
  constructor(model = new PlaceModel(), service = new OpenStreetMapService()) {
    this.placeModel = model
    this.openStreetMapService = service
  }

  /**
   * @param {boolean} [force]
   * @returns {Promise<number>}
   */
  async setGeoJsonToAllSearchablePlaces(force = false) {
    try {
      const searchables = await this.placeModel.getSearchablePlaces(force)

      const promises = searchables.map(
        this.mapPlaceToGeoJsonSearchablePlace.bind(this)
      )

      const places = await Promise.all(promises)

      return this.placeModel.bulkUpdate(places)
    } catch (error) {
      console.error('setGeoJsonToAllPlaces', error)
      throw error
    }
  }

  /**
   * @param {SearchablePlace} place
   * @return {Promise<GeoJsonSearchablePlace>}
   */
  async mapPlaceToGeoJsonSearchablePlace(place) {
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
