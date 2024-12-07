import Fastify, { FastifyInstance } from 'fastify';
import { app } from '../src/app/app';
import { PrismaClient } from '@prisma/client';
import auth from '../src/app/routes/public/auth';
import { OutgoingHttpHeader } from 'http';

export let testServer: FastifyInstance;

async function cleanDb() {
    const client = new PrismaClient()

    const tables = await client.$queryRaw`
        SELECT table_name
        FROM
        information_schema.tables
        WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
        AND table_type='BASE TABLE'
    ` as { table_name: string }[]
    const tableNames = tables.reduce((acc, table) => {
        if (table.table_name.startsWith("_")) return acc
        return [...acc, table.table_name]
    }, [] as string[]) 

    await client.$executeRawUnsafe(`TRUNCATE ${tableNames.map((name) => `public."${name}"`).join(", ")}`)
}

beforeEach( async () => {
    await cleanDb()

    testServer = Fastify();
    testServer.register(app);
});


export const TEST_EMAIL = "testing@testing.com"
export const TEST_PASSWORD = "testPassword"

export async function registerTestUserAndRetrieveToken(server: FastifyInstance): Promise<string> {
    const response = await server.inject({
        url: '/public/auth/register',
        method: 'POST',
        payload: {
            email: TEST_EMAIL,
            password: TEST_PASSWORD,
        },        
    });

    return response.json().token as string
}