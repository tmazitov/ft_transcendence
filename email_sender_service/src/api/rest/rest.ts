import { FastifyInstance } from 'fastify'
import { IHandler } from '../../pkg/handler/handler'
import { sendEmail } from './handlers/sendEmail'

const routes: IHandler[] = [
  {
    method: 'POST',
    route: '/ess/api/rest/email/send',
    handler: sendEmail
  }
]

export async function registerRestRoutes(app: FastifyInstance) {
  
  console.log('Registering REST routes...')
  
  for (const route of routes) {
    app.route({
      method: route.method,
      url: route.route,
      handler: route.handler
    })
    console.log(`> ${route.method} ${route.route} --> ${route.handler.name}`)
  }
  console.log("")
}
