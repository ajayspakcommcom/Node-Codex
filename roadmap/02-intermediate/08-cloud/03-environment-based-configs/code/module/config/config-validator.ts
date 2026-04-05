import type { AppConfig, ValidationResult } from "../../shared/config-types.js";

export class ConfigValidator {
  public validate(config: AppConfig): ValidationResult {
    const errors: string[] = [];

    if (!config.databaseUrl) {
      errors.push("databaseUrl is required");
    }

    if (config.environment !== "local" && !config.jwtSecret) {
      errors.push("jwtSecret is required outside local development");
    }

    if (config.environment === "production" && config.logLevel === "debug") {
      errors.push("production should not run with debug logging by default");
    }

    return {
      ok: errors.length === 0,
      errors,
    };
  }
}
