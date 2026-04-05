import { logger } from "./shared/logger.js";
import { appDatabaseSpec } from "./shared/compose-runtime.js";

logger.info("Local workflow standardization", {
  project: appDatabaseSpec.projectName,
  benefits: [
    "new developers can start the app and database with one shared stack definition",
    "service names replace machine-specific localhost assumptions",
    "supporting dependencies stay visible in version-controlled configuration",
  ],
});
