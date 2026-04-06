import { type Logger } from "./logger";

interface RetryOptions {
  readonly maxAttempts: number;
  readonly baseDelayMs: number;
  readonly logger: Logger;
  readonly shouldRetry: (error: unknown) => boolean;
}

export function computeBackoffDelay(attempt: number, baseDelayMs: number): number {
  const exponentialDelay = baseDelayMs * 2 ** (attempt - 1);
  const jitter = Math.floor(Math.random() * baseDelayMs);
  return exponentialDelay + jitter;
}

export async function retry<TResult>(
  operation: () => Promise<TResult>,
  options: RetryOptions,
): Promise<TResult> {
  let attempt = 0;

  while (true) {
    attempt += 1;

    try {
      return await operation();
    } catch (error) {
      const retryable = options.shouldRetry(error);

      options.logger.info("retry_attempt_failed", {
        attempt,
        retryable,
        message: error instanceof Error ? error.message : "unknown error",
      });

      if (!retryable || attempt >= options.maxAttempts) {
        throw error;
      }

      const delayMs = computeBackoffDelay(attempt, options.baseDelayMs);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}
