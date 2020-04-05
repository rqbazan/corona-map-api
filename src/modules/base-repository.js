var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ObjectID, ObjectId } from 'mongodb';
import { sanitizeObject } from '~/utilities/sanitize-object';
import { useDatabase } from '~/connectors/mongo';
export class BaseRepository {
    getAll(query = {}, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return useDatabase(db => db
                .collection(this.collectionName)
                .find(query, options)
                .toArray());
        });
    }
    bulkUpdate(items) {
        return __awaiter(this, void 0, void 0, function* () {
            const operations = items.map(item => ({
                updateOne: {
                    filter: { _id: new ObjectID(item._id) },
                    update: { $set: sanitizeObject(item) }
                }
            }));
            return useDatabase((db) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const len = (_a = operations === null || operations === void 0 ? void 0 : operations.length) !== null && _a !== void 0 ? _a : 0;
                if (len > 0) {
                    yield db.collection(this.collectionName).bulkWrite(operations);
                }
                return len;
            }));
        });
    }
    updateById(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return useDatabase((db) => __awaiter(this, void 0, void 0, function* () {
                const { modifiedCount } = yield db
                    .collection(this.collectionName)
                    .updateOne({ _id: new ObjectID(item._id) }, { $set: sanitizeObject(item) });
                return modifiedCount;
            }));
        });
    }
    insertMany(entities) {
        return __awaiter(this, void 0, void 0, function* () {
            return useDatabase((db) => __awaiter(this, void 0, void 0, function* () {
                const { insertedIds, insertedCount } = yield db
                    .collection(this.collectionName)
                    .insertMany(entities);
                const result = yield db
                    .collection(this.collectionName)
                    .find({ _id: { $in: Object.values(insertedIds) } })
                    .toArray();
                return {
                    inserted: insertedCount,
                    data: result
                };
            }));
        });
    }
    insertOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return useDatabase((db) => __awaiter(this, void 0, void 0, function* () {
                const { insertedId, insertedCount } = yield db
                    .collection(this.collectionName)
                    .insertOne(data);
                const result = yield db
                    .collection(this.collectionName)
                    .find(insertedId)
                    .toArray();
                return {
                    inserted: insertedCount,
                    data: result === null || result === void 0 ? void 0 : result[0]
                };
            }));
        });
    }
    deleteManyByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return useDatabase((db) => __awaiter(this, void 0, void 0, function* () {
                return db.collection(this.collectionName).deleteMany({
                    _id: { $in: ids.map(id => new ObjectId(id)) }
                });
            }));
        });
    }
}
