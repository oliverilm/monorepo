import { FastifyInstance } from 'fastify';
import user from '../../services/user';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.get("/profile", (request) => {
        return user.getUserProfile(request.userId)
    })

    fastify.get("/health", (request) => {
        return { health: true, userId: request.userId }
    })
}

