import { logger } from "./shared/logger.js";

logger.warn("Common auth service mistakes", {
  mistakes: [
    "mixing authentication and authorization in one helper",
    "issuing long lived access tokens without rotation strategy",
    "ignoring refresh token reuse detection",
    "letting every service implement custom verification logic",
    "skipping audit visibility for login and logout events",
    "treating tenant boundaries as UI concerns instead of server rules",
  ],
});
