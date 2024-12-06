import { FastifyInstance } from 'fastify';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.get("/health", (request, reply) => {
        return request.routerPath
    })

    
}
