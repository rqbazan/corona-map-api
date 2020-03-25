// @ts-check
import mainRoutes from './main'

/**
 * @param server {import('restify').Server}
 */
export default server => {
  mainRoutes(server)
}
