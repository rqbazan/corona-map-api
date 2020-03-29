import { Server } from 'restify'
import { JobController } from '~/controllers/job'

export default (server: Server) => {
  const controller = new JobController()

  server.get(
    '/job/populateGeoInfo',
    controller.populateGeoInfo.bind(controller)
  )
}
