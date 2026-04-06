import { ResidencyPolicy } from "./data-plane/residency-policy.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("multi-region");
const policy = new ResidencyPolicy();

logger.info("residency_check_example", {
  tenant: "tenant-eu",
  canUseUsEast: policy.isRegionAllowed("eu", "us-east-1"),
});
