import { createLogger } from "./shared/logger.js";

const logger = createLogger("multi-region");

logger.info("regional_data_ownership", {
  tenantRegions: {
    "tenant-in": "ap-south-1",
    "tenant-eu": "eu-west-1",
  },
});
