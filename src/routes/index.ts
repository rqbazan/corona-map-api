import { Server } from 'restify'
import jobWorkerRoutes from './job-worker'
import placeRoutes from './place'
import metaInfoRoutes from './meta-info'

export default (server: Server) => {
  jobWorkerRoutes(server)
  placeRoutes(server)
  metaInfoRoutes(server)
}
