import { logger } from "./shared/logger.js";

logger.info("PM2 vs broader orchestration", {
  pm2Solves: [
    "Node.js process supervision",
    "restart support",
    "basic cluster execution",
    "simple server process visibility",
  ],
  pm2DoesNotSolve: [
    "full infrastructure orchestration",
    "service discovery across many distributed services",
    "complete monitoring strategy",
    "deployment architecture decisions",
  ],
});
