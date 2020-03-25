// @ts-check
import { PlaceController } from '~/controllers/place'

/**
 * @param server {import('restify').Server}
 */
export default server => {
  const controller = new PlaceController()

  server.get('/places', controller.getAllPlaces.bind(controller))

  server.get(
    '/searchable-places',
    controller.getSearchablePlaces.bind(controller)
  )
}
