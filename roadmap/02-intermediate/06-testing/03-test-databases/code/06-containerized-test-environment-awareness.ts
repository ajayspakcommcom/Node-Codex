import { logger } from "./shared/logger.js";
import { containerizedEnvironment } from "./shared/test-db-runtime.js";

logger.info("Containerized test environment awareness", {
  environment: containerizedEnvironment,
  notes: [
    "Use reproducible startup so local and CI behave the same way.",
    "Run schema initialization as part of setup, not as a manual step.",
    "Prefer automated cleanup between suites to avoid cross-run contamination.",
  ],
});
