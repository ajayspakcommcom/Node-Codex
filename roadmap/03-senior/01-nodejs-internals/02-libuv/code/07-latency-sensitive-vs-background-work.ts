import { ThreadPoolContentionAnalyzer } from "./module/analysis/thread-pool-contention-analyzer.js";
import { LookupAnalyzer } from "./module/analysis/lookup-analyzer.js";
import { logger } from "./shared/logger.js";

async function main(): Promise<void> {
  const contentionAnalyzer = new ThreadPoolContentionAnalyzer();
  const lookupAnalyzer = new LookupAnalyzer();

  const backgroundBatch = contentionAnalyzer.runBatch(["bg-1", "bg-2", "bg-3", "bg-4"]);
  const lookup = await lookupAnalyzer.resolve(["localhost"]);
  const batchResult = await backgroundBatch;

  logger.warn("Latency sensitive vs background work", {
    lookup,
    backgroundBatchElapsedMs: batchResult.totalElapsedMs,
    takeaway: "background runtime work can compete with latency sensitive operations if not isolated.",
  });
}

void main();
