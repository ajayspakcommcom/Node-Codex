import { BusinessRuleError, ValidationError } from "./shared/errors.js";
import { toClientErrorResponse } from "./shared/error-formatting.js";

function normalizeError(error: unknown): {
  readonly type: string;
  readonly response: ReturnType<typeof toClientErrorResponse>;
} {
  if (error instanceof ValidationError) {
    return {
      type: "validation",
      response: toClientErrorResponse(error),
    };
  }

  if (error instanceof BusinessRuleError) {
    return {
      type: "domain",
      response: toClientErrorResponse(error),
    };
  }

  return {
    type: "unexpected",
    response: toClientErrorResponse(error),
  };
}

console.log(normalizeError(new ValidationError("email is required")));
console.log(normalizeError(new BusinessRuleError("Order already paid")));
