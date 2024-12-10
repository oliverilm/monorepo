import { FastifyInstance } from 'fastify';
import club, { ClubCreate } from '../../services/club';
import typia from "typia"
import { getAssertedUserIdFromRequest } from '../../utils/request';
import { CompetitionService } from '../../services/competition';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.post("/competition/create", (request) => {
        const payload = typia.assert<ClubCreate>(request.body)
        return club.create({...payload, userId: getAssertedUserIdFromRequest(request)})
    })

    fastify.patch("/competitions/:slug", (request) => {
        // implement this
        const params = typia.assert<{slug: string}>(request.params)
        // TODO: implement this
        return CompetitionService.updateCompetition(params.slug, {})
    })
}

