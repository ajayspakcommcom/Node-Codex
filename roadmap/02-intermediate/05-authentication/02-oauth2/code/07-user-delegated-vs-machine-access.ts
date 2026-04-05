import { logger } from "./shared/logger.js";

const comparison = {
  userDelegatedAccess: {
    actor: "A user authorizes a client to access protected resources on their behalf.",
    typicalFlow: "authorization_code",
    risk: "Incorrect consent or redirect handling can expose delegated access.",
  },
  machineAccess: {
    actor: "A backend service accesses another service under its own client identity.",
    typicalFlow: "client_credentials",
    risk: "Over-broad service scopes can create excessive internal access.",
  },
};

logger.info("User-delegated vs machine access", {
  comparison,
  guidance: "Enterprise OAuth2 design should separate user-delegated access from service-to-service authorization instead of forcing one mental model onto both.",
});
