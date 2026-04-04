import { randomUUID } from "node:crypto";

import { logger } from "./logger.js";
import type { Middleware, RequestContext } from "./middleware-runtime.js";
import { MiddlewareError } from "./middleware-runtime.js";

export function requestIdMiddleware(): Middleware {
  return async (request, _response, next) => {
    request.requestId = randomUUID();
    await next();
  };
}

export function requestLoggingMiddleware(): Middleware {
  return async (request, _response, next) => {
    logger.info("Request received", {
      requestId: request.requestId,
      method: request.method,
      path: request.path,
    });
    await next();
  };
}

export function authenticationMiddleware(): Middleware {
  return async (request, _response, next) => {
    const token = request.headers.authorization;

    if (!token) {
      throw new MiddlewareError(401, "AUTHENTICATION_ERROR", "Missing authorization header.");
    }

    request.auth = {
      userId: "user_123",
      role: token === "admin-token" ? "admin" : "user",
    };

    await next();
  };
}

export function requireRoleMiddleware(role: "admin" | "user"): Middleware {
  return async (request, _response, next) => {
    if (!request.auth) {
      throw new MiddlewareError(401, "AUTHENTICATION_ERROR", "Authentication is required.");
    }

    if (request.auth.role !== role) {
      throw new MiddlewareError(403, "AUTHORIZATION_ERROR", "You are not allowed to access this route.");
    }

    await next();
  };
}

export function requireBodyFieldsMiddleware(fields: readonly string[]): Middleware {
  return async (request, _response, next) => {
    for (const field of fields) {
      if (request.body[field] === undefined) {
        throw new MiddlewareError(400, "VALIDATION_ERROR", `Missing required field: ${field}`);
      }
    }

    await next();
  };
}

export function responseEnvelopeMiddleware(): Middleware {
  return async (request, response, next) => {
    await next();

    if (response.finished) {
      return;
    }

    response.body = {
      success: true,
      requestId: request.requestId,
      data: response.body,
    };
  };
}

export function configDrivenHeaderMiddleware(config: {
  readonly headerName: string;
  readonly headerValue: string;
}): Middleware {
  return async (_request, response, next) => {
    response.headers[config.headerName] = config.headerValue;
    await next();
  };
}

export function asyncErrorBoundary(handler: (request: RequestContext) => Promise<void>): Middleware {
  return async (request, _response, next) => {
    await handler(request);
    await next();
  };
}

export function rateLimitAwarenessMiddleware(limitPerWindow: number): Middleware {
  const requestCounts = new Map<string, number>();

  return async (request, _response, next) => {
    const clientKey = request.headers["x-client-id"] ?? "anonymous";
    const nextCount = (requestCounts.get(clientKey) ?? 0) + 1;
    requestCounts.set(clientKey, nextCount);

    if (nextCount > limitPerWindow) {
      throw new MiddlewareError(429, "RATE_LIMITED", "Too many requests for the configured window.");
    }

    await next();
  };
}
