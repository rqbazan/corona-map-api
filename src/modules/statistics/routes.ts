import { Server } from 'restify'
import { StatisticController } from './controller'

export default (server: Server) => {
  const controller = new StatisticController()

  server.get('/public/statistics', controller.getAll.bind(controller))

  server.post('/private/statistics', controller.create.bind(controller))

  server.put('/private/statistics', controller.update.bind(controller))
}
