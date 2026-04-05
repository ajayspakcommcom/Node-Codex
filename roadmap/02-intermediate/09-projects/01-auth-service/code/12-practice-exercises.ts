import { logger } from "./shared/logger.js";

logger.info("Practice exercises", {
  exercises: [
    "Add device metadata to sessions and expose a list sessions endpoint.",
    "Add password reset initiation and completion flows with audit events.",
    "Add account lockout after repeated failed login attempts.",
    "Add tenant scoped admin ability to revoke another users session.",
    "Add a security report that summarizes failed login and refresh reuse events.",
  ],
});
