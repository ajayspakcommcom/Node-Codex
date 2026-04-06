import { createLogger } from "./shared/logger";

const logger = createLogger({
  service: "catalog-api",
  environment: "staging",
  version: "2026.04.06",
  region: "ap-south-1",
});

logger.info("startup_complete", {
  commitSha: "abc1234",
  port: 4000,
});
