import { createLogger } from "./shared/logger";

const logger = createLogger("rich-text");

logger.info("rich_text_risk", {
  issue: "Allowing raw HTML from users creates stored XSS risk across every future viewer.",
});

logger.info("better_boundary", {
  approach: "store markdown or sanitized allowlisted HTML from a dedicated sanitizer pipeline",
});
