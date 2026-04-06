import { createLogger } from "./shared/logger";

const logger = createLogger("csrf-threat-model");

logger.info("csrf_applies", {
  case: "browser sends session cookie automatically on state-changing request",
  risk: "cross-site form or request can trigger an action without user intent",
});

logger.info("csrf_less_relevant", {
  case: "pure token API with token not auto-attached by browser",
  risk: "reduced, but browser-facing flows still need boundary review",
});
