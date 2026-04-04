import { fetchDependency } from "./shared/fake-clients.js";
import { logger } from "./shared/logger.js";

function badFireAndForget(): void {
  void fetchDependency("unobserved-job", 30, true);

  logger.warn("Fire-and-forget example", {
    guidance: "Starting async work without observation can hide failures and confuse system state.",
  });
}

async function observedBackgroundWork(): Promise<void> {
  try {
    await fetchDependency("observed-background-job", 30);
    logger.info("Observed background work succeeded", {
      job: "observed-background-job",
    });
  } catch (error) {
    logger.error("Observed background work failed", {
      error,
    });
  }
}

badFireAndForget();
void observedBackgroundWork();
