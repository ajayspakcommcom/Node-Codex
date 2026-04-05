import { logger } from "./shared/logger.js";
import { enterpriseApiSpec, riskyApiSpec } from "./shared/docker-runtime.js";

logger.info("Build reproducibility", {
  enterprise: {
    buildInputsPinned: enterpriseApiSpec.buildInputsPinned,
    baseImages: enterpriseApiSpec.stages.map((stage) => stage.baseImage),
  },
  risky: {
    buildInputsPinned: riskyApiSpec.buildInputsPinned,
    baseImages: riskyApiSpec.stages.map((stage) => stage.baseImage),
  },
  recommendation: "Prefer pinned dependencies and predictable base images for consistent local and CI builds.",
});
