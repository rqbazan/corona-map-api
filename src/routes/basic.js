// @ts-check
import BasicController from '~/controllers/basic'

/**
 * @param server {import('restify').Server}
 */
export default server => {
  const controller = new BasicController()

  server.get('/', controller.getText.bind(controller))
}
