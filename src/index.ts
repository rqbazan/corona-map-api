import { config } from '~/config'
import server from './server'

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
