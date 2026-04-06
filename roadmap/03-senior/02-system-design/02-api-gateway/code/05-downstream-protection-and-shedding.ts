import { logger } from "./shared/logger.js";

logger.section("Downstream Protection And Shedding");
logger.line("Senior rule: when payment-service is degraded, the gateway may reject or degrade non-critical traffic before deeper services collapse.");
logger.line("Gateways are often where quotas, shaping, and coarse shedding protect shared downstream capacity.");
