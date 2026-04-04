import { toClientErrorResponse } from "./shared/error-formatting.js";
import { ValidationError } from "./shared/errors.js";

function formatErrorForApi(error: unknown): {
  readonly statusCode: number;
  readonly body: ReturnType<typeof toClientErrorResponse>;
} {
  if (error instanceof ValidationError) {
    return {
      statusCode: error.statusCode,
      body: toClientErrorResponse(error),
    };
  }

  return {
    statusCode: 500,
    body: toClientErrorResponse(error),
  };
}

const response = formatErrorForApi(new ValidationError("email is required"));
console.log("Centralized API error handling result:", response);
