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
export class OpenStreetMapService {
    search() {
        return __awaiter(this, void 0, void 0, function* () {
            return [
                {
                    lat: '-8.1163342',
                    lon: '-79.0330558',
                    geojson: {
                        type: 'Polygon',
                        coordinates: [
                            [
                                [-79.082519, -8.0592296],
                                [-79.0935108, -8.0646685],
                                [-78.9698528, -8.2169271],
                                [-78.9423733, -8.0456321],
                                [-79.082519, -8.0592296]
                            ]
                        ]
                    }
                }
            ];
        });
    }
}
