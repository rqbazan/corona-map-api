/* eslint @typescript-eslint/camelcase: 0 */
export class OpenStreetMapService {
  async search(): Promise<OpenStreetMap.Response> {
    return [
      {
        lat: '-8.1163342',
        lon: '-79.0330558',
        geojson: {
          type: 'Polygon',
          coordinates: [
            [
              [-79.082519, -8.0592296],
              [-79.0935108, -8.0646685],
              [-78.9698528, -8.2169271],
              [-78.9423733, -8.0456321],
              [-79.082519, -8.0592296]
            ]
          ]
        }
      }
    ]
  }
}
