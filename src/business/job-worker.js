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
   * @returns {Promise<number>}
   */
  async setGeoJsonToAllSearchablePlaces() {
    try {
      const places = await this.getGeoJsonSearchablePlaces()
      return this.placeModel.bulkUpdate(places)
    } catch (error) {
      console.error('setGeoJsonToAllPlaces', error)
      throw error
    }
  }

  /**
   * @returns {Promise<GeoJsonSearchablePlace[]>}
   */
  async getGeoJsonSearchablePlaces() {
    try {
      const places = await this.placeModel.getSearchablePlaces()

      const promises = places.map(
        this.mapPlaceToGeoJsonSearchablePlace.bind(this)
      )

      return Promise.all(promises)
    } catch (error) {
      console.error('getGeoJsonSearchablePlaces', error)
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

    return { ...place, geojson: data?.[0]?.geojson }
  }
}
