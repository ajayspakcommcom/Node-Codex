import { createLogger } from "./shared/logger";

const logger = createLogger("rotation");

interface RotationPlan {
  readonly oldVersion: string;
  readonly newVersion: string;
  readonly rolloutSteps: readonly string[];
}

const plan: RotationPlan = {
  oldVersion: "db-password-v4",
  newVersion: "db-password-v5",
  rolloutSteps: [
    "create new secret version",
    "update consumers gradually",
    "confirm health and access",
    "revoke old version",
  ],
};

logger.info("secret_rotation_plan", plan);
