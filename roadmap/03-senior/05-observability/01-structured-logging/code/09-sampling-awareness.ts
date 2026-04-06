import { createLogger, shouldSample } from "./shared/logger";

const logger = createLogger({
  service: "search-api",
  environment: "production",
  version: "2026.04.06",
});

for (let index = 0; index < 5; index += 1) {
  if (shouldSample(index, 2)) {
    logger.info("sampled_verbose_event", {
      eventIndex: index,
      note: "High-volume diagnostic logs may require sampling to stay affordable.",
    });
  }
}
