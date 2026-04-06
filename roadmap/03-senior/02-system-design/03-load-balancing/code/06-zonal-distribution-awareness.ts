import { DistributionAnalyzer } from "./module/analysis/distribution-analyzer.js";
import { backendNodes } from "./shared/load-balancing-runtime.js";
import { logger } from "./shared/logger.js";

const analyzer = new DistributionAnalyzer();

logger.section("Zonal Distribution Awareness");
for (const line of analyzer.summarizeZones(backendNodes)) {
  logger.line(`- ${line}`);
}
logger.line("Senior rule: traffic policy should respect failure domains rather than treating all nodes as identical.");
