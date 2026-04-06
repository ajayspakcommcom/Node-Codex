import { ReplicaRoutingService } from "./module/services/replica-routing-service.js";
import { replicas } from "./shared/horizontal-scaling-runtime.js";
import { logger } from "./shared/logger.js";

const service = new ReplicaRoutingService();
const chosen = service.chooseStatelessReplica(replicas);

logger.section("Stateless Replica Baseline");
logger.line(`Preferred stateless replica: ${chosen.id}`);
logger.line("Senior rule: request-serving layers scale best when they can be replaced without session loss.");
