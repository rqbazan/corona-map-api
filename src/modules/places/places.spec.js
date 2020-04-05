var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import supertest from 'supertest';
import { checkObjectsRequiredProps } from 'tests/helpers';
import { useDatabase } from '~/connectors/mongo';
import server from '~/server';
import { PlaceRepository } from './repository';
const requiredProps = ['name', 'searchTemplate', 'slug'];
jest.mock('~/modules/services/open-street-map');
describe('places module', () => {
    it('should return all the places', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest(server).get('/places');
        expect(res.body).toHaveLength(4);
        checkObjectsRequiredProps(res.body, requiredProps);
    }));
    describe('populate polygons', () => {
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield useDatabase(db => {
                return db
                    .collection(PlaceRepository.COLLECTION_NAME)
                    .updateMany({}, { $set: { geojson: null, center: null } });
            });
        }));
        it('should set geoinfo to all the places', () => __awaiter(void 0, void 0, void 0, function* () {
            let res;
            res = yield supertest(server).get('/places/populateGeoInfo');
            expect(res.body).toEqual({ updated: 4 });
            res = yield supertest(server).get('/places');
            expect(res.body).toHaveLength(4);
            checkObjectsRequiredProps(res.body, ['geojson', 'center']);
        }));
    });
});
