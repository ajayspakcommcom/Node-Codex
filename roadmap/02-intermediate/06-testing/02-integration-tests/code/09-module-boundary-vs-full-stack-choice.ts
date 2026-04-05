import { logger } from "./shared/logger.js";

logger.info("Choosing an integration boundary", {
  recommendation: "Prefer the smallest realistic boundary that exposes the risk.",
  examples: [
    "HTTP + auth + service + repository for request contract risks",
    "service + repository + database for transaction and mapping risks",
    "controlled publisher boundary instead of a live broker for most CI integration tests",
  ],
});
