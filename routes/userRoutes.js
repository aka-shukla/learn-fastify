const createUserSchema = {
  body: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
    },
  },
  // querystring: queryStringJsonSchema,
  // params: paramsJsonSchema,
  // headers: headersJsonSchema,
}


function userRoutes(fastify, options){
  fastify.get("/", async(request, reply)=> {

    const users = await fastify.user.find().toArray()
    return { message: "hello from get user route", users }
  })

  fastify.post("/create", { schema: createUserSchema }, async(request, reply)=> {
    return { message: "User created successfully:", user: request.body }
  })

}

export default userRoutes