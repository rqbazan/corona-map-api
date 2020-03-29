import { BaseRepository } from './base'

export class PlaceRepository extends BaseRepository<Entitiy.Place> {
  collectionName = 'places'

  getAllWithoutGeoJson() {
    const query = {
      $or: [{ geojson: { $exists: false } }, { geojson: null }]
    }

    return this.getAll(query)
  }
}
