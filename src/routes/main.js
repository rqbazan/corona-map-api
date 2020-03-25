// @ts-check
import { MainController } from '~/controllers/main'

/**
 * @param server {import('restify').Server}
 */
export default server => {
  const controller = new MainController()

  server.get('/', controller.handle.bind(controller))
}
