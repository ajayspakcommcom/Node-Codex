import { createLogger } from "./shared/logger";

const logger = createLogger("secret-versioning");

interface SecretReference {
  readonly path: string;
  readonly version: string;
}

const currentSecret: SecretReference = {
  path: "services/production/billing/db/password",
  version: "v5",
};

logger.info("secret_reference", currentSecret);
