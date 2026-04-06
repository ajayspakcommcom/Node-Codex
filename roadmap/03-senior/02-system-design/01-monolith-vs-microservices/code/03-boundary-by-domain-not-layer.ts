import { logger } from "./shared/logger.js";

logger.section("Boundary By Domain, Not Layer");
logger.line("Good boundary: checkout owns order submission and inventory reservation workflow.");
logger.line("Bad boundary: one service for controllers, one for validation, one for repositories.");
logger.line("Senior rule: extract around domain ownership, not technical layers.");
