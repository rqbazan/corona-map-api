import { PlaceController } from './controller';
export default (server) => {
    const controller = new PlaceController();
    server.get('/places', controller.getAll.bind(controller));
    server.get('/places/populateGeoInfo', controller.populateGeoInfo.bind(controller));
};
