import { createLogger } from "./shared/logger";

const logger = createLogger("redaction");

function redactSecret(value: string): string {
  return `${value.slice(0, 2)}***redacted***`;
}

logger.info("redacted_log", {
  apiKey: redactSecret("ab123456789-secret"),
  note: "Security observability should avoid leaking full secret material.",
});
