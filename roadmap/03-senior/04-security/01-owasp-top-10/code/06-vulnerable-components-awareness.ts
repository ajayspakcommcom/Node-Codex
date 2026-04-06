import { createLogger } from "./shared/logger";

const logger = createLogger("dependencies");

interface DependencyPolicy {
  readonly lockfileRequired: boolean;
  readonly automatedScanning: boolean;
  readonly upgradeCadenceDays: number;
}

const policy: DependencyPolicy = {
  lockfileRequired: true,
  automatedScanning: true,
  upgradeCadenceDays: 14,
};

logger.info("dependency_hygiene_policy", {
  policy,
  note: "Vulnerable components are a supply-chain problem, not only an application-code problem.",
});
