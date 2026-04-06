import { createLogger } from "./shared/logger";

const logger = createLogger("workload-identity");

logger.info("workload_identity_preference", {
  preferred: "service authenticates as workload and receives scoped credentials dynamically",
  avoided: "long-lived static credentials copied into runtime environments",
});
