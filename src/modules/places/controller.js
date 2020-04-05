var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PlaceRepository } from './repository';
import { PlaceBusiness } from './business';
export class PlaceController {
    constructor(repository = new PlaceRepository()) {
        this.placeRepository = repository;
        this.placeBusiness = new PlaceBusiness(repository);
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const places = yield this.placeRepository.getAll();
                res.json(places);
            }
            catch (error) {
                res.json({ error: error.message });
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const affected = yield this.placeRepository.updateById(Object.assign(Object.assign({}, req.body), { _id: req.params.id }));
                res.json({ affected });
            }
            catch (error) {
                res.json({ error: error.message });
            }
        });
    }
    populateGeoInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield this.placeBusiness.populateGeoInfo();
                res.json({ updated });
            }
            catch (error) {
                res.json({ error: error.message });
            }
        });
    }
}
