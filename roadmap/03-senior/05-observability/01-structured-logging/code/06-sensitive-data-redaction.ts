import { createLogger, redactFields } from "./shared/logger";

const logger = createLogger({
  service: "payments-api",
  environment: "production",
  version: "2026.04.06",
});

const payload = {
  requestId: "req_501",
  cardLast4: "4242",
  token: "super-sensitive-token",
  password: "unsafe-to-log",
};

logger.info("payment_attempt_received", redactFields(payload, ["token", "password"]));
