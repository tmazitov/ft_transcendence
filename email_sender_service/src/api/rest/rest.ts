import { FastifyInstance } from 'fastify'
import { IEndpoint } from '../../pkg/handler/handler'
import sendEmailHandler from './handlers/sendEmail'
import exampleHandler from './handlers/exaple'


const routes: IEndpoint[] = [
  { method: 'POST',route: '/ess/api/rest/email/send',handler: sendEmailHandler},
  { method: 'GET', route: '/ess/api/rest/example', handler: exampleHandler,}
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
