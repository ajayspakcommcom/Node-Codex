import { logger } from "./shared/logger.js";
import { asyncErrorBoundary } from "./shared/middleware-factories.js";
import {
  createRequestContext,
  MiddlewareError,
  runMiddlewareStack,
} from "./shared/middleware-runtime.js";

try {
  await runMiddlewareStack(
    [
      asyncErrorBoundary(async () => {
        throw new MiddlewareError(503, "DEPENDENCY_TIMEOUT", "Dependency timed out inside async middleware.");
      }),
      async (_request, response) => {
        response.body = {
          unreachable: true,
        };
      },
    ],
    createRequestContext(),
  );
} catch (error) {
  if (error instanceof MiddlewareError) {
    logger.error("Async middleware error propagated correctly", {
      statusCode: error.statusCode,
      code: error.code,
      message: error.message,
    });
  }
}
