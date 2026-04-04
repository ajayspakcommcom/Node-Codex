import { logger } from "./shared/logger.js";
import { retry } from "./shared/async-helpers.js";
import { transientDependencyCall } from "./shared/fake-clients.js";

async function run(): Promise<void> {
  let attempt = 0;

  const result = await retry(async () => {
    attempt += 1;
    return transientDependencyCall("billing-sync", 3, attempt);
  }, 4, 20);

  logger.info("Retry example succeeded", {
    finalAttempt: attempt,
    result,
    guidance: "Retries should be limited and used only for transient failures or idempotent work.",
  });
}

void run();
