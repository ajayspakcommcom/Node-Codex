import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

import { logger } from "../logger";

export function requestContextMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const requestId = randomUUID();
  request.requestId = requestId;

  response.setHeader("x-request-id", requestId);

  logger.info("Incoming request", {
    method: request.method,
    path: request.path,
    requestId,
  });

  next();
}
