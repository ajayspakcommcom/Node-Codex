import { fetchDependency } from "./shared/fake-clients.js";
import { logger } from "./shared/logger.js";
import { runWithConcurrencyLimit } from "./shared/async-helpers.js";

const itemIds = Array.from({ length: 8 }, (_unused, index) => `job-${index + 1}`);

async function run(): Promise<void> {
  const results = await runWithConcurrencyLimit(itemIds, 3, async (jobId) => {
    logger.info("Starting bounded async job", {
      jobId,
    });

    return fetchDependency(jobId, 40);
  });

  logger.info("Controlled concurrency completed", {
    totalResults: results.length,
    guidance: "Limit parallelism when downstream systems or memory would be stressed by unbounded task spawning.",
  });
}

void run();
