import { LookupAnalyzer } from "./module/analysis/lookup-analyzer.js";
import { logger } from "./shared/logger.js";

async function main(): Promise<void> {
  const analyzer = new LookupAnalyzer();
  const lookups = await analyzer.resolve(["localhost", "localhost"]);

  logger.info("DNS lookup awareness", {
    lookups,
    takeaway: "name resolution can be part of the runtime cost path, not just network latency.",
  });
}

void main();
