import { logger } from "./shared/logger.js";

const maintainabilityPatterns = [
  "Define the actors and trust boundary before choosing a flow.",
  "Keep scopes narrow and document what each scope allows.",
  "Treat redirect validation and token exchange as security-critical code paths.",
  "Separate user-delegated access from service-to-service authorization.",
  "Document token audience and lifetime for each resource server.",
  "Explain where OAuth2 stops and where authentication or identity concerns begin.",
];

logger.info("Maintainability patterns for OAuth2", {
  maintainabilityPatterns,
  guidance: "Enterprise OAuth2 stays maintainable when scopes, flows, and actor boundaries remain explicit and reviewable.",
});
