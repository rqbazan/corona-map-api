import { Server } from 'restify'
import { MetaInfoController } from '~/controllers/meta-info'

export default (server: Server) => {
  const controller = new MetaInfoController()

  server.get('/meta-info', controller.getGeneralMetaInfo.bind(controller))
}
