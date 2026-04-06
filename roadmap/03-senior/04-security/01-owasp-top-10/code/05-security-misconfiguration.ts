import { createLogger } from "./shared/logger";

const logger = createLogger("misconfiguration");

interface SecurityHeaders {
  readonly contentSecurityPolicy: string;
  readonly xContentTypeOptions: string;
  readonly referrerPolicy: string;
}

const headers: SecurityHeaders = {
  contentSecurityPolicy: "default-src 'self'",
  xContentTypeOptions: "nosniff",
  referrerPolicy: "strict-origin-when-cross-origin",
};

logger.info("secure_defaults", {
  headers,
  note: "Misconfiguration is often the absence of explicit secure defaults.",
});
