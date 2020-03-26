// @ts-check
import jobWorkerRoutes from './job-worker'
import placeRoutes from './place'
import metaInfoRoutes from './meta-info'

/**
 * @param server {import('restify').Server}
 */
export default server => {
  jobWorkerRoutes(server)
  placeRoutes(server)
  metaInfoRoutes(server)
}
