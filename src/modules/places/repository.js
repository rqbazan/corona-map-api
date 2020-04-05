import { BaseRepository } from '~/modules/base-repository';
export class PlaceRepository extends BaseRepository {
    constructor() {
        super(...arguments);
        this.collectionName = PlaceRepository.COLLECTION_NAME;
    }
}
PlaceRepository.COLLECTION_NAME = 'places';
