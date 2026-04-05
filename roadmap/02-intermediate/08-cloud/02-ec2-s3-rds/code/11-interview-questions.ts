import { logger } from "./shared/logger.js";

logger.info("EC2, S3, and RDS interview prompts", {
  questions: [
    "When is EC2 a good fit for a backend workload?",
    "Why should uploaded files typically go to S3 instead of instance disks?",
    "What does RDS help with, and what does it not remove responsibility for?",
    "Why is compute vs storage separation important in cloud architecture?",
    "How do cost and scaling behaviors differ across EC2, S3, and RDS?",
  ],
});
