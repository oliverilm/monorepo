import { FastifyInstance } from 'fastify';
import club, { SkipTake } from '../../services/club';
import typia from 'typia';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.get("/club", 
     (request) => {
        const payload = typia.assert<SkipTake>(request.query)
        return club.getClubList(payload)
    })

    fastify.get("/club/:slug", (request) => {
        // TODO: implement me
        return null
    })

    


}
