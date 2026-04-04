import { fetchDependency } from "./shared/fake-clients.js";
import { logger } from "./shared/logger.js";

const recordIds = Array.from({ length: 9 }, (_unused, index) => `record-${index + 1}`);

async function processBatch(batch: readonly string[]): Promise<void> {
  await Promise.all(batch.map((recordId) => fetchDependency(recordId, 30)));
}

async function run(): Promise<void> {
  const batchSize = 3;

  for (let index = 0; index < recordIds.length; index += batchSize) {
    const batch = recordIds.slice(index, index + batchSize);
    await processBatch(batch);

    logger.info("Processed bounded batch", {
      batch,
    });
  }

  logger.info("Batching example completed", {
    totalRecords: recordIds.length,
    guidance: "Batching reduces spikes against downstream systems compared with unbounded parallel calls.",
  });
}

void run();
