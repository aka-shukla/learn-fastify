// Root api plugin

import userRoutes from "./userRoutes.js";

async function apiRoutes(fastify, options){
    fastify.register(userRoutes, { prefix: "/user" });
}

export default apiRoutes