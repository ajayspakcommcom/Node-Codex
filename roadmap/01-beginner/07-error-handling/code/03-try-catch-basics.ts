import { createLogger } from "./shared/logger.js";
import { ValidationError } from "./shared/errors.js";

const logger = createLogger("try-catch-basics");

function validateInput(email: string): void {
  if (email.trim() === "") {
    throw new ValidationError("Email cannot be empty");
  }
}

try {
  validateInput("");
} catch (error: unknown) {
  if (error instanceof ValidationError) {
    logger.error("Caught validation failure with useful handling", {
      code: error.code,
      statusCode: error.statusCode,
    });
  }
}
