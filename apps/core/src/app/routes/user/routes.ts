import { FastifyInstance } from 'fastify';
import user from '../../services/user';
import typia from 'typia';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.get("/profile", (request) => {
        const payload = typia.assert<{userId: string}>(request)
        return user.getUserProfile(payload.userId)
    })
}

