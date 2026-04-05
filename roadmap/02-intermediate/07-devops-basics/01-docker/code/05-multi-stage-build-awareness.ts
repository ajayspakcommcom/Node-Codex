import { logger } from "./shared/logger.js";
import { enterpriseApiSpec, riskyApiSpec } from "./shared/docker-runtime.js";

logger.info("Multi-stage build awareness", {
  enterpriseStages: enterpriseApiSpec.stages.map((stage) => stage.name ?? "unnamed"),
  riskyStages: riskyApiSpec.stages.map((stage) => stage.name ?? "unnamed"),
  rule: "Keep build tooling out of the runtime image when it is not required after packaging.",
});
