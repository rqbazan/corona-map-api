import { Server } from 'restify'
import placeRoutes from './place'

export default (server: Server) => {
  placeRoutes(server)
}
