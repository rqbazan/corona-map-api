var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _template from 'lodash.template';
import { PlaceRepository } from './repository';
import { OpenStreetMapService } from '~/modules/services/open-street-map';
const interpolate = /{{([\s\S]+?)}}/g;
const template = (input) => _template(input, { interpolate });
export class PlaceBusiness {
    constructor(repository = new PlaceRepository(), service = new OpenStreetMapService()) {
        this.placeRepository = repository;
        this.openStreetService = service;
    }
    mapPlaceToGeoJsonSearchablePlace(place) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const getSearchTerm = template(place.searchTemplate);
            const term = getSearchTerm(place);
            const data = yield this.openStreetService.search(term);
            const first = (_a = data === null || data === void 0 ? void 0 : data[0]) !== null && _a !== void 0 ? _a : {};
            return Object.assign(Object.assign({}, place), { center: [first.lat, first.lon].map(Number), geojson: first.geojson });
        });
    }
    populateGeoInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const searchables = yield this.getAllWithoutGeoJson();
            const promises = searchables.map(item => this.mapPlaceToGeoJsonSearchablePlace(item));
            const places = yield Promise.all(promises);
            return this.placeRepository.bulkUpdate(places);
        });
    }
    getAllWithoutGeoJson() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                $or: [{ geojson: { $exists: false } }, { geojson: null }]
            };
            return this.placeRepository.getAll(query);
        });
    }
}
