import { DistributedArchitectureService } from "./module/services/distributed-architecture-service.js";
import {
  microserviceProfile,
  monolithProfile,
} from "./shared/architecture-runtime.js";
import { logger } from "./shared/logger.js";

const service = new DistributedArchitectureService();

logger.section("Operational Overhead Comparison");
for (const line of service.compareOperationalCost(monolithProfile, microserviceProfile)) {
  logger.line(`- ${line}`);
}
