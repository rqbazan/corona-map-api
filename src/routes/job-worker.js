// @ts-check
import { JobWorkerController } from '~/controllers/job-worker'

/**
 * @param server {import('restify').Server}
 */
export default server => {
  const controller = new JobWorkerController()

  server.get(
    '/set-geojson',
    controller.setGeoJsonToAllSearchablePlaces.bind(controller)
  )
}
