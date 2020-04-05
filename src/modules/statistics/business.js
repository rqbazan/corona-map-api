var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import moment from 'moment-timezone';
import { config } from '~/config';
import { StatisticRepository } from './repository';
export class StatisticBusiness {
    constructor(repository = new StatisticRepository()) {
        this.statisticRepository = repository;
    }
    appendCreatedAt(statistic) {
        return Object.assign(Object.assign({}, statistic), { createdAt: moment()
                .tz(config.TZ)
                .toDate() });
    }
    insertOne(statistic) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOne = this.appendCreatedAt(statistic);
            return this.statisticRepository.insertOne(newOne);
        });
    }
    insertMany(statistics) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOnes = statistics.map(this.appendCreatedAt);
            return this.statisticRepository.insertMany(newOnes);
        });
    }
}
