import { FastifyInstance } from 'fastify'
import { IEndpoint } from '../../pkg/handler/handler'
import { getHandler } from './handlers/get'
import { setHandler } from './handlers/set'
import { deleteHandler } from './handlers/delete'

const routes: IEndpoint[] = [
  {method: "GET", route: "/get/:key", handler: getHandler},
  {method: "POST", route: "/set/:key", handler: setHandler},
  {method: "DELETE", route: "/delete/:key", handler: deleteHandler},
]

export async function registerRestRoutes(app: FastifyInstance) {
  for (const route of routes) {
    app.route({
      method: route.method,
      url: route.route,
      handler: route.handler
    })
    console.log(`> ${route.method} ${route.route} --> ${route.handler.name}`)
  }
}
