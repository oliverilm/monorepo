import { FastifyInstance } from 'fastify';
import club, { ClubCreate } from '../../services/club';
import typia from "typia"

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.post("/club/create", {
        schema: {
            body: {
                type: 'object',
                required: ['name', 'country'],
                properties: {
                    name: { type: 'string' },
                    country: { type: 'string' }
                }
            }
        }
    }, (request) => {
        const payload = typia.assert<ClubCreate>(request.body)
        const userId = typia.assert<{ userId: string}>(request)
        return club.create({...payload, userId: userId.userId})
    })
}

