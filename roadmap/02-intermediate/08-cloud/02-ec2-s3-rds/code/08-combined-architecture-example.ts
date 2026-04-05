import { logger } from "./shared/logger.js";

logger.info("Combined EC2 + S3 + RDS architecture example", {
  architecture: {
    compute: "EC2 runs the API workload",
    objectStorage: "S3 stores user uploads and generated exports",
    relationalData: "RDS stores transactional business data",
  },
  rule: "Keep compute, object storage, and relational persistence boundaries explicit.",
});
