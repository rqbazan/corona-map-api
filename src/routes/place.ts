import { Server } from 'restify'
import { PlaceController } from '~/controllers/place'

export default (server: Server) => {
  const controller = new PlaceController()

  server.get('/places', controller.getAll.bind(controller))
}
