import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";

export function validateBody(schema: ZodTypeAny) {
  return (request: Request, _response: Response, next: NextFunction): void => {
    request.body = schema.parse(request.body);
    next();
  };
}

export function validateParams(schema: ZodTypeAny) {
  return (request: Request, _response: Response, next: NextFunction): void => {
    request.params = schema.parse(request.params);
    next();
  };
}

export function validateQuery(schema: ZodTypeAny) {
  return (request: Request, _response: Response, next: NextFunction): void => {
    request.query = schema.parse(request.query);
    next();
  };
}
