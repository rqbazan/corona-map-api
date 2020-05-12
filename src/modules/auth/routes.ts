import { Server } from 'restify'
import { AuthController } from './controller'

export default (server: Server) => {
  const controller = new AuthController()

  server.use(controller.catchAll.bind(controller))
}
