import { createLogger } from "./shared/logger";

const logger = createLogger("maintainability");

interface SharedSecretControl {
  readonly controlName: string;
  readonly owner: string;
}

const sharedControls: readonly SharedSecretControl[] = [
  { controlName: "secret-loader-module", owner: "platform-team" },
  { controlName: "redaction-logger", owner: "observability-team" },
  { controlName: "rotation-runbook", owner: "security-team" },
];

logger.info("shared_secret_controls", {
  sharedControls,
  note: "Enterprise secret handling stays maintainable when the platform owns core primitives and workflows.",
});
