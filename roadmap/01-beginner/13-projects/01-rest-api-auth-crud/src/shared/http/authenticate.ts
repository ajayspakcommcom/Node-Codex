import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../../config/env";
import { AuthenticationError } from "../errors/app-error";

interface TokenPayload {
  readonly sub: string;
  readonly email: string;
}

export function authenticate(request: Request, _response: Response, next: NextFunction): void {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader?.startsWith("Bearer ")) {
    next(new AuthenticationError("Missing or invalid authorization header."));
    return;
  }

  const token = authorizationHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, env.jwtSecret) as TokenPayload;
    request.auth = {
      userId: payload.sub,
      email: payload.email,
    };
    next();
  } catch {
    next(new AuthenticationError("Invalid or expired token."));
  }
}
