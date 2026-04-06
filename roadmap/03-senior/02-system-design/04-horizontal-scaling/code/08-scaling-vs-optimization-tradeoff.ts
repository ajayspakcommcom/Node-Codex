import { logger } from "./shared/logger.js";

logger.section("Scaling Vs Optimization Tradeoff");
logger.line("If the database is already the dominant constraint, adding more API replicas mostly redistributes pressure instead of removing it.");
logger.line("Senior rule: scale out only after identifying whether the bottleneck is inside the replica layer or below it.");
