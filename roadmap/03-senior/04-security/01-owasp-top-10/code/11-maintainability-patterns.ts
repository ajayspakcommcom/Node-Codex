import { createLogger } from "./shared/logger";

const logger = createLogger("maintainability");

interface SecurityControl {
  readonly name: string;
  readonly owner: string;
  readonly reviewFrequencyDays: number;
}

const sharedControls: readonly SecurityControl[] = [
  { name: "authorization-boundary", owner: "platform-team", reviewFrequencyDays: 30 },
  { name: "outbound-url-allowlist", owner: "platform-team", reviewFrequencyDays: 30 },
  { name: "token-lifecycle-policy", owner: "security-team", reviewFrequencyDays: 14 },
];

logger.info("shared_security_controls", {
  sharedControls,
  note: "Enterprise security stays maintainable when core controls are standardized and owned.",
});
