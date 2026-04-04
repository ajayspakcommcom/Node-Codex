import type { ApiErrorBody, ApiSuccessBody, HttpResponse } from "./http-types.js";

export function ok<TData>(
  data: TData,
  meta?: Readonly<Record<string, unknown>>,
): HttpResponse<ApiSuccessBody<TData>> {
  return {
    statusCode: 200,
    body: {
      data,
      ...(meta ? { meta } : {}),
    },
  };
}

export function created<TData>(data: TData): HttpResponse<ApiSuccessBody<TData>> {
  return {
    statusCode: 201,
    body: {
      data,
    },
  };
}

export function failure(statusCode: number, code: string, message: string): HttpResponse<ApiErrorBody> {
  return {
    statusCode,
    body: {
      error: {
        code,
        message,
      },
    },
  };
}
