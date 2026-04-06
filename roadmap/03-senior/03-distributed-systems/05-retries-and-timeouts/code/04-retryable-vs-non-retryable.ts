import { createLogger } from "./shared/logger";

const logger = createLogger("retryability");

function isRetryable(statusCode: number): boolean {
  return statusCode >= 500 || statusCode === 429 || statusCode === 408;
}

logger.info("retryable_examples", {
  statusCodes: [500, 503, 429, 408],
  result: isRetryable(503),
});

logger.info("non_retryable_examples", {
  statusCodes: [400, 401, 403, 404, 422],
  result: isRetryable(404),
});
