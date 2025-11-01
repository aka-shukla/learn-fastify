import fastifyMongodb from "@fastify/mongodb";
import fp from "fastify-plugin";

async function mongoConn(fastify, options){
try {
  await fastify.register(fastifyMongodb, {
    forceClose: true,
    url: process.env.MONGO_URI
  })

  // added fastify decorate for mongodb
  fastify.decorate("db", fastify.mongo.db)
  // not for prod level practice: only for testing
  fastify.decorate("user", fastify.db.collection("users"))
  fastify.log.info(`Connected to MongoDB: ${process.env.MONGO_URI}` );
  } catch (error) {
     fastify.log.error(error, "Error connecting to MongoDB");   
    }
}

export default fp(mongoConn);