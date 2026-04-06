import { ThreadPoolContentionAnalyzer } from "./module/analysis/thread-pool-contention-analyzer.js";
import { logger } from "./shared/logger.js";

async function main(): Promise<void> {
  const analyzer = new ThreadPoolContentionAnalyzer();
  const batch = await analyzer.runBatch([
    "hash-1",
    "hash-2",
    "hash-3",
    "hash-4",
    "hash-5",
    "hash-6",
  ]);

  logger.warn("Thread pool contention", {
    taskCount: batch.taskCount,
    totalElapsedMs: batch.totalElapsedMs,
    maxTaskDurationMs: batch.maxTaskDurationMs,
    taskDurations: batch.tasks,
  });
}

void main();
