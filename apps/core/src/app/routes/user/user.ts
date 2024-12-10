import { FastifyInstance } from 'fastify';
import user, { UserPatchPayload } from '../../services/user';
import typia from 'typia';
import { getAssertedUserIdFromRequest } from '../../utils/request';


// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.get("/profile", (request) => {
        return user.getUserProfile(
            getAssertedUserIdFromRequest(request)
        )
    })

    fastify.patch("/profile", (request) => {
        const payload = typia.assert<Omit<UserPatchPayload, "userId">>(request.body)
        return user.updateUserProfile({
            ...payload, 
            userId: getAssertedUserIdFromRequest(request)
        })
    })
}

