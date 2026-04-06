import { GatewayBottleneckAnalyzer } from "./module/analysis/gateway-bottleneck-analyzer.js";
import { RequestAggregationService } from "./module/services/request-aggregation-service.js";
import { checkoutDownstreams } from "./shared/gateway-runtime.js";
import { logger } from "./shared/logger.js";

const service = new RequestAggregationService();
const analyzer = new GatewayBottleneckAnalyzer();

logger.section("Request Aggregation Tradeoff");
const estimate = service.estimateUserLatency(checkoutDownstreams);
logger.line(`Estimated gateway-side p95 latency: ${estimate.estimatedP95LatencyMs}ms`);
logger.line(`Warning: ${estimate.warning}`);
for (const line of analyzer.analyzeAggregation(checkoutDownstreams)) {
  logger.line(`- ${line}`);
}
