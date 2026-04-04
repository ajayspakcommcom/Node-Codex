import { createLogger } from "./shared/logger.js";
import { nowMs, wait } from "./shared/timing.js";

const logger = createLogger("debug-example");

async function main(): Promise<void> {
  const start = nowMs();

  logger.info("sync-start", { atMs: nowMs() - start });

  Promise.resolve().then(() => {
    logger.info("promise-microtask", { atMs: nowMs() - start });
  });

  setTimeout(() => {
    logger.info("timer-callback", { atMs: nowMs() - start });
  }, 0);

  await wait(10);

  logger.info("after-await", { atMs: nowMs() - start });
}

void main();
