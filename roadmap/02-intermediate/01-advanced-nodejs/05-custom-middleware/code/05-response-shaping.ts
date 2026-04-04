import { logger } from "./shared/logger.js";
import { requestIdMiddleware, responseEnvelopeMiddleware } from "./shared/middleware-factories.js";
import { createRequestContext, runMiddlewareStack } from "./shared/middleware-runtime.js";

const request = createRequestContext();

const response = await runMiddlewareStack(
  [
    requestIdMiddleware(),
    responseEnvelopeMiddleware(),
    async (_request, currentResponse) => {
      currentResponse.body = {
        itemCount: 3,
      };
    },
  ],
  request,
);

logger.info("Response shaping middleware example", {
  responseBody: response.body,
});
