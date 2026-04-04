import { logger } from "./shared/logger.js";
import {
  requestIdMiddleware,
  requestLoggingMiddleware,
} from "./shared/middleware-factories.js";
import { createRequestContext, runMiddlewareStack } from "./shared/middleware-runtime.js";

const request = createRequestContext({
  method: "POST",
  path: "/orders",
});

const response = await runMiddlewareStack(
  [
    requestIdMiddleware(),
    requestLoggingMiddleware(),
    async (currentRequest, currentResponse) => {
      currentResponse.body = {
        requestId: currentRequest.requestId,
      };
    },
  ],
  request,
);

logger.info("Request-id middleware example", {
  responseBody: response.body,
});
