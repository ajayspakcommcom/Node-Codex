import { FilesystemWorkloadAnalyzer } from "./module/analysis/filesystem-workload-analyzer.js";
import { logger } from "./shared/logger.js";

async function main(): Promise<void> {
  const analyzer = new FilesystemWorkloadAnalyzer();
  const result = await analyzer.runReads(3);

  logger.info("Filesystem worker pool awareness", {
    readCount: result.readCount,
    durationsMs: result.durationsMs,
    averageMs: result.averageMs,
    takeaway: "filesystem operations can consume shared worker resources under load.",
  });
}

void main();
