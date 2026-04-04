import { AppError } from "./errors.js";

export interface ClientErrorResponse {
  readonly error: {
    readonly code: string;
    readonly message: string;
  };
}

export function toClientErrorResponse(error: unknown): ClientErrorResponse {
  if (error instanceof AppError) {
    return {
      error: {
        code: error.code,
        message: error.message,
      },
    };
  }

  return {
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
  };
}
