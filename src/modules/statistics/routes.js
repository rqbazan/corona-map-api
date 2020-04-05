import { StatisticController } from './controller';
export default (server) => {
    const controller = new StatisticController();
    server.get('/statistics', controller.getAll.bind(controller));
    server.post('/statistics', controller.create.bind(controller));
};
