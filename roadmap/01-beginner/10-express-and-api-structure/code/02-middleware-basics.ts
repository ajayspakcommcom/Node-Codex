import type { Middleware } from "./shared/express-like.js";

const requestLoggerMiddleware: Middleware = (request, next) => {
  console.log("request-logger middleware", {
    requestId: request.context?.requestId,
    actorId: request.context?.actorId,
  });
  next();
};

const authMiddleware: Middleware = (request, next) => {
  console.log("auth middleware", {
    authorizationHeader: request.headers.authorization,
  });
  next();
};

requestLoggerMiddleware(
  {
    params: {},
    query: {},
    headers: { authorization: "Bearer token-123" },
    context: { requestId: "req_101", actorId: "usr_1" },
  },
  () => authMiddleware(
    {
      params: {},
      query: {},
      headers: { authorization: "Bearer token-123" },
      context: { requestId: "req_101", actorId: "usr_1" },
    },
    () => console.log("route handler reached"),
  ),
);
