import { logger } from "./shared/logger.js";

const maintainabilityPatterns = [
  "Keep access tokens short-lived and refresh tokens tightly controlled.",
  "Rotate refresh tokens when the session design requires stronger protection.",
  "Track refresh-token lifecycle at the session-family level.",
  "Design replay and reuse detection before production rollout.",
  "Treat refresh-token storage and transport as high-sensitivity concerns.",
  "Document logout, revocation, and compromise-response behavior clearly.",
];

logger.info("Maintainability patterns for refresh tokens", {
  maintainabilityPatterns,
  guidance: "Enterprise refresh-token systems stay maintainable when rotation, replay handling, and session revocation rules remain explicit and consistent.",
});
