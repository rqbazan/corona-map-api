import { Server } from 'restify'
import statusRoutes from './status'
import placeRoutes from './place'
import jobRoutes from './job'
import statisticRoutes from './statistic'

export default (server: Server) => {
  statusRoutes(server)
  placeRoutes(server)
  jobRoutes(server)
  statisticRoutes(server)
}
