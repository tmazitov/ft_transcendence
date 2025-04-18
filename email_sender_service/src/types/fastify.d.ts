import 'fastify'
import DatabaseStorage from '../storage/storage'

declare module 'fastify' {
  interface FastifyInstance {
    storage: DatabaseStorage
  }
  interface FastifyRequest {
    server: FastifyInstance // Make sure this is declared
  }
}