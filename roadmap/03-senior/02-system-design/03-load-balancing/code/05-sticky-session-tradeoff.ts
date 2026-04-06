import { SessionAffinityService } from "./module/services/session-affinity-service.js";
import { backendNodes, requestBurst } from "./shared/load-balancing-runtime.js";
import { logger } from "./shared/logger.js";

const service = new SessionAffinityService();

logger.section("Sticky Session Tradeoff");
for (const request of requestBurst) {
  const result = service.routeWithAffinity(backendNodes, request);
  logger.line(
    `${request.requestId} -> ${result.node.id} affinityReused=${String(result.reusedAffinity)}`,
  );
}
logger.line("Senior rule: affinity can simplify stateful flows, but it reduces balancing flexibility and failover freedom.");
