import { getORMConnector, getORMMiddlewareConnector } from '~/connectors/orm'
import server from './server'
import appRoutes from './routes'

async function main() {
  const orm = await getORMConnector()

  server.use(getORMMiddlewareConnector(orm))

  appRoutes(server)

  const port = process.env.PORT || 4000

  server.listen(port, () => {
    console.log(`Server running port ${port}`)
  })
}

main()
