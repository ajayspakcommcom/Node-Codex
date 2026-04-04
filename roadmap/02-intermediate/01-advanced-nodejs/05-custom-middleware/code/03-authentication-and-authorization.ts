import { logger } from "./shared/logger.js";
import {
  authenticationMiddleware,
  requireRoleMiddleware,
} from "./shared/middleware-factories.js";
import {
  createRequestContext,
  MiddlewareError,
  runMiddlewareStack,
} from "./shared/middleware-runtime.js";

const request = createRequestContext({
  headers: {
    authorization: "admin-token",
  },
});

try {
  const response = await runMiddlewareStack(
    [
      authenticationMiddleware(),
      requireRoleMiddleware("admin"),
      async (currentRequest, currentResponse) => {
        currentResponse.body = {
          userId: currentRequest.auth?.userId,
          role: currentRequest.auth?.role,
        };
      },
    ],
    request,
  );

  logger.info("Authentication and authorization middleware example", {
    responseBody: response.body,
  });
} catch (error) {
  if (error instanceof MiddlewareError) {
    logger.error("Auth middleware failed", {
      statusCode: error.statusCode,
      code: error.code,
      message: error.message,
    });
  }
}
