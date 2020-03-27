import { Server } from 'restify'
import { PlaceController } from '~/controllers/place'

export default (server: Server) => {
  const controller = new PlaceController()

  server.get('/places', controller.getAllPlaces.bind(controller))

  server.patch('/places/:id', controller.partialUpdate.bind(controller))

  server.get(
    '/searchable-places',
    controller.getSearchablePlaces.bind(controller)
  )
}
