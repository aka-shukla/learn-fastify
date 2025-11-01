function userRoutes(fastify, options){
  fastify.get("/", async(request, reply)=> {
    return { message: "hello from get user route" }
  })

}

export default userRoutes