import { logger } from "./shared/logger.js";

logger.info("Operational visibility basics", {
  essentials: [
    "application logs remain necessary even when infrastructure is managed",
    "metrics and alerts still matter for cloud-hosted services",
    "managed infrastructure does not replace incident review or runtime observability",
  ],
});
