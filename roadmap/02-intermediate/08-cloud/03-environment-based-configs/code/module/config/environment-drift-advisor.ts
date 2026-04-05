import type { AppConfig, DriftAssessment } from "../../shared/config-types.js";

export class EnvironmentDriftAdvisor {
  public compare(configs: readonly AppConfig[]): DriftAssessment {
    const findings: string[] = [];

    const environments = configs.map((config) => config.environment);
    const logLevels = new Set(configs.map((config) => config.logLevel));

    if (!environments.includes("local") || !environments.includes("staging") || !environments.includes("production")) {
      findings.push("Environment coverage is incomplete, which makes drift harder to detect.");
    }

    if (logLevels.size === 1) {
      findings.push("All environments use the same logging profile, which may hide intentional environment differences.");
    }

    return {
      riskLevel: findings.length >= 2 ? "medium" : findings.length === 1 ? "low" : "low",
      findings,
    };
  }
}
