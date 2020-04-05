import { BaseRepository } from '~/modules/base-repository'

export class PlaceRepository extends BaseRepository<Entitiy.Place> {
  static COLLECTION_NAME = 'places'

  collectionName = PlaceRepository.COLLECTION_NAME
}
