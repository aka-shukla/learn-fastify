import Fastify from "fastify";
import apiRoutes from "./routes/api.js";

const app = Fastify({
    logger: true
});

app.register(apiRoutes, { prefix: "/api" });

const start = async ()=> {
    try {
        await app.listen({ port: 3000 });
        app.log.info(`server listening on ${3000}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

start();
