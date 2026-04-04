import { logger } from "./shared/logger.js";
import type { Middleware } from "./shared/middleware-runtime.js";
import { createRequestContext, runMiddlewareStack } from "./shared/middleware-runtime.js";

const badBusinessMiddleware: Middleware = async (request, _response, next) => {
  request.locals.discountPercent = request.body.total && Number(request.body.total) > 10_000 ? 20 : 5;
  await next();
};

const correctedControllerFlow: Middleware = async (request, response) => {
  const total = Number(request.body.total ?? 0);
  const discountPercent = total > 10_000 ? 20 : 5;
  response.body = {
    discountPercent,
  };
};

await runMiddlewareStack(
  [
    badBusinessMiddleware,
    async (request, response) => {
      response.body = {
        hiddenDiscountPercent: request.locals.discountPercent,
      };
    },
  ],
  createRequestContext({
    body: {
      total: 12_500,
    },
  }),
);

const correctedResponse = await runMiddlewareStack(
  [correctedControllerFlow],
  createRequestContext({
    body: {
      total: 12_500,
    },
  }),
);

logger.warn("Hidden business logic middleware mistake", {
  correctedResponse: correctedResponse.body,
  guidance: "Business rules should remain in explicit service or controller flow, not hidden inside middleware.",
});
