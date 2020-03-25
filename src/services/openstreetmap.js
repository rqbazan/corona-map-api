import axios from 'axios'

export class OpenStreetMapService {
  static URL = 'https://nominatim.openstreetmap.org/search.php'

  /**
   * @param {string} term
   * @return {Promise<OpenStreetMapOutput[]>}
   */
  async search(term) {
    const response = await axios.get(OpenStreetMapService.URL, {
      params: { q: term, polygon_geojson: 1, format: 'json' }
    })

    return response.data
  }
}
