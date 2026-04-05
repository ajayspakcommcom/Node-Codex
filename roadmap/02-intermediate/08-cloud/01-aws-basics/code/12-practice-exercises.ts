import { logger } from "./shared/logger.js";

logger.info("Practice exercises for AWS basics", {
  exercises: [
    "Model a low-cost internal API workload and compare the service recommendation with the billing API workload.",
    "Create a risky IAM policy scenario and explain how you would narrow it.",
    "Add a multi-region recommendation case for a latency-sensitive global API.",
    "List what your team still owns when moving a database to a managed service.",
    "Write a short cloud decision record for why a workload should or should not use EC2.",
  ],
});
