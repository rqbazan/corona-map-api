import { Server } from 'restify'
import placesRoutes from '~/modules/places/routes'
import statisticsRoutes from '~/modules/statistics/routes'
import authRoutes from '~/modules/auth/routes'

export default (server: Server) => {
  authRoutes(server)
  placesRoutes(server)
  statisticsRoutes(server)
}
