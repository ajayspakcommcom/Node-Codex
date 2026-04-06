import { DistributionAnalyzer } from "./module/analysis/distribution-analyzer.js";
import { FailoverAnalyzer } from "./module/analysis/failover-analyzer.js";
import { HealthCheckService } from "./module/services/health-check-service.js";
import { backendNodes } from "./shared/load-balancing-runtime.js";
import { logger } from "./shared/logger.js";

const healthChecks = new HealthCheckService();
const failover = new FailoverAnalyzer();
const distribution = new DistributionAnalyzer();

logger.section("Health Check And Failover");
const results = healthChecks.run(backendNodes);
for (const result of results) {
  logger.line(`${result.nodeId}: healthy=${String(result.healthy)} reason=${result.reason}`);
}
for (const line of failover.summarize(results, backendNodes)) {
  logger.line(`- ${line}`);
}
for (const line of distribution.summarizeZones(backendNodes)) {
  logger.line(`- ${line}`);
}
