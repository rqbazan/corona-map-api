import { BaseRepository } from './base'

export class PlaceRepository extends BaseRepository<Entitiy.Place> {
  static COLLECTION_NAME = 'places'

  collectionName = PlaceRepository.COLLECTION_NAME

  getAllWithoutGeoJson() {
    const query = {
      $or: [{ geojson: { $exists: false } }, { geojson: null }]
    }

    return this.getAll(query)
  }
}
