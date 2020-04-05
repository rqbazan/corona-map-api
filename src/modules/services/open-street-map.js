var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint @typescript-eslint/camelcase: 0 */
import axios from 'axios';
export class OpenStreetMapService {
    search(term) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios.get(OpenStreetMapService.URL, {
                params: { q: term, polygon_geojson: 1, format: 'json' }
            });
            return response.data;
        });
    }
}
OpenStreetMapService.URL = 'https://nominatim.openstreetmap.org/search.php';
