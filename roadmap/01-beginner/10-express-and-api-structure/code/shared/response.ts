import type { ResponseLike } from "./express-like.js";

export function ok<T>(body: T): ResponseLike<T> {
  return {
    statusCode: 200,
    body,
  };
}

export function created<T>(body: T): ResponseLike<T> {
  return {
    statusCode: 201,
    body,
  };
}
