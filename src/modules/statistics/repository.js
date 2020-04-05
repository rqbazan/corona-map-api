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
import { BaseRepository } from '~/modules/base-repository';
import { startOfDay, endOfDay } from '~/utilities/dates';
export class StatisticRepository extends BaseRepository {
    constructor() {
        super(...arguments);
        this.collectionName = StatisticRepository.COLLECTION_NAME;
    }
    getAllByCreatedAt(createdAt) {
        return useDatabase((db) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const collection = db.collection(this.collectionName);
            if (createdAt) {
                const findQuery = {
                    createdAt: {
                        $gte: startOfDay(createdAt),
                        $lt: endOfDay(createdAt)
                    }
                };
                return collection.find(findQuery).toArray();
            }
            const aggregateQuery = [
                {
                    $group: {
                        _id: '$createdAt',
                        doc: { $push: '$$ROOT' }
                    }
                },
                {
                    $sort: {
                        _id: -1
                    }
                },
                {
                    $limit: 1
                }
            ];
            const result = yield collection.aggregate(aggregateQuery).toArray();
            return (_b = (_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a.doc) !== null && _b !== void 0 ? _b : [];
        }));
    }
}
StatisticRepository.COLLECTION_NAME = 'statistics';
