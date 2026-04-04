import { logger } from "./shared/logger.js";
import { rateLimitAwarenessMiddleware } from "./shared/middleware-factories.js";
import {
  createRequestContext,
  MiddlewareError,
  runMiddlewareStack,
} from "./shared/middleware-runtime.js";

const middleware = rateLimitAwarenessMiddleware(2);

for (let attempt = 1; attempt <= 3; attempt += 1) {
  try {
    await runMiddlewareStack(
      [
        middleware,
        async (_request, response) => {
          response.body = {
            accepted: true,
          };
        },
      ],
      createRequestContext({
        headers: {
          "x-client-id": "client-123",
        },
      }),
    );

    logger.info("Rate-limit example request accepted", {
      attempt,
    });
  } catch (error) {
    if (error instanceof MiddlewareError) {
      logger.warn("Rate-limit example request blocked", {
        attempt,
        code: error.code,
        message: error.message,
      });
    }
  }
}
