import { logger } from "./shared/logger.js";
import {
  authenticationMiddleware,
  requestIdMiddleware,
  requestLoggingMiddleware,
  requireRoleMiddleware,
} from "./shared/middleware-factories.js";
import { createRequestContext, runMiddlewareStack } from "./shared/middleware-runtime.js";

const request = createRequestContext({
  headers: {
    authorization: "admin-token",
  },
});

const response = await runMiddlewareStack(
  [
    requestIdMiddleware(),
    requestLoggingMiddleware(),
    authenticationMiddleware(),
    requireRoleMiddleware("admin"),
    async (currentRequest, currentResponse) => {
      currentResponse.body = {
        requestId: currentRequest.requestId,
        role: currentRequest.auth?.role,
      };
    },
  ],
  request,
);

logger.info("Middleware ordering example", {
  responseBody: response.body,
  guidance: "Request ID before logging and authentication before authorization keep the request flow explicit.",
});
