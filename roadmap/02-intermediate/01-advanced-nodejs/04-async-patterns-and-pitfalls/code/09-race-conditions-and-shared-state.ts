import { delay } from "./shared/async-helpers.js";
import { logger } from "./shared/logger.js";

let unsafeCounter = 0;

async function incrementUnsafely(): Promise<void> {
  const localValue = unsafeCounter;
  await delay(10);
  unsafeCounter = localValue + 1;
}

async function run(): Promise<void> {
  await Promise.all([incrementUnsafely(), incrementUnsafely(), incrementUnsafely()]);

  logger.warn("Race condition example", {
    unsafeCounter,
    guidance:
      "Shared mutable state can be updated in unsafe order across concurrent async flows. Prefer isolated state or explicit coordination.",
  });
}

void run();
