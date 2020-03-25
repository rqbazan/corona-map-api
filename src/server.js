import * as restify from 'restify'
import helmet from 'helmet'
import cors from 'cors'
import routes from './routes'

const server = restify.createServer()

server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())
server.use(restify.plugins.fullResponse())
server.use(helmet())
server.use(cors())
server.pre(restify.pre.sanitizePath())

routes(server)

export default server
