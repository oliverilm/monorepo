import { FastifyInstance } from 'fastify';
import user from '../../services/user';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.post('/auth/login', {
        schema: {
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                }
            }
        }
    }, async function (request) {
        // @ts-expect-error -- will fix
        return user.login({ email: request.body.email, password: request.body.password});
    });

    fastify.post('/auth/register', {
        schema: {
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                }
            }
        }
    }, async function (request) {
        // @ts-expect-error -- will fix
        return user.createUser({ email: request.body.email, password: request.body.password});
    });

}
