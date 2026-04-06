import { logger } from "./shared/logger.js";

logger.info("Interview questions", {
  questions: [
    "Why is identifying the dominant bottleneck more important than trying many small optimizations?",
    "How can average latency hide a real performance problem?",
    "Why might scaling app instances fail to improve a dependency bound service?",
    "What makes a benchmark realistic enough to guide production decisions?",
    "How do throughput gains sometimes worsen tail latency?",
  ],
});
