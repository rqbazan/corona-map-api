import { Server } from 'restify'
import { PlaceController } from './controller'

export default (server: Server) => {
  const controller = new PlaceController()

  server.get('/public/places', controller.getAll.bind(controller))

  server.get(
    '/private/places/populateGeoInfo',
    controller.populateGeoInfo.bind(controller)
  )
}
