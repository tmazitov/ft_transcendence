import { FastifyReply, FastifyRequest } from "fastify";

export default async function exampleHandler(request: FastifyRequest, reply: FastifyReply) : Promise<any> {
        
    /* Do something with request */

    const userData = request.server.storage.getUserData();

    /* Do something with response */

    return reply.code(200).send({
        userData,
    })
}