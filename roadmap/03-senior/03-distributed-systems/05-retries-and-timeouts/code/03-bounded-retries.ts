import { createLogger } from "./shared/logger";
import { retry } from "./shared/retry";

const logger = createLogger("bounded-retries");

let attempts = 0;

async function main(): Promise<void> {
  const result = await retry(
    async () => {
      attempts += 1;

      if (attempts < 3) {
        throw new Error("transient failure");
      }

      return "recovered";
    },
    {
      maxAttempts: 3,
      baseDelayMs: 50,
      logger,
      shouldRetry: () => true,
    },
  );

  logger.info("retry_result", { attempts, result });
}

void main();
