import { logger } from "./shared/logger.js";

logger.section("Gateway Vs Service Authorization Boundary");
logger.line("Gateway responsibility: verify edge identity, apply coarse traffic policy, and reject obviously unauthorized requests.");
logger.line("Service responsibility: enforce domain authorization rules with business context.");
logger.line("Senior rule: the gateway is not the final source of truth for domain-level authorization.");
