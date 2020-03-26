// @ts-check
import { MetaInfoController } from '~/controllers/meta-info'

/**
 * @param server {import('restify').Server}
 */
export default server => {
  const controller = new MetaInfoController()

  server.get('/meta-info', controller.getGeneralMetaInfo.bind(controller))
}
