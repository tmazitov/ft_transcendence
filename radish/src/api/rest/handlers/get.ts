import { FastifyRequest, FastifyReply } from 'fastify'
import KeyValueStorage from '../../../storage/KeyValueStorage'

export async function getHandler(request: FastifyRequest, reply: FastifyReply) {
    const { key } = request.params as { key: string }

    if (!key) {
        return reply.status(400).send({ error: 'Invalid arguments.' })
    }

    const value = KeyValueStorage.get(key)
    if (!value) {
        return reply.status(404).send({ error: 'Not found.' })
    }

    console.log("🗄️ Getting item from storage:", value);

    return reply.status(200).send({ value })
}
