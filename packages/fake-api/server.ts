import fastify from 'fastify'
import cors from 'fastify-cors'
import { NotFoundError } from 'restify-errors'
import { Server, IncomingMessage, ServerResponse } from 'http'
import dayjs from 'dayjs'
import { fakeTimesheetByLoginAndDate, fakeChangeSummary } from './faker'

// Week start Monday
dayjs.Ls.en.weekStart = 1

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
  origin: [/^chrome-extension:/, /^http:\/\/localhost/],
  credentials: true,
})

server.get('/api/timesheet', (request, reply) => {
  const {
    query: { login, date, employeeID, periodStartDate, periodEndDate },
  } = request
  if (login && date) {
    reply.code(200).send(fakeTimesheetByLoginAndDate(date))
  } else if (employeeID && periodStartDate && periodEndDate) {
    reply.code(200).send(fakeChangeSummary(periodStartDate))
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
