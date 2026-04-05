import { logger } from "./shared/logger.js";

logger.info("API project architecture", {
  layers: ["controller", "catalog service", "repository", "catalog cache", "redis client", "metrics"],
  workflows: ["cache aside product reads", "catalog response caching", "write invalidation", "fallback on cache outage"],
  enterpriseFocus: ["tenant safe keys", "freshness rules", "stampede protection", "distributed reuse", "observability"],
});
