// @ts-check
import jobWorkerRoutes from './job-worker'
import placeRoutes from './place'

/**
 * @param server {import('restify').Server}
 */
export default server => {
  jobWorkerRoutes(server)
  placeRoutes(server)
}
