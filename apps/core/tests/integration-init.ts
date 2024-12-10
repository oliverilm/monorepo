import Fastify, { FastifyInstance } from 'fastify';
import { app } from '../src/app/app';
import { PrismaClient } from '@prisma/client';
import user from '../src/app/services/user';

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

    return await client.$executeRawUnsafe(`TRUNCATE ${tableNames.map((name) => `public."${name}"`).join(", ")} CASCADE`)
}



beforeEach(async () => {
    await sleep(1000)
    return cleanDb().then(() => {
        testServer = Fastify();
        testServer.register(app);
    })
});

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const TEST_EMAIL = "testing@testing.com"
export const TEST_PASSWORD = "testPassword"

export async function registerTestUserAndRetrieveToken(override: { email?: string } = {}): Promise<string> {
    const created = await user.createUser({ email: TEST_EMAIL, password: TEST_PASSWORD, ...override})
    if (created) {
        return created.token
    }
    return ""
}