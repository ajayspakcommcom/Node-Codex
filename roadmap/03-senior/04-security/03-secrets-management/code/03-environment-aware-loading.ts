import { createLogger } from "./shared/logger";

const logger = createLogger("environment-loading");

interface SecretPathConfig {
  readonly environment: "local" | "staging" | "production";
  readonly secretPathPrefix: string;
}

function resolveSecretPathConfig(environment: SecretPathConfig["environment"]): SecretPathConfig {
  return {
    environment,
    secretPathPrefix: `services/${environment}/billing`,
  };
}

logger.info("secret_path_config", resolveSecretPathConfig("production"));
