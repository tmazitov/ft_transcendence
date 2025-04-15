import Fastify from 'fastify'
import { registerRestRoutes } from './api/rest/rest'
import { exit } from 'process'
import EmailQueue from './pkg/emailQueue/emailQueue'
import loggerMiddleware from './pkg/middlewares/loggerMiddleware'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const app = Fastify()

async function gracefulShutdown(signal: string) {
  try {
    EmailQueue.shutdown()
    console.log('EmailQueue shutdown complete.')
    exit(0)
  } catch (error) {
    console.error('Error during shutdown:', error)
    exit(1)
  }
}

async function main() {
  await registerRestRoutes(app)

  app.addHook('onRequest', loggerMiddleware)
  
  EmailQueue.setup('./templates.json')

  app.listen({ port: Number(process.env.PORT) || 3000 }, (err, address) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    console.log("Server listening at " + address)
  })
}

main()

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)