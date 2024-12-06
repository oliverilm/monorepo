import { FastifyInstance} from "fastify";
import { sessionAuth } from "../../middleware/auth";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async function (fastify: FastifyInstance) {
    fastify.addHook("onRequest", sessionAuth);
});
  
