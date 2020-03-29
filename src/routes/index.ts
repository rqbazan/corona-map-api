import { Server } from 'restify'
import placeRoutes from './place'
import jobRoutes from './job'
import statisticRoutes from './statistic'

export default (server: Server) => {
  placeRoutes(server)
  jobRoutes(server)
  statisticRoutes(server)
}
