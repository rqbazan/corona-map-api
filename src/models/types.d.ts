import { GeoJSON } from '~/services/types'

export interface Place {
  _id: string
  searchTemplate: string
  name: string
  country: string
  confirmed: number
  deaths: number
  location?: LatLng
  geojson?: GeoJSON
}

export interface SearchablePlace {
  _id: string
  searchTemplate: string
  name: string
  country: string
}

export interface GeoJsonSearchablePlace {
  _id: string
  searchTemplate: string
  name: string
  country: string
  location?: LatLng
  geojson?: GeoJSON
}

export interface LatLng {
  lat: number
  lng: number
}

export interface GeneralMetaInfo {
  _id: string
  lastUpdate: Date
  slug: string
}
