import { Server } from 'restify'
import { JobWorkerController } from '~/controllers/job-worker'

export default (server: Server) => {
  const controller = new JobWorkerController()

  server.get(
    '/set-geojson',
    controller.setGeoJsonToAllSearchablePlaces.bind(controller)
  )
}
