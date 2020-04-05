import { Server } from 'restify'
import placesRoutes from '~/modules/places/routes'
import statisticsRoutes from '~/modules/statistics/routes'

export default (server: Server) => {
  placesRoutes(server)
  statisticsRoutes(server)
}
