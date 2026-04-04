import { logger } from "./shared/logger.js";
import {
  createRequestContext,
  type Middleware,
  runMiddlewareStack,
} from "./shared/middleware-runtime.js";

const firstMiddleware: Middleware = async (request, _response, next) => {
  request.locals.sequence = ["first"];
  await next();
  (request.locals.sequence as string[]).push("first:after");
};

const secondMiddleware: Middleware = async (request, response, next) => {
  (request.locals.sequence as string[]).push("second");
  await next();
  response.body = request.locals.sequence;
};

const terminalMiddleware: Middleware = async (request, response) => {
  (request.locals.sequence as string[]).push("terminal");
  response.body = request.locals.sequence;
};

const request = createRequestContext();
const response = await runMiddlewareStack([firstMiddleware, secondMiddleware, terminalMiddleware], request);

logger.info("Middleware lifecycle example", {
  responseBody: response.body,
  guidance: "Middleware order and next-flow shape the observable request lifecycle.",
});
