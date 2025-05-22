import Fastify from 'fastify'
import { registerRestRoutes } from './api/rest/rest'
import { exit } from 'process'
import EmailQueue from './pkg/emailQueue/emailQueue'
import loggerMiddleware from './pkg/middlewares/loggerMiddleware'
import ServiceConfig from './config'
import DatabaseStorage from './storage/storage'
import fp from "fastify-plugin";

const app = Fastify()

async function setupDatabase() {
  // const isProduction = process.env.MODE === 'production'
  
  // const storage = new DatabaseStorage(isProduction ? "/app/data/database.sqlite3" : "./data/database.sqlite3") 
  
  // app.decorate('storage', storage)  

  // app.addHook('onClose', (app, done) => {
  //   storage.close()
  //   done()
  // })
}

const databasePlugin = fp(setupDatabase)

async function main() {
  const config:ServiceConfig = new ServiceConfig()
  await app.register(databasePlugin)
  await registerRestRoutes(app)

  app.addHook('onRequest', loggerMiddleware)
  
  EmailQueue.setup({
    templatesPath: config.templatesPath,
    email: config.smtpEmail,
    pass: config.smtpPass,
  })

  app.listen({ port: config.port, host: config.host}, (err, address) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    console.log("Server listening at " + address)
  })
}

main()

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
process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)