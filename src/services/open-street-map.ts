/* eslint @typescript-eslint/camelcase: 0 */
import axios from 'axios'

export class OpenStreetMapService {
  static URL = 'https://nominatim.openstreetmap.org/search.php'

  async search(term: string): Promise<OpenStreetMap.Response> {
    const response = await axios.get(OpenStreetMapService.URL, {
      params: { q: term, polygon_geojson: 1, format: 'json' }
    })

    return response.data
  }
}
