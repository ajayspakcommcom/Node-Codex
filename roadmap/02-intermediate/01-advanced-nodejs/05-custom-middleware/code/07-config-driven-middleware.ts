import { logger } from "./shared/logger.js";
import { configDrivenHeaderMiddleware } from "./shared/middleware-factories.js";
import { createRequestContext, runMiddlewareStack } from "./shared/middleware-runtime.js";

const response = await runMiddlewareStack(
  [
    configDrivenHeaderMiddleware({
      headerName: "x-service-mode",
      headerValue: "intermediate-roadmap",
    }),
    async (_request, currentResponse) => {
      currentResponse.body = {
        ok: true,
      };
    },
  ],
  createRequestContext(),
);

logger.info("Config-driven middleware example", {
  headers: response.headers,
});
