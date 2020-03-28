import * as restify from 'restify'
import helmet from 'helmet'
import cors from 'cors'

const server = restify.createServer()

server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())
server.use(restify.plugins.fullResponse())
server.use(helmet())
server.use(cors())
server.pre(restify.pre.sanitizePath())

export default server
