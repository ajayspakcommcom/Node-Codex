import { GatewayBottleneckAnalyzer } from "./module/analysis/gateway-bottleneck-analyzer.js";
import { platformOwnershipProfile } from "./shared/gateway-runtime.js";
import { logger } from "./shared/logger.js";

const analyzer = new GatewayBottleneckAnalyzer();

logger.section("Platform Ownership Model");
for (const line of analyzer.analyzeOwnership(platformOwnershipProfile)) {
  logger.line(`- ${line}`);
}
