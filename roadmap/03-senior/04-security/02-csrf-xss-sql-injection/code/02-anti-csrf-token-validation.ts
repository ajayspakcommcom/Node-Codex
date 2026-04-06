import { timingSafeEqual } from "node:crypto";
import { createLogger } from "./shared/logger";

const logger = createLogger("csrf-token");

function assertValidCsrfToken(sessionToken: string, requestToken: string): void {
  const sessionBuffer = Buffer.from(sessionToken);
  const requestBuffer = Buffer.from(requestToken);

  if (
    sessionBuffer.length !== requestBuffer.length ||
    !timingSafeEqual(sessionBuffer, requestBuffer)
  ) {
    throw new Error("Invalid CSRF token");
  }
}

const token = "csrf-demo-token";
assertValidCsrfToken(token, token);

logger.info("csrf_token_validated", {
  note: "State-changing browser requests should validate anti-CSRF tokens when cookie auth is used.",
});
