import { LoadBalancerService } from "./module/services/load-balancer-service.js";
import { backendNodes, requestBurst } from "./shared/load-balancing-runtime.js";
import { logger } from "./shared/logger.js";

const service = new LoadBalancerService();

logger.section("Round Robin Baseline");
for (const request of requestBurst) {
  const node = service.roundRobin(backendNodes, request);
  logger.line(`${request.requestId} -> ${node.id}`);
}
