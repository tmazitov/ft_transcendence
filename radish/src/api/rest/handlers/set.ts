import { FastifyRequest, FastifyReply } from 'fastify'
import KeyValueStorage from '../../../storage/KeyValueStorage'

type SetHandlerBody = {
    value: any
    expire: number | undefined
}    

export async function setHandler(request: FastifyRequest, reply: FastifyReply) {
    const { key } = request.params as { key: string }
    const { value, expire } = request.body as SetHandlerBody

    if (!key || !value) {
        return reply.status(400).send({ error: 'Invalid arguments.' })
    }

    if (KeyValueStorage.get(key)) {
        return reply.status(409).send({ error: 'Key already exists.' })
    }
    
    KeyValueStorage.set(key, value, expire)
    return reply.status(201).send({ message: 'Created.' })
}
