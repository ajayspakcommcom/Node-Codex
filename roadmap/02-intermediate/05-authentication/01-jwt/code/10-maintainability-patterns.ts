import { logger } from "./shared/logger.js";

const maintainabilityPatterns = [
  "Keep access tokens short-lived and claims minimal.",
  "Validate signature, issuer, audience, and expiry consistently everywhere a JWT is trusted.",
  "Separate authentication identity from authorization policy decisions.",
  "Design key rotation and compromise response early instead of patching them in later.",
  "Document the token contract so multiple services enforce the same rules.",
  "Treat revocation limits as an architectural constraint, not as a surprising edge case.",
];

logger.info("Maintainability patterns for JWTs", {
  maintainabilityPatterns,
  guidance: "Enterprise JWT usage stays maintainable when token scope, verification policy, and operational controls remain explicit and consistent.",
});
