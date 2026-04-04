import { logger } from "./shared/logger.js";
import { requireBodyFieldsMiddleware } from "./shared/middleware-factories.js";
import {
  createRequestContext,
  MiddlewareError,
  runMiddlewareStack,
} from "./shared/middleware-runtime.js";

const request = createRequestContext({
  method: "POST",
  path: "/tasks",
  body: {
    title: "Build middleware examples",
  },
});

try {
  await runMiddlewareStack(
    [
      requireBodyFieldsMiddleware(["title", "description"]),
      async (_request, response) => {
        response.body = {
          accepted: true,
        };
      },
    ],
    request,
  );
} catch (error) {
  if (error instanceof MiddlewareError) {
    logger.warn("Validation middleware blocked request", {
      statusCode: error.statusCode,
      code: error.code,
      message: error.message,
    });
  }
}
