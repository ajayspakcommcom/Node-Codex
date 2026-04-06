import { createLogger } from "./shared/logger";

const logger = createLogger("token-shape");

logger.info("self_contained_token", {
  tradeoff: "fast local validation but revocation visibility can be harder",
});

logger.info("introspected_token", {
  tradeoff: "centralized control and revocation checks but added dependency on auth service availability",
});
