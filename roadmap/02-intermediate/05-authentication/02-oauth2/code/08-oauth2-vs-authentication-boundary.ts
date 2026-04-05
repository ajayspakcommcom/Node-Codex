import { logger } from "./shared/logger.js";

const oauth2Role = "Delegated authorization and scoped access to protected resources.";
const authenticationRole = "Proving who the user is to the system.";
const identityRole = "Communicating identity information in a form relying parties can trust.";

logger.info("OAuth2 vs authentication boundary", {
  oauth2Role,
  authenticationRole,
  identityRole,
  guidance: "OAuth2 primarily solves authorization. Enterprise teams should be explicit when identity and authentication requirements involve additional protocols or layers.",
});
