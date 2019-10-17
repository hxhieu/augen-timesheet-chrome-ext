import fastify from 'fastify'
import cors from 'fastify-cors'
import { NotFoundError } from 'restify-errors'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { fakeTimesheetByLoginAndDate } from './faker'

// Create a http server. We pass the relevant typings for our http version used.
// By passing types we get correctly typed access to the underlying http objects in routes.
// If using http2 we'd pass <http2.Http2Server, http2.Http2ServerRequest, http2.Http2ServerResponse>
const server: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({
  logger: true,
})

server.register(cors, {
  origin: /^chrome-extension:/,
  credentials: true,
})

server.get('/api/timesheet', (request, reply) => {
  const {
    query: { login, date },
  } = request
  if (login && date) {
    const timesheets = fakeTimesheetByLoginAndDate(date)
    reply.code(200).send(JSON.stringify(timesheets))
  } else {
    reply.code(404).send(new NotFoundError())
  }
})

server.listen(5000, (err: Error, address: string) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})
