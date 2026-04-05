import type { AppConfig, DriftAssessment } from "../../shared/config-types.js";

export class DeploymentSafetyAdvisor {
  public assess(config: AppConfig): DriftAssessment {
    const findings: string[] = [];

    if (config.environment === "production" && config.logLevel === "debug") {
      findings.push("Production logging is too verbose for a safe default.");
    }

    if (!config.databaseUrl) {
      findings.push("Database configuration is missing.");
    }

    if (config.environment !== "local" && !config.jwtSecret) {
      findings.push("Non-local environments require a secret strategy before deployment.");
    }

    return {
      riskLevel: findings.length >= 2 ? "high" : findings.length === 1 ? "medium" : "low",
      findings,
    };
  }
}
