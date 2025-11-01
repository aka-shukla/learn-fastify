# Fastify vs Express.js

1. **Release Year:** Fastify launched in 2016, while Express has been around since 2010.  
2. **Speed / Performance:** Fastify is much faster — up to 4× compared to Express. (Benchmarks shows), using optimized HTTP handling and precompiled JSON serialization.
3. **Error Handling:** Fastify has built-in async error handling, so route handlers and hooks automatically catch errors. while Express relies on manual error-handling middleware (next(err)), which can be forgotten and lead to uncaught exceptions.
4. **Logging:** Fastify comes with integrated logging via Pino, which is very fast and structured.
5. **Middleware / Plugins:** Fastify uses hooks and encapsulated plugins, avoiding unnecessary function calls and improving performance. Express uses middleware functions with next().
6. **Validation / Serialization:** Fastify supports route-level schema validation with JSON Schema and uses precompiled serializers for extremely fast JSON responses. while in express dev use library like joi and node-input-valitor etc
7. **Async / Await Support:** Fastify is fully async/await friendly, and route handlers can return promises directly.
8. **Community / Ecosystem:** fastify is growing as compared to express which is mature

---

visit official doc: `https://fastify.dev/docs/latest/Guides/Getting-Started/`

## request-response cycle in fastify

`express res.send` vs `fastify reply.send`

**`express res.send`** is a thin wrapper over Node.js's response object.

It’s a convenience method that:  
- Detects the type of data (string, object, Buffer, etc.)  
- Sets appropriate headers (`Content-Type`)  
- Calls `res.end()` to finish the response  
- That’s it — it doesn’t do schema validation, serialization optimization, or async error handling.

**`fastify reply.send`**, on the other hand, is a full serialization engine:  
- Checks if there’s a response schema defined for the route.  
- Uses a precompiled serializer (via `fast-json-stringify`) for blazing-fast JSON output  
  *(up to 4× faster than `JSON.stringify()`).*  
- Detects the value type:  
  - Object → serialized to JSON  
  - String → sent as text  
  - Stream → piped automatically  
- Handles async errors automatically.  
- Ends the response only once (guarded).

---

## Body Parser and Content Types

In Fastify, body parsing is **built-in by default**, and parsing is asynchronous and very fast.

However, for other content types like `multipart/form-data` or `application/x-www-form-urlencoded`, you need to register plugins (in Express you would have used Multer for multi part and urlencoded for html form submit):  

- **File uploads:** `@fastify/multipart`  
- **URL-encoded forms:(html form)** `@fastify/formbody`  

> Fastify automatically parses JSON bodies, but `application/x-www-form-urlencoded` requires the `@fastify/formbody` plugin to parse correctly.


---

## Fastify does not use `next()`

Fastify does not use `next()` like Express.  
Instead, it replaces that model with a **hook-based lifecycle** and **plugin encapsulation**, which avoids unnecessary function calls and improves performance.

---

## Hooks in Fastify

Hooks in Fastify are functions that run at specific points in the request/response lifecycle.

### Lifecycle of a Fastify Request

A typical request goes through these stages:  
- **onRequest** → right after the HTTP request arrives  
- **preParsing** → before body parsing  
- **preValidation** → before schema validation  
- **preHandler** → before route handler  
- **handler** → your route logic  
- **onSend** → before sending the response  
- **onResponse** → after the response is sent  
- **onError** → if an error occurs at any stage

---


## plugins, decorators and registering routes

 > As with JavaScript, where everything is an object, with Fastify everything is a plugin.
  to register the route, use register API its only way to add routes,

  Fastify-decorators:- 
    Decorators let you attach properties or methods to Fastify, request, or reply.
    They are like helpers or utilities that routes and hooks can use without importing anything.
    Helps keep code DRY, modular, and clean.
  
  registering routes in fastify:-  
    Routes are registered inside plugins using the fastify.register() method.
    You can attach a prefix for route grouping, which is useful for APIs.

## schema validation
  Fastify has built-in support for JSON schema validation. (it uses AJV (Another JSON Validator) internally to validate request bodies, query parameters, headers, and response objects.)
  

## handle errors & logging

## migration from express to fastify
 > @express-fastify
  