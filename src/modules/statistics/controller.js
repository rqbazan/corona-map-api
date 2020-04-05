var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Joi from '@hapi/joi';
import { StatisticRepository } from './repository';
import { StatisticBusiness } from './business';
import { parseDate } from '~/utilities/dates';
import { createStatisticBodySchema, getAllStatisticsQuerySchema } from './validators';
export class StatisticController {
    constructor(repository = new StatisticRepository()) {
        this.statisticRepository = repository;
        this.statisticBusiness = new StatisticBusiness(repository);
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Joi.assert(req.query, getAllStatisticsQuerySchema);
                const rawCreatedAt = req.query.createdAt;
                const createdAt = rawCreatedAt && parseDate(rawCreatedAt);
                const statistics = yield this.statisticRepository.getAllByCreatedAt(createdAt);
                res.json(statistics);
            }
            catch (error) {
                res.json({ error: error.details || error.message });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Joi.assert(req.body, createStatisticBodySchema);
                let result;
                if (Array.isArray(req.body)) {
                    result = yield this.statisticBusiness.insertMany(req.body);
                }
                else {
                    result = yield this.statisticBusiness.insertOne(req.body);
                }
                res.json(result);
            }
            catch (error) {
                res.json({ error: error.details || error.message });
            }
        });
    }
}
