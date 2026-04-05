import { logger } from "./shared/logger.js";

logger.info("Practice exercises for EC2, S3, and RDS", {
  exercises: [
    "Refactor the risky legacy workload so user assets move from EC2 disk to S3.",
    "Model a workload that should not use EC2 and explain the tradeoff.",
    "Write a short note describing what your team still owns when using RDS.",
    "Create a cost-review checklist for a workload that uses EC2, S3, and RDS together.",
    "Explain how you would separate compute, uploads, and relational data in a new backend service.",
  ],
});
