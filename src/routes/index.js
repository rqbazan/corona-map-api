// @ts-check
import basicRoutes from './basic'

/**
 * @param server {import('restify').Server}
 */
export default server => {
  basicRoutes(server)
}
