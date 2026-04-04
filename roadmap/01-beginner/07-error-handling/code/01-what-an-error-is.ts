import { createLogger } from "./shared/logger.js";

const logger = createLogger("what-an-error-is");

function ensurePositiveAmount(amount: number): void {
  if (amount <= 0) {
    throw new Error("Amount must be positive");
  }
}

try {
  ensurePositiveAmount(-10);
} catch (error: unknown) {
  if (error instanceof Error) {
    logger.error("Operation could not continue normally", {
      message: error.message,
    });
  }
}
