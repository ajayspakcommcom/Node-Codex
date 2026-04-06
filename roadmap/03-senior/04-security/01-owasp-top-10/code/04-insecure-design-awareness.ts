import { createLogger } from "./shared/logger";

const logger = createLogger("insecure-design");

logger.info("bad_design", {
  flow: "Single endpoint allows changing email, password, role, and payout account in one request.",
  issue: "Too much privilege and too many side effects behind one broad boundary.",
});

logger.info("better_design", {
  flow: "Separate workflows with specific authorization, verification, and audit requirements.",
  issue: "Secure design starts with smaller trust boundaries and explicit approval points.",
});
