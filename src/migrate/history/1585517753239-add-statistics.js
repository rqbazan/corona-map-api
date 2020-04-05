var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useDatabase } from '~/connectors/mongo';
import { parseDate } from '~/utilities/dates';
import statistics from '../seeders/statistcs.json';
const collectionName = 'statistics';
export function up() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = statistics.map(item => (Object.assign(Object.assign({}, item), { createdAt: parseDate(item.createdAt) })));
        useDatabase((db) => __awaiter(this, void 0, void 0, function* () {
            yield db.collection(collectionName).insertMany(data);
        }));
    });
}
export function down() {
    return __awaiter(this, void 0, void 0, function* () {
        useDatabase((db) => __awaiter(this, void 0, void 0, function* () {
            yield db.collection(collectionName).deleteMany({});
        }));
    });
}
