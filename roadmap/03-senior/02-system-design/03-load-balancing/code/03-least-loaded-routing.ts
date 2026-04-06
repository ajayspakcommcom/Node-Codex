import { LoadBalancerService } from "./module/services/load-balancer-service.js";
import { backendNodes, requestBurst } from "./shared/load-balancing-runtime.js";
import { logger } from "./shared/logger.js";

const service = new LoadBalancerService();

logger.section("Least Loaded Routing");
for (const request of requestBurst) {
  const node = service.leastLoaded(backendNodes, request);
  logger.line(
    `${request.requestId} -> ${node.id} (connections=${node.activeConnections}, sessionLoad=${node.sessionLoad})`,
  );
}
