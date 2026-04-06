import { createLogger } from "./shared/logger.js";

const logger = createLogger("multi-region");

logger.info("failover_policy_example", {
  policy: {
    strategy: "active-passive",
    failoverNeedsHealthyTarget: true,
    autoFailback: false,
  },
});
