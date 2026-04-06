import { createLogger } from "./shared/logger";

const logger = createLogger("revocation");

logger.info("revocation_workflow", {
  trigger: "credential exposure detected",
  actions: [
    "disable compromised credential",
    "rotate replacement secret",
    "redeploy or refresh consumers",
    "review access logs",
  ],
});
