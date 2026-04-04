import { fetchDependency } from "./shared/fake-clients.js";
import { logger } from "./shared/logger.js";
import { withTimeout } from "./shared/async-helpers.js";

async function run(): Promise<void> {
  try {
    const result = await withTimeout(
      (signal) => fetchDependency("slow-report", 200, false, signal),
      50,
    );

    logger.info("Operation finished in time", {
      result,
    });
  } catch (error) {
    logger.warn("Timed operation did not complete", {
      error,
      guidance: "Timeout is most useful when paired with cancellation-aware underlying work.",
    });
  }
}

void run();
