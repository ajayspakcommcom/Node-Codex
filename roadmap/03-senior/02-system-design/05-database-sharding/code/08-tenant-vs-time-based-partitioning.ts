import { logger } from "./shared/logger.js";

logger.section("Tenant Vs Time-Based Partitioning");
logger.line("Tenant-based partitioning improves routing clarity for tenant-scoped reads.");
logger.line("Time-based partitioning often concentrates new writes on the newest partition and increases hotspot risk.");
