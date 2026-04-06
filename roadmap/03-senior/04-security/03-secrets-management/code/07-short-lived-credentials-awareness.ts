import { createLogger } from "./shared/logger";

const logger = createLogger("short-lived-creds");

logger.info("short_lived_preference", {
  staticSecret: "higher long-term blast radius",
  shortLivedCredential: "lower exposure window and easier revocation posture",
});
