import { ThreadPoolContentionAnalyzer } from "./module/analysis/thread-pool-contention-analyzer.js";
import { logger } from "./shared/logger.js";

async function main(): Promise<void> {
  const analyzer = new ThreadPoolContentionAnalyzer();
  const smallBatch = await analyzer.runBatch(["a", "b"]);
  const largerBatch = await analyzer.runBatch(["a", "b", "c", "d", "e", "f"]);

  logger.warn("Crypto thread pool contention", {
    smallBatchElapsedMs: smallBatch.totalElapsedMs,
    largerBatchElapsedMs: largerBatch.totalElapsedMs,
    takeaway: "more concurrent crypto work can increase queueing and completion time.",
  });
}

void main();
