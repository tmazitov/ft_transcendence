import { FastifyRequest, FastifyReply } from 'fastify'
import KeyValueStorage from '../../../storage/KeyValueStorage'

export async function deleteHandler(request: FastifyRequest, reply: FastifyReply) {
    const {key} = request.params as {key: string}
    if (!key) {
        return reply.status(400).send({ error: 'Invalid arguments.' })
    }

    const record = KeyValueStorage.delete(key)
    if (!record) {
        return reply.status(404).send({ error: 'Not found.' })
    }

    return reply.status(200).send({ message: 'Deleted.' })
}
