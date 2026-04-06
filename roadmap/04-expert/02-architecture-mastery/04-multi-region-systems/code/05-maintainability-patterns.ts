import { createLogger } from "./shared/logger.js";

const logger = createLogger("multi-region");

logger.info("multi_region_policy_defined", {
  policy: {
    residencyRulesExplicit: true,
    failoverRequiresDocumentedPolicy: true,
    trafficRoutingOwnedByControlPlane: true,
  },
});
