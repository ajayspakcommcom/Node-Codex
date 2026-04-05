import { logger } from "./shared/logger.js";

logger.info("Maintainability patterns", {
  rules: [
    "keep token lifecycle rules centralized",
    "treat sessions as revocable server side state",
    "separate controllers, services, repositories, and policy checks",
    "make audit events structured and reviewable",
    "keep tenant and permission checks explicit",
    "avoid spreading auth logic into unrelated business modules",
  ],
});
