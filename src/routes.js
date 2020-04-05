import placesRoutes from '~/modules/places/routes';
import statisticsRoutes from '~/modules/statistics/routes';
export default (server) => {
    placesRoutes(server);
    statisticsRoutes(server);
};
