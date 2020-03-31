import { Server } from 'restify'

export default (server: Server) => {
  server.get('/', (req, res) => res.json({ ok: true }))
}
