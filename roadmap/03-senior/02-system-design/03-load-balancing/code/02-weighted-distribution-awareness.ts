import { LoadBalancerService } from "./module/services/load-balancer-service.js";
import { backendNodes, requestBurst } from "./shared/load-balancing-runtime.js";
import { logger } from "./shared/logger.js";

const service = new LoadBalancerService();

logger.section("Weighted Distribution Awareness");
for (const request of requestBurst) {
  const node = service.weighted(backendNodes, request);
  logger.line(`${request.requestId} -> ${node.id} (weight=${node.weight})`);
}
