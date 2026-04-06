import { DistributionAnalyzer } from "./module/analysis/distribution-analyzer.js";
import { LoadBalancerService } from "./module/services/load-balancer-service.js";
import { backendNodes, requestBurst } from "./shared/load-balancing-runtime.js";
import { logger } from "./shared/logger.js";

const balancer = new LoadBalancerService();
const analyzer = new DistributionAnalyzer();

const assignments = requestBurst.map((request) => ({
  request,
  node: balancer.roundRobin(backendNodes, request),
}));

logger.section("Uneven Workload Hotspot Risk");
const snapshot = analyzer.buildSnapshot(assignments);
logger.json("Distribution snapshot", snapshot);
