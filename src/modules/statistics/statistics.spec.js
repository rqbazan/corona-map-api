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
import moment from 'moment';
import { checkObjectsRequiredProps, checkObjectRequiredProps } from 'tests/helpers';
import { StatisticRepository } from './repository';
import server from '~/server';
import { config } from '~/config';
const requiredProps = ['affected', 'deaths', 'placeSlug', 'createdAt'];
describe('statistics module', () => {
    const statisticRepository = new StatisticRepository();
    let createdStatisticIds;
    beforeEach(() => {
        createdStatisticIds = null;
    });
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!createdStatisticIds) {
            return;
        }
        yield statisticRepository.deleteManyByIds(createdStatisticIds);
    }));
    it('should return last statistics', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest(server).get('/statistics');
        expect(res.body).toHaveLength(4);
        checkObjectsRequiredProps(res.body, requiredProps);
        const createdAt = '2020-03-24';
        res.body.forEach(item => {
            expect(moment(item.createdAt).format(config.DAY_PATTERN)).toBe(createdAt);
        });
    }));
    it('should return statistics for 2020-03-23', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdAt = '2020-03-23';
        const res = yield supertest(server)
            .get('/statistics')
            .query({ createdAt });
        expect(res.body).toHaveLength(4);
        checkObjectsRequiredProps(res.body, requiredProps);
        res.body.forEach(item => {
            expect(moment(item.createdAt).format(config.DAY_PATTERN)).toBe(createdAt);
        });
    }));
    it('should return an error when try to query w/o valid format', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdAt = '2020/03/23';
        const res = yield supertest(server)
            .get('/statistics')
            .query({ createdAt });
        expect(res.body.error).toBeDefined();
    }));
    it.each([[undefined], [{}], [[]], [null]])('should return an error when try to create with `%p` as data', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest(server)
            .post('/statistics')
            .send(data);
        expect(res.body.error).toBeDefined();
    }));
    it('should create one new statistic', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const dataToInsert = {
            affected: 10,
            deaths: 32,
            placeSlug: 'lima'
        };
        const res = yield supertest(server)
            .post('/statistics')
            .send(dataToInsert);
        createdStatisticIds = [(_b = (_a = res.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b._id];
        expect(res.body.inserted).toBe(1);
        expect(res.body.data).toMatchObject(dataToInsert);
        checkObjectRequiredProps(res.body.data, ['_id']);
    }));
    it('should create several statistics', () => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        const dataToInsert = [
            {
                affected: 1,
                deaths: 12,
                placeSlug: 'lima'
            },
            {
                affected: 112,
                deaths: 32,
                placeSlug: 'arequipa'
            },
            {
                affected: 122,
                deaths: 31,
                placeSlug: 'la-libertad'
            }
        ];
        const res = yield supertest(server)
            .post('/statistics')
            .send(dataToInsert);
        createdStatisticIds = (_d = (_c = res.body) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.map(item => item._id);
        expect(res.body.inserted).toBe(3);
        expect(res.body.data).toMatchObject(dataToInsert);
        checkObjectsRequiredProps(res.body.data, ['_id']);
    }));
});
