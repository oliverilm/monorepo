import { FastifyInstance } from 'fastify';
import user, { LoginCredentials } from '../../services/user';
import typia from 'typia';

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
    }, (request) => {
        const payload = typia.assert<LoginCredentials>(request.body)
        return user.login(payload);
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
    }, (request) => {
        const payload = typia.assert<LoginCredentials>(request.body)
        return user.createUser(payload);
    });

}
