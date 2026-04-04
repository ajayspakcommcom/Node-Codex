import { logger } from "./shared/logger.js";
import {
  authenticationMiddleware,
  requestIdMiddleware,
  requestLoggingMiddleware,
  requireBodyFieldsMiddleware,
  responseEnvelopeMiddleware,
} from "./shared/middleware-factories.js";
import { createRequestContext, runMiddlewareStack } from "./shared/middleware-runtime.js";

class TaskRouteBoundary {
  public readonly middlewares = [
    requestIdMiddleware(),
    requestLoggingMiddleware(),
    authenticationMiddleware(),
    requireBodyFieldsMiddleware(["title", "description"]),
    responseEnvelopeMiddleware(),
  ] as const;
}

const boundary = new TaskRouteBoundary();

const response = await runMiddlewareStack(
  [
    ...boundary.middlewares,
    async (_request, currentResponse) => {
      currentResponse.body = {
        taskId: "task_123",
      };
    },
  ],
  createRequestContext({
    method: "POST",
    path: "/tasks",
    headers: {
      authorization: "user-token",
    },
    body: {
      title: "Write middleware guide",
      description: "Document explicit middleware boundaries.",
    },
  }),
);

logger.info("Maintainable middleware boundary example", {
  responseBody: response.body,
  rule: "Keep reusable middleware composition close to route boundaries and make the order obvious.",
});
