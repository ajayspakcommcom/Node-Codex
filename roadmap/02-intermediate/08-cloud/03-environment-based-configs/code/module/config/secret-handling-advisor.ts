import type { AppConfig, DriftAssessment } from "../../shared/config-types.js";

export class SecretHandlingAdvisor {
  public assess(config: AppConfig): DriftAssessment {
    const findings: string[] = [];

    if (config.jwtSecret?.includes("local") || config.jwtSecret?.includes("secret")) {
      findings.push("Secrets should come from managed environment injection, not static placeholder patterns.");
    }

    if (config.environment === "production" && !config.jwtSecret) {
      findings.push("Production config is missing a required secret.");
    }

    return {
      riskLevel: findings.length >= 2 ? "high" : findings.length === 1 ? "medium" : "low",
      findings,
    };
  }
}
