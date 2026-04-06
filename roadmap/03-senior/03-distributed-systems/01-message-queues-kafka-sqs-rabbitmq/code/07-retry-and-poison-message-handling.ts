import { createLogger } from "./shared/logger";

const logger = createLogger("retry-handler");

interface RetryDecision {
  readonly shouldRetry: boolean;
  readonly sendToDeadLetterQueue: boolean;
}

function decideRetry(receiveCount: number, isValidationFailure: boolean): RetryDecision {
  if (isValidationFailure) {
    return {
      shouldRetry: false,
      sendToDeadLetterQueue: true,
    };
  }

  if (receiveCount >= 5) {
    return {
      shouldRetry: false,
      sendToDeadLetterQueue: true,
    };
  }

  return {
    shouldRetry: true,
    sendToDeadLetterQueue: false,
  };
}

logger.info("retry_policy_example", decideRetry(2, false));
logger.info("poison_message_example", decideRetry(1, true));
