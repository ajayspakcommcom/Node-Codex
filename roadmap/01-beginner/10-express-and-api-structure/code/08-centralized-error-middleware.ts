import { AppError, ValidationError } from "./shared/errors.js";

function errorMiddleware(error: unknown) {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      body: {
        error: {
          code: error.code,
          message: error.message,
        },
      },
    } as const;
  }

  return {
    statusCode: 500,
    body: {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "unexpected server error",
      },
    },
  } as const;
}

console.log(errorMiddleware(new ValidationError("itemId is required")));
