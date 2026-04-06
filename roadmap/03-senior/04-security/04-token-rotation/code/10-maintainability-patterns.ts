import { createLogger } from "./shared/logger";

const logger = createLogger("maintainability");

interface AuthControl {
  readonly control: string;
  readonly owner: string;
}

const controls: readonly AuthControl[] = [
  { control: "token-issuer", owner: "identity-team" },
  { control: "refresh-rotation-policy", owner: "identity-team" },
  { control: "revocation-audit-log", owner: "security-team" },
];

logger.info("shared_auth_controls", {
  controls,
  note: "Token lifecycle stays maintainable when issuance, refresh, and revocation are centralized.",
});
