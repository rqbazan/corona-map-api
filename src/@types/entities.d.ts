declare namespace Entitiy {
  export interface Base {
    _id: string
  }

  export interface Statistic extends Base {
    affected: number
    deaths: number
    placeSlug: string
    reportedAt: Date
  }

  export interface Place extends Base {
    slug: string
    name: string
    searchTemplate: string
    geojson?: GeoJSON.Polygon | GeoJSON.MultiPolygon
    center?: GeoJSON.Position
  }
}
