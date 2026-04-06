import { createLogger } from "./shared/logger";

const logger = createLogger("secret-classification");

logger.info("secret_examples", {
  secrets: ["database password", "JWT signing key", "cloud access token", "SMTP credential"],
  nonSecrets: ["port number", "log level", "feature flag default"],
});
