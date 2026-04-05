import { logger } from "./shared/logger.js";

const mistakes = [
  "Checking raw role names directly in many controllers instead of using permission-based policy logic.",
  "Relying only on route guards while critical service actions remain unprotected.",
  "Ignoring tenant or ownership boundaries because a user has a valid role.",
  "Overgranting broad admin privileges for convenience.",
  "Creating too many special-case roles instead of revisiting the permission model.",
];

logger.warn("Common RBAC mistakes", {
  mistakes,
  guidance: "Enterprise RBAC becomes brittle when role checks are scattered, overbroad, and disconnected from the actual business action being protected.",
});
