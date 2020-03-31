declare namespace OpenStreetMap {
  export interface Item {
    lat: string
    lon: string
    geojson: GeoJSON.GeoJSON
  }

  export type Response = Item[]
}
