import { createLogger } from "./shared/logger";

const logger = createLogger({
  service: "platform-standard",
  environment: "production",
  version: "2026.04.06",
});

interface SharedLoggingControl {
  readonly control: string;
  readonly owner: string;
}

const controls: readonly SharedLoggingControl[] = [
  { control: "shared-json-logger", owner: "platform-team" },
  { control: "correlation-id-middleware", owner: "platform-team" },
  { control: "redaction-rules", owner: "security-team" },
];

logger.info("shared_logging_controls", {
  controls,
  note: "Enterprise logging stays maintainable when schema and correlation are standardized across services.",
});
